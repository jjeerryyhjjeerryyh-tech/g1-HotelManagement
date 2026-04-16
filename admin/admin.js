// 权限验证
const role = sessionStorage.getItem('role');
const username = sessionStorage.getItem('username');
if (role !== 'admin') {
    alert('Access denied');
    window.location.href = '../admin/adminLogin.html';
}

const API = 'http://localhost:3000';
let editingId = null;
let activeSection = 'dashboard';

const sectionMeta = {
    dashboard:     { title: '首页',     subtitle: '欢迎回来，管理员！这是您的酒店运营概览' },
    admins:        { title: '管理员管理', subtitle: '' },
    users:         { title: '用户管理',  subtitle: '查看与管理用户信息' },
    roomtypes:     { title: '房型管理',  subtitle: '' },
    rooms:         { title: '房间管理',  subtitle: '' },
    bookings:      { title: '预订管理',  subtitle: '实时预订数据' },
    checkins:      { title: '入住管理',  subtitle: '' },
    messages:      { title: '留言管理',  subtitle: '' },
    announcements: { title: '公告管理',  subtitle: '' },
    reviews:       { title: '评价管理',  subtitle: '用户评价与留言' }
};

function setSection(sectionKey) {
    activeSection = sectionKey;
    document.querySelectorAll('[id^="section-"]').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`section-${sectionKey}`);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.sidebar-link').forEach(btn => {
        btn.classList.remove('sidebar-item-active');
        btn.classList.add('text-gray-700');
    });
    const activeBtn = document.querySelector(`.sidebar-link[data-section="${sectionKey}"]`);
    if (activeBtn) activeBtn.classList.add('sidebar-item-active');

    const meta = sectionMeta[sectionKey] || { title: '', subtitle: '' };
    const titleEl = document.getElementById('pageTitle');
    const subtitleEl = document.getElementById('pageSubtitle');
    const bcEl = document.getElementById('breadcrumbCurrent');
    if (titleEl) titleEl.textContent = meta.title;
    if (subtitleEl) subtitleEl.textContent = meta.subtitle;
    if (bcEl) bcEl.textContent = meta.title;

    if (sectionKey === 'bookings') loadBookings();
    if (sectionKey === 'reviews')  loadReviews();
    if (sectionKey === 'users')    loadUsers();
    if (sectionKey === 'roomtypes') loadRoomTypes();
}

// ===== 房型管理 =====
let editingRoomTypeId = null;

async function loadRoomTypes() {
    const res = await fetch(`${API}/api/roomtypes`);
    const data = await res.json();
    const tbody = document.getElementById('roomTypeTableBody');
    if (!tbody) return;
    if (!data.roomTypes.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-400">暂无房型</td></tr>`;
        return;
    }
    tbody.innerHTML = data.roomTypes.map(r => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-medium">${r.name}</td>
            <td class="px-6 py-4 text-sm">${r.bed || '-'} / ${r.size || '-'}</td>
            <td class="px-6 py-4 text-sm">${r.guests} 人</td>
            <td class="px-6 py-4 text-sm">¥${r.price}</td>
            <td class="px-6 py-4 text-sm"><span class="px-2 py-1 rounded-full text-xs bg-success/10 text-success">启用</span></td>
            <td class="px-6 py-4 text-sm">
                <div class="flex space-x-3">
                    <button onclick="editRoomType('${r.id}')" class="text-warning hover:text-warning/80"><i class="fa fa-edit mr-1"></i>编辑</button>
                    <button onclick="deleteRoomType('${r.id}')" class="text-danger hover:text-danger/80"><i class="fa fa-trash mr-1"></i>删除</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openRoomTypeModal() {
    editingRoomTypeId = null;
    document.getElementById('roomTypeModalTitle').textContent = '新增房型';
    document.getElementById('roomTypeForm').reset();
    document.getElementById('roomTypeModal').classList.remove('hidden');
}

async function editRoomType(id) {
    const res = await fetch(`${API}/api/roomtypes`);
    const data = await res.json();
    const r = data.roomTypes.find(x => x.id === id);
    if (!r) return;
    editingRoomTypeId = id;
    document.getElementById('roomTypeModalTitle').textContent = '编辑房型';
    document.getElementById('rtName').value = r.name;
    document.getElementById('rtType').value = r.type;
    document.getElementById('rtSize').value = r.size;
    document.getElementById('rtBed').value = r.bed;
    document.getElementById('rtGuests').value = r.guests;
    document.getElementById('rtPrice').value = r.price;
    document.getElementById('rtOriginalPrice').value = r.originalPrice;
    document.getElementById('rtAvailable').value = r.available;
    document.getElementById('rtImage').value = r.image;
    document.getElementById('rtPolicy').value = r.policy;
    document.getElementById('roomTypeModal').classList.remove('hidden');
}

function closeRoomTypeModal() {
    document.getElementById('roomTypeModal').classList.add('hidden');
}

async function deleteRoomType(id) {
    if (!confirm('确认删除该房型？')) return;
    await fetch(`${API}/api/roomtypes/${id}`, { method: 'DELETE' });
    loadRoomTypes();
}

document.getElementById('roomTypeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        name: document.getElementById('rtName').value,
        type: document.getElementById('rtType').value,
        size: document.getElementById('rtSize').value,
        bed: document.getElementById('rtBed').value,
        guests: document.getElementById('rtGuests').value,
        price: document.getElementById('rtPrice').value,
        originalPrice: document.getElementById('rtOriginalPrice').value,
        available: document.getElementById('rtAvailable').value,
        image: document.getElementById('rtImage').value,
        policy: document.getElementById('rtPolicy').value
    };
    const url = editingRoomTypeId ? `${API}/api/roomtypes/${editingRoomTypeId}` : `${API}/api/roomtypes`;
    const method = editingRoomTypeId ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (res.ok) { closeRoomTypeModal(); loadRoomTypes(); } else { alert(data.message); }
});

// ===== 用户 CRUD =====
async function loadUsers() {
    const res = await fetch(`${API}/api/users`);
    const data = await res.json();
    const tbody = document.getElementById('userTableBody');
    if (!tbody) return;
    if (!data.users.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">No users found</td></tr>`;
        return;
    }
    tbody.innerHTML = data.users.map(u => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm">${u.username}</td>
            <td class="px-6 py-4 text-sm">${u.name}</td>
            <td class="px-6 py-4 text-sm">${u.email}</td>
            <td class="px-6 py-4 text-sm">${u.phone}</td>
            <td class="px-6 py-4 text-sm">
                <div class="flex space-x-3">
                    <button onclick="editUser(${u.id},'${u.username}','${u.name}','${u.email}','${u.phone}')" class="text-warning hover:text-warning/80">
                        <i class="fa fa-edit mr-1"></i>编辑
                    </button>
                    <button onclick="deleteUser(${u.id})" class="text-danger hover:text-danger/80">
                        <i class="fa fa-trash mr-1"></i>删除
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openModal() {
    editingId = null;
    document.getElementById('modalTitle').textContent = '新增用户';
    document.getElementById('userForm').reset();
    document.getElementById('passwordHint').style.display = 'none';
    document.getElementById('fieldPassword').required = true;
    document.getElementById('userModal').classList.remove('hidden');
}

function editUser(id, username, name, email, phone) {
    editingId = id;
    document.getElementById('modalTitle').textContent = '编辑用户';
    document.getElementById('fieldUsername').value = username;
    document.getElementById('fieldFullName').value = name;
    document.getElementById('fieldEmail').value = email;
    document.getElementById('fieldPhone').value = phone;
    document.getElementById('fieldPassword').value = '';
    document.getElementById('fieldPassword').required = false;
    document.getElementById('passwordHint').style.display = 'inline';
    document.getElementById('userModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('userModal').classList.add('hidden');
}

async function deleteUser(id) {
    if (!confirm('确认删除该用户？')) return;
    const res = await fetch(`${API}/api/users/${id}`, { method: 'DELETE' });
    const data = await res.json();
    alert(data.message);
    loadUsers();
}

document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        username: document.getElementById('fieldUsername').value,
        fullName: document.getElementById('fieldFullName').value,
        email: document.getElementById('fieldEmail').value,
        phone: document.getElementById('fieldPhone').value,
        password: document.getElementById('fieldPassword').value
    };
    const url = editingId ? `${API}/api/users/${editingId}` : `${API}/api/users`;
    const method = editingId ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (res.ok) { closeModal(); loadUsers(); } else { alert(data.message); }
});

// ===== 预订管理（真实数据）=====
async function loadBookings() {
    const res = await fetch(`${API}/api/bookings`);
    const data = await res.json();
    const tbody = document.getElementById('bookingTableBody');
    if (!tbody) return;

    if (!data.bookings.length) {
        tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">暂无预订记录</td></tr>`;
        updateBookingStats({});
        return;
    }

    const statusMap = {
        confirmed:      '<span class="px-2 py-1 text-xs rounded-full bg-success/10 text-success">已确认</span>',
        pending:        '<span class="px-2 py-1 text-xs rounded-full bg-warning/10 text-warning">待确认</span>',
        cancelled:      '<span class="px-2 py-1 text-xs rounded-full bg-danger/10 text-danger">已取消</span>',
        'checked-in':   '<span class="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">已入住</span>',
        'checked-out':  '<span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">已退房</span>'
    };

    tbody.innerHTML = data.bookings.map(b => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-medium">${b.id}</td>
            <td class="px-6 py-4 text-sm">
                <div>${b.guestName || b.username}</div>
                ${b.guestName && b.username !== 'guest' ? `<div class="text-xs text-gray-400">@${b.username}</div>` : ''}
            </td>
            <td class="px-6 py-4 text-sm">${b.roomName || b.roomType || '-'}</td>
            <td class="px-6 py-4 text-sm">${b.checkIn} / ${b.checkOut}</td>
            <td class="px-6 py-4 text-sm">${b.totalDisplay || ('¥' + (b.totalAmount || '-'))}</td>
            <td class="px-6 py-4 text-sm">
                <select onchange="updateBookingStatus('${b.id}', this.value)"
                    class="text-xs border border-gray-200 rounded-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    style="background:transparent;">
                    <option value="pending"       ${b.status === 'pending'       ? 'selected' : ''}>待确认</option>
                    <option value="confirmed"     ${b.status === 'confirmed'     ? 'selected' : ''}>已确认</option>
                    <option value="checked-in"    ${b.status === 'checked-in'    ? 'selected' : ''}>已入住</option>
                    <option value="checked-out"   ${b.status === 'checked-out'   ? 'selected' : ''}>已退房</option>
                    <option value="cancelled"     ${b.status === 'cancelled'     ? 'selected' : ''}>已取消</option>
                </select>
            </td>
            <td class="px-6 py-4 text-sm">
                <button onclick="deleteBooking('${b.id}')" class="text-danger hover:text-danger/80">
                    <i class="fa fa-trash mr-1"></i>删除
                </button>
            </td>
        </tr>
    `).join('');

    const counts = { pending: 0, confirmed: 0, 'checked-in': 0, cancelled: 0 };
    data.bookings.forEach(b => { if (counts[b.status] !== undefined) counts[b.status]++; });
    updateBookingStats(counts);
}

function updateBookingStats(counts) {
    if (document.getElementById('count-pending'))   document.getElementById('count-pending').textContent   = counts.pending || 0;
    if (document.getElementById('count-confirmed')) document.getElementById('count-confirmed').textContent = counts.confirmed || 0;
    if (document.getElementById('count-checkedin')) document.getElementById('count-checkedin').textContent = counts['checked-in'] || 0;
    if (document.getElementById('count-cancelled')) document.getElementById('count-cancelled').textContent = counts.cancelled || 0;
}

async function deleteBooking(id) {
    if (!confirm('确认删除该预订？')) return;
    await fetch(`${API}/api/bookings/${id}`, { method: 'DELETE' });
    loadBookings();
}

async function updateBookingStatus(id, status) {
    await fetch(`${API}/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    loadBookings();
}

function filterBookings() { loadBookings(); }
function refreshBookings() { loadBookings(); }

// ===== 评价管理（真实数据）=====
async function loadReviews() {
    const res = await fetch(`${API}/api/reviews`);
    const data = await res.json();
    const tbody = document.getElementById('reviewTableBody');
    if (!tbody) return;

    if (!data.reviews.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">暂无评价记录</td></tr>`;
        return;
    }

    tbody.innerHTML = data.reviews.map(r => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm">${r.username}</td>
            <td class="px-6 py-4 text-sm text-warning">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</td>
            <td class="px-6 py-4 text-sm">${r.comment}</td>
            <td class="px-6 py-4 text-sm">${new Date(r.createdAt).toLocaleDateString('zh-CN')}</td>
            <td class="px-6 py-4 text-sm">
                <button onclick="deleteReview(${r.id})" class="text-danger hover:text-danger/80">
                    <i class="fa fa-trash mr-1"></i>删除
                </button>
            </td>
        </tr>
    `).join('');
}

async function deleteReview(id) {
    if (!confirm('确认删除该评价？')) return;
    await fetch(`${API}/api/reviews/${id}`, { method: 'DELETE' });
    loadReviews();
}

function closeBookingModal() {
    document.getElementById('bookingDetailsModal').classList.add('hidden');
    document.getElementById('bookingDetailsModal').classList.remove('flex');
}

// ===== 退出登录 =====
document.querySelector('.fa-sign-out').closest('button').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '../admin/adminLogin.html';
});

// ===== 初始化 =====
document.querySelectorAll('.sidebar-link').forEach(btn => {
    btn.addEventListener('click', () => setSection(btn.getAttribute('data-section')));
});
setSection('dashboard');
loadUsers();
