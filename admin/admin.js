// 权限验证
const role = sessionStorage.getItem('role');
const username = sessionStorage.getItem('username');
if (role !== 'admin') {
    alert('Access denied');
    window.location.href = '../admin/adminLogin.html';
}

// ==========================================
// 预订管理逻辑 (Mock)
// ==========================================
let mockBookings = [
    { id: 'B2023100101', customerName: '张三', phone: '13800138000', roomType: '豪华客房', roomNumber: '1208', checkIn: '2023-10-01', checkOut: '2023-10-03', amount: 1798, status: 'checked-in', createdAt: '2023-09-25 14:30:00' },
    { id: 'B2023100202', customerName: '李四', phone: '13900139000', roomType: '行政套房', roomNumber: '-', checkIn: '2023-10-05', checkOut: '2023-10-07', amount: 4598, status: 'confirmed', createdAt: '2023-09-28 09:15:00' },
    { id: 'B2023100303', customerName: '王五', phone: '13700137000', roomType: '商务双床房', roomNumber: '-', checkIn: '2023-10-10', checkOut: '2023-10-12', amount: 1598, status: 'pending', createdAt: '2023-10-01 10:00:00' },
    { id: 'B2023100404', customerName: '赵六', phone: '13600136000', roomType: '豪华海景房', roomNumber: '-', checkIn: '2023-09-20', checkOut: '2023-09-22', amount: 2598, status: 'cancelled', createdAt: '2023-09-15 11:20:00' }
];

function renderBookings(data = mockBookings) {
    const tbody = document.getElementById('bookingTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.map(booking => {
        let statusBadge = '';
        switch(booking.status) {
            case 'pending': statusBadge = '<span class="px-2 py-1 rounded-full text-xs bg-warning/10 text-warning">待确认</span>'; break;
            case 'confirmed': statusBadge = '<span class="px-2 py-1 rounded-full text-xs bg-success/10 text-success">已确认</span>'; break;
            case 'checked-in': statusBadge = '<span class="px-2 py-1 rounded-full text-xs bg-accent/10 text-accent">已入住</span>'; break;
            case 'cancelled': statusBadge = '<span class="px-2 py-1 rounded-full text-xs bg-danger/10 text-danger">已取消</span>'; break;
        }

        return `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${booking.id}</td>
                <td class="px-6 py-4 text-sm">
                    <div>${booking.customerName}</div>
                    <div class="text-xs text-gray-500">${booking.phone}</div>
                </td>
                <td class="px-6 py-4 text-sm">
                    <div>${booking.roomType}</div>
                    <div class="text-xs text-gray-500">${booking.roomNumber !== '-' ? `房号: ${booking.roomNumber}` : '未排房'}</div>
                </td>
                <td class="px-6 py-4 text-sm">
                    <div>入: ${booking.checkIn}</div>
                    <div>退: ${booking.checkOut}</div>
                </td>
                <td class="px-6 py-4 text-sm font-bold text-accent">¥${booking.amount}</td>
                <td class="px-6 py-4 text-sm">${statusBadge}</td>
                <td class="px-6 py-4 text-sm">
                    <button onclick="viewBookingDetails('${booking.id}')" class="text-accent hover:text-accent/80 mr-2" title="查看详情"><i class="fa fa-eye"></i></button>
                    ${booking.status === 'pending' ? `<button onclick="confirmBooking('${booking.id}')" class="text-success hover:text-success/80 mr-2" title="确认订单"><i class="fa fa-check"></i></button>` : ''}
                    ${booking.status === 'confirmed' ? `<button onclick="checkInBooking('${booking.id}')" class="text-primary hover:text-primary/80 mr-2" title="办理入住"><i class="fa fa-sign-in"></i></button>` : ''}
                    ${(booking.status === 'pending' || booking.status === 'confirmed') ? `<button onclick="cancelBooking('${booking.id}')" class="text-danger hover:text-danger/80" title="取消订单"><i class="fa fa-times"></i></button>` : ''}
                </td>
            </tr>
        `;
    }).join('');

    updateBookingStats();
}

function updateBookingStats() {
    const counts = { pending: 0, confirmed: 0, 'checked-in': 0, cancelled: 0 };
    mockBookings.forEach(b => {
        if (counts[b.status] !== undefined) counts[b.status]++;
    });

    const elPending = document.getElementById('count-pending');
    const elConfirmed = document.getElementById('count-confirmed');
    const elCheckedin = document.getElementById('count-checkedin');
    const elCancelled = document.getElementById('count-cancelled');

    if(elPending) elPending.textContent = counts.pending;
    if(elConfirmed) elConfirmed.textContent = counts.confirmed;
    if(elCheckedin) elCheckedin.textContent = counts['checked-in'];
    if(elCancelled) elCancelled.textContent = counts.cancelled;
}

function filterBookings() {
    const status = document.getElementById('bookingStatusFilter').value;
    const search = document.getElementById('bookingSearchInput').value.toLowerCase();

    const filtered = mockBookings.filter(b => {
        const matchStatus = status === 'all' || b.status === status;
        const matchSearch = b.id.toLowerCase().includes(search) || 
                            b.customerName.toLowerCase().includes(search) || 
                            b.phone.includes(search);
        return matchStatus && matchSearch;
    });

    renderBookings(filtered);
}

function refreshBookings() {
    document.getElementById('bookingStatusFilter').value = 'all';
    document.getElementById('bookingSearchInput').value = '';
    renderBookings();
    alert('数据已刷新');
}

function viewBookingDetails(id) {
    const booking = mockBookings.find(b => b.id === id);
    if (!booking) return;

    const content = document.getElementById('bookingDetailsContent');
    let statusText = '';
    switch(booking.status) {
        case 'pending': statusText = '待确认'; break;
        case 'confirmed': statusText = '已确认'; break;
        case 'checked-in': statusText = '已入住'; break;
        case 'cancelled': statusText = '已取消'; break;
    }

    content.innerHTML = `
        <div class="grid grid-cols-2 gap-4 text-sm">
            <div><span class="text-gray-500">订单号：</span> <span class="font-medium">${booking.id}</span></div>
            <div><span class="text-gray-500">状态：</span> <span class="font-medium">${statusText}</span></div>
            <div><span class="text-gray-500">预订人：</span> <span class="font-medium">${booking.customerName}</span></div>
            <div><span class="text-gray-500">联系电话：</span> <span class="font-medium">${booking.phone}</span></div>
            <div class="col-span-2 border-t border-gray-200 my-2"></div>
            <div><span class="text-gray-500">房型：</span> <span class="font-medium">${booking.roomType}</span></div>
            <div><span class="text-gray-500">安排房号：</span> <span class="font-medium">${booking.roomNumber}</span></div>
            <div><span class="text-gray-500">入住日期：</span> <span class="font-medium">${booking.checkIn}</span></div>
            <div><span class="text-gray-500">退房日期：</span> <span class="font-medium">${booking.checkOut}</span></div>
            <div class="col-span-2 border-t border-gray-200 my-2"></div>
            <div><span class="text-gray-500">下单时间：</span> <span class="font-medium">${booking.createdAt}</span></div>
            <div><span class="text-gray-500">总金额：</span> <span class="font-bold text-accent text-lg">¥${booking.amount}</span></div>
        </div>
    `;
    
    document.getElementById('bookingDetailsModal').classList.remove('hidden');
    document.getElementById('bookingDetailsModal').classList.add('flex');
}

function closeBookingModal() {
    document.getElementById('bookingDetailsModal').classList.add('hidden');
    document.getElementById('bookingDetailsModal').classList.remove('flex');
}

function confirmBooking(id) {
    if(confirm(`确定要接受订单 ${id} 吗？`)) {
        const booking = mockBookings.find(b => b.id === id);
        if(booking) booking.status = 'confirmed';
        filterBookings();
    }
}

function cancelBooking(id) {
    if(confirm(`确定要取消订单 ${id} 吗？此操作不可恢复。`)) {
        const booking = mockBookings.find(b => b.id === id);
        if(booking) booking.status = 'cancelled';
        filterBookings();
    }
}

function checkInBooking(id) {
    alert(`跳转到入住办理页面，订单号: ${id}`);
}

// 确保在切换到预订管理 tab 时渲染数据
document.addEventListener('DOMContentLoaded', () => {
    // 初始化渲染一次
    renderBookings();
});

let editingId = null;
let activeSection = 'dashboard';

const sectionMeta = {
    dashboard: { title: '首页', subtitle: '欢迎回来，管理员！这是您的酒店运营概览' },
    admins: { title: '管理员管理', subtitle: '查看与管理管理员账号（仅界面）' },
    users: { title: '用户管理', subtitle: '查看与管理用户信息（仅界面）' },
    roomtypes: { title: '房型管理', subtitle: '维护房型与基础价格（仅界面）' },
    rooms: { title: '房间管理', subtitle: '维护房间信息与状态（仅界面）' },
    bookings: { title: '预定管理', subtitle: '复用 BookingInterface 的预订管理界面' },
    checkins: { title: '入住管理', subtitle: '入住记录管理（仅界面）' },
    messages: { title: '留言管理', subtitle: '留言与回复管理（仅界面）' },
    announcements: { title: '公告管理', subtitle: '发布与管理公告（仅界面）' },
    reviews: { title: '评价管理', subtitle: '评价审核与管理（仅界面）' }
};

const mockUsers = [
    { id: 1, username: 'user01', name: '张三', email: 'user01@example.com', phone: '13800000001' },
    { id: 2, username: 'user02', name: '李四', email: 'user02@example.com', phone: '13800000002' },
    { id: 3, username: 'user03', name: '王五', email: 'user03@example.com', phone: '13800000003' }
];

function setSection(sectionKey) {
    activeSection = sectionKey;
    document.querySelectorAll('[id^="section-"]').forEach((el) => el.classList.add('hidden'));
    const target = document.getElementById(`section-${sectionKey}`);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.sidebar-link').forEach((btn) => {
        btn.classList.remove('sidebar-item-active');
        btn.classList.add('text-gray-700');
    });
    const activeBtn = document.querySelector(`.sidebar-link[data-section="${sectionKey}"]`);
    if (activeBtn) activeBtn.classList.add('sidebar-item-active');

    const meta = sectionMeta[sectionKey] || { title: '首页', subtitle: '' };
    const titleEl = document.getElementById('pageTitle');
    const subtitleEl = document.getElementById('pageSubtitle');
    const bcEl = document.getElementById('breadcrumbCurrent');
    if (titleEl) titleEl.textContent = meta.title;
    if (subtitleEl) subtitleEl.textContent = meta.subtitle;
    if (bcEl) bcEl.textContent = meta.title;
}

// 加载用户列表（仅前端 mock）
function loadUsers() {
    const tbody = document.getElementById('userTableBody');
    if (!tbody) return;
    if (!mockUsers.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">No users found</td></tr>`;
        return;
    }
    tbody.innerHTML = mockUsers.map(u => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm">${u.username}</td>
            <td class="px-6 py-4 text-sm">${u.name}</td>
            <td class="px-6 py-4 text-sm">${u.email}</td>
            <td class="px-6 py-4 text-sm">${u.phone}</td>
            <td class="px-6 py-4 text-sm">
                <div class="flex space-x-3">
                    <button onclick="editUser(${u.id},'${u.username}','${u.name}','${u.email}','${u.phone}')"
                        class="text-warning hover:text-warning/80">
                        <i class="fa fa-edit mr-1"></i>Edit
                    </button>
                    <button onclick="deleteUser(${u.id})"
                        class="text-danger hover:text-danger/80">
                        <i class="fa fa-trash mr-1"></i>Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 打开新增弹窗
function openModal() {
    editingId = null;
    document.getElementById('modalTitle').textContent = '新增用户';
    document.getElementById('userForm').reset();
    document.getElementById('passwordHint').style.display = 'none';
    document.getElementById('fieldPassword').required = true;
    document.getElementById('userModal').classList.remove('hidden');
}

// 打开编辑弹窗
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

// 关闭弹窗
function closeModal() {
    document.getElementById('userModal').classList.add('hidden');
}

// 删除用户（仅前端 mock）
function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const idx = mockUsers.findIndex(u => u.id === id);
    if (idx !== -1) mockUsers.splice(idx, 1);
    loadUsers();
}

// 表单提交（新增 / 编辑，仅前端 mock）
document.getElementById('userForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const body = {
        username: document.getElementById('fieldUsername').value,
        fullName: document.getElementById('fieldFullName').value,
        email: document.getElementById('fieldEmail').value,
        phone: document.getElementById('fieldPhone').value,
        password: document.getElementById('fieldPassword').value
    };
    if (editingId) {
        const u = mockUsers.find(x => x.id === editingId);
        if (u) {
            u.username = body.username;
            u.name = body.fullName;
            u.email = body.email;
            u.phone = body.phone;
        }
    } else {
        const nextId = mockUsers.length ? Math.max(...mockUsers.map(u => u.id)) + 1 : 1;
        mockUsers.push({
            id: nextId,
            username: body.username,
            name: body.fullName,
            email: body.email,
            phone: body.phone
        });
    }
    closeModal();
    loadUsers();
});

// 退出登录
document.querySelector('.fa-sign-out').closest('button').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '../admin/adminLogin.html';
});

// 初始化
document.querySelectorAll('.sidebar-link').forEach((btn) => {
    btn.addEventListener('click', () => setSection(btn.getAttribute('data-section')));
});
setSection('dashboard');
loadUsers();
