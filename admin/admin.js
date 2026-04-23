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

const i18nAdmin = {
    zh: {
        admin_system_title: '酒店管理系统',
        admin_label: '管理员',
        nav_home: '首页',
        nav_users: '用户管理',
        nav_roomtypes: '房型管理',
        nav_bookings: '预定管理',
        nav_checkins: '入住管理',
        nav_messages: '留言管理',
        nav_announcements: '公告管理',
        nav_reviews: '评价管理',
        nav_logout: '退出登录',
        breadcrumb_home: '首页',
        breadcrumb_dashboard: '首页',
        page_title_dashboard: '首页',
        page_subtitle_dashboard: '欢迎回来，管理员！这是您的酒店运营概览',
        stat_total_rooms: '总客房数',
        stat_occupied_rooms: '已入住客房',
        stat_today_bookings: '今日订单',
        stat_today_revenue: '今日营收',
        stat_compare_month: '较上月',
        stat_compare_day: '较昨日',
        table_account: '账号',
        table_name: '姓名',
        table_email: '邮箱',
        table_phone: '电话',
        table_action: '操作',
        table_room_type: '房型名称',
        table_bed_size: '床型/面积',
        table_guests: '可住人数',
        table_price: '基础价格',
        table_status: '状态',
        table_order_no: '订单号',
        table_guest: '预订人',
        table_room_info: '房型/房号',
        table_dates: '入住/退房日期',
        table_total: '总金额',
        table_rating: '评分',
        table_comment: '内容',
        table_time: '时间',
        btn_edit: '编辑',
        btn_delete: '删除',
        btn_add_user: '新增用户',
        btn_add_room_type: '新增房型',
        btn_refresh: '刷新',
        status_enabled: '启用',
        status_pending: '待确认',
        status_confirmed: '已确认',
        status_checked_in: '已入住',
        status_checked_out: '已退房',
        status_cancelled: '已取消',
        guests_unit: '人',
        night_unit: '晚',
        currency_symbol: '¥',
        filter_all: '所有状态',
        btn_filter: '筛选',
        btn_publish: '发布公告',
        table_sender: '留言人',
        table_title: '标题',
        table_publisher: '发布人',
        status_no_reply: '未回复',
        status_published: '已发布',
        booking_conditions: '房间预订条件',
        checkin: '入住日期',
        checkout: '退房日期',
        room_type_deluxe: '豪华客房',
        room_type_standard: '标准客房',
        room_type_suite: '套房',
        btn_search_rooms: '查询可用房间',
        error_date_check: '请检查日期：入住日期需晚于今日、早于退房日期',
        no_rooms_found: '暂无可用房间，请调整预订条件',
        total_nights: '入住晚数',
        total_price: '总价',
        btn_select_room: '选择此房间',
        price_per_night: '晚',
        label_original_price: '原价',
        label_available_count: '可用数量',
        label_image_url: '图片 URL',
        label_policy: '取消政策',
        btn_cancel: '取消',
        btn_save: '保存',
    },
    en: {
        admin_system_title: 'Hotel Management System',
        admin_label: 'Administrator',
        nav_home: 'Dashboard',
        nav_users: 'Users',
        nav_roomtypes: 'Room Types',
        nav_bookings: 'Bookings',
        nav_checkins: 'Check-ins',
        nav_messages: 'Messages',
        nav_announcements: 'Announcements',
        nav_reviews: 'Reviews',
        nav_logout: 'Logout',
        breadcrumb_home: 'Home',
        breadcrumb_dashboard: 'Dashboard',
        page_title_dashboard: 'Dashboard',
        page_subtitle_dashboard: 'Welcome back, Admin! Here is your hotel operation overview.',
        stat_total_rooms: 'Total Rooms',
        stat_occupied_rooms: 'Occupied Rooms',
        stat_today_bookings: "Today's Bookings",
        stat_today_revenue: "Today's Revenue",
        stat_compare_month: 'vs last month',
        stat_compare_day: 'vs yesterday',
        table_account: 'Account',
        table_name: 'Name',
        table_email: 'Email',
        table_phone: 'Phone',
        table_action: 'Action',
        table_room_type: 'Room Type',
        table_bed_size: 'Bed / Size',
        table_guests: 'Guests',
        table_price: 'Base Price',
        table_status: 'Status',
        table_order_no: 'Order No.',
        table_guest: 'Guest',
        table_room_info: 'Room/No.',
        table_dates: 'Stay Dates',
        table_total: 'Total',
        table_rating: 'Rating',
        table_comment: 'Comment',
        table_time: 'Time',
        btn_edit: 'Edit',
        btn_delete: 'Delete',
        btn_add_user: 'Add User',
        btn_add_room_type: 'Add Type',
        btn_refresh: 'Refresh',
        status_enabled: 'Enabled',
        status_pending: 'Pending',
        status_confirmed: 'Confirmed',
        status_checked_in: 'Checked In',
        status_checked_out: 'Checked Out',
        status_cancelled: 'Cancelled',
        guests_unit: 'Guests',
        night_unit: 'Night',
        currency_symbol: '$',
        filter_all: 'All Status',
        btn_filter: 'Filter',
        btn_publish: 'Publish',
        table_sender: 'Sender',
        table_title: 'Title',
        table_publisher: 'Publisher',
        status_no_reply: 'No Reply',
        status_published: 'Published',
        booking_conditions: 'Booking Conditions',
        checkin: 'Check-in',
        checkout: 'Check-out',
        room_type_deluxe: 'Deluxe Room',
        room_type_standard: 'Standard Room',
        room_type_suite: 'Suite',
        btn_search_rooms: 'Search Available Rooms',
        error_date_check: 'Date error: Check-in must be after today and before check-out',
        no_rooms_found: 'No rooms available, please adjust conditions',
        total_nights: 'Total Nights',
        total_price: 'Total Price',
        btn_select_room: 'Select Room',
        price_per_night: 'night',
        label_original_price: 'Original Price',
        label_available_count: 'Available Count',
        label_image_url: 'Image URL',
        label_policy: 'Policy',
        btn_cancel: 'Cancel',
        btn_save: 'Save',
    }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function t(key) {
    const dict = i18nAdmin[currentLang] || i18nAdmin.zh;
    return dict[key] || key;
}

function getLocalizedValue(val) {
    if (val && typeof val === 'object') {
        return val[currentLang] || val['zh'] || '';
    }
    return val || '';
}

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

function applyI18n() {
    const dict = i18nAdmin[currentLang] || i18nAdmin.zh;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
    updateSectionMeta();
    // 强制刷新面包屑和标题
    const meta = sectionMeta[activeSection] || { title: '', subtitle: '' };
    const titleEl = document.getElementById('pageTitle');
    const subtitleEl = document.getElementById('pageSubtitle');
    const bcEl = document.getElementById('breadcrumbCurrent');
    if (titleEl) titleEl.textContent = meta.title;
    if (subtitleEl) subtitleEl.textContent = meta.subtitle;
    if (bcEl) bcEl.textContent = meta.title;
}

function updateSectionMeta() {
    const metaTranslations = {
        zh: {
            dashboard: { title: '首页', subtitle: '欢迎回来，管理员！这是您的酒店运营概览' },
            users: { title: '用户管理', subtitle: '查看与管理用户信息' },
            roomtypes: { title: '房型管理', subtitle: '房型信息配置' },
            bookings: { title: '预订管理', subtitle: '实时预订数据' },
            checkins: { title: '入住管理', subtitle: '办理入住与退房' },
            messages: { title: '留言管理', subtitle: '处理用户咨询与反馈' },
            announcements: { title: '公告管理', subtitle: '发布系统公告' },
            reviews: { title: '评价管理', subtitle: '用户评价与留言' }
        },
        en: {
            dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Admin! Here is your hotel operation overview.' },
            users: { title: 'User Management', subtitle: 'View and manage user information.' },
            roomtypes: { title: 'Room Type Management', subtitle: 'Configure room type information.' },
            bookings: { title: 'Booking Management', subtitle: 'Real-time booking data.' },
            checkins: { title: 'Check-in Management', subtitle: 'Handle check-ins and check-outs.' },
            messages: { title: 'Message Management', subtitle: 'Handle user inquiries and feedback.' },
            announcements: { title: 'Announcement Management', subtitle: 'Publish system announcements.' },
            reviews: { title: 'Review Management', subtitle: 'User reviews and comments.' }
        }
    };
    
    const trans = metaTranslations[currentLang] || metaTranslations.zh;
    for (let key in trans) {
        if (sectionMeta[key]) {
            sectionMeta[key].title = trans[key].title;
            sectionMeta[key].subtitle = trans[key].subtitle;
        }
    }
}

// 初始化语言切换器
document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('lang', currentLang);
            applyI18n();
        });
    }
    applyI18n();
});

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
    if (sectionKey === 'messages') loadMessages();
}

// ===== 房型管理 =====
let editingRoomTypeId = null;

async function loadRoomTypes() {
    const res = await fetch(`${API}/api/roomtypes`);
    const data = await res.json();
    const tbody = document.getElementById('roomTypeTableBody');
    if (!tbody) return;
    if (!data.roomTypes.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-400">${currentLang === 'en' ? 'No room types found' : '暂无房型'}</td></tr>`;
        return;
    }
    tbody.innerHTML = data.roomTypes.map(r => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-medium">${getLocalizedValue(r.name)}</td>
            <td class="px-6 py-4 text-sm">${getLocalizedValue(r.bed) || '-'} / ${getLocalizedValue(r.size) || '-'}</td>
            <td class="px-6 py-4 text-sm">${r.guests} ${t('guests_unit')}</td>
            <td class="px-6 py-4 text-sm">${t('currency_symbol')}${r.price}</td>
            <td class="px-6 py-4 text-sm"><span class="px-2 py-1 rounded-full text-xs bg-success/10 text-success">${t('status_enabled')}</span></td>
            <td class="px-6 py-4 text-sm">
                <div class="flex space-x-3">
                    <button onclick="editRoomType('${r.id}')" class="text-warning hover:text-warning/80"><i class="fa fa-edit mr-1"></i>${t('btn_edit')}</button>
                    <button onclick="deleteRoomType('${r.id}')" class="text-danger hover:text-danger/80"><i class="fa fa-trash mr-1"></i>${t('btn_delete')}</button>
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
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">${currentLang === 'en' ? 'No users found' : '暂无用户'}</td></tr>`;
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
                        <i class="fa fa-edit mr-1"></i>${t('btn_edit')}
                    </button>
                    <button onclick="deleteUser(${u.id})" class="text-danger hover:text-danger/80">
                        <i class="fa fa-trash mr-1"></i>${t('btn_delete')}
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
let allBookings = []; // 存储所有预订数据用于筛选

async function loadBookings() {
    const res = await fetch(`${API}/api/bookings`);
    const data = await res.json();
    allBookings = data.bookings || [];
    
    // 应用筛选和搜索
    filterAndDisplayBookings();
}

function filterAndDisplayBookings() {
    const tbody = document.getElementById('bookingTableBody');
    if (!tbody) return;

<<<<<<< HEAD
    if (!data.bookings.length) {
        tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">${currentLang === 'en' ? 'No booking records found' : '暂无预订记录'}</td></tr>`;
=======
    // 获取筛选条件
    const statusFilter = document.getElementById('bookingStatusFilter')?.value || 'all';
    const searchInput = document.getElementById('bookingSearchInput')?.value?.toLowerCase() || '';
    
    // 筛选数据
    let filteredBookings = allBookings;
    
    // 状态筛选
    if (statusFilter !== 'all') {
        filteredBookings = filteredBookings.filter(b => b.status === statusFilter);
    }
    
    // 搜索筛选
    if (searchInput) {
        filteredBookings = filteredBookings.filter(b => 
            (b.id && b.id.toLowerCase().includes(searchInput)) ||
            (b.guestName && b.guestName.toLowerCase().includes(searchInput)) ||
            (b.username && b.username.toLowerCase().includes(searchInput)) ||
            (b.roomName && b.roomName.toLowerCase().includes(searchInput)) ||
            (b.roomType && b.roomType.toLowerCase().includes(searchInput))
        );
    }

    if (!filteredBookings.length) {
        tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">暂无预订记录</td></tr>`;
>>>>>>> b335b0bb1cd3df8f73ac93c66e46e5617aadaf8a
        updateBookingStats({});
        return;
    }

<<<<<<< HEAD
    tbody.innerHTML = data.bookings.map(b => `
=======


    tbody.innerHTML = filteredBookings.map(b => `
>>>>>>> b335b0bb1cd3df8f73ac93c66e46e5617aadaf8a
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-medium">${b.id}</td>
            <td class="px-6 py-4 text-sm">
                <div>${b.guestName || b.username}</div>
                ${b.guestName && b.username !== 'guest' ? `<div class="text-xs text-gray-400">@${b.username}</div>` : ''}
            </td>
            <td class="px-6 py-4 text-sm">
                <div>${getLocalizedValue(b.roomName) || getLocalizedValue(b.roomType) || '-'}</div>
                <div class="text-xs text-gray-400">${b.guests || 2} ${t('guests_unit')}</div>
            </td>
            <td class="px-6 py-4 text-sm">${b.checkIn} / ${b.checkOut}</td>
            <td class="px-6 py-4 text-sm">${b.totalDisplay || (t('currency_symbol') + (b.totalAmount || '-'))}</td>
            <td class="px-6 py-4 text-sm">
                <select onchange="updateBookingStatus('${b.id}', this.value)"
                    class="text-xs border border-gray-200 rounded-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    style="background:transparent;">
                    <option value="pending"       ${b.status === 'pending'       ? 'selected' : ''}>${t('status_pending')}</option>
                    <option value="confirmed"     ${b.status === 'confirmed'     ? 'selected' : ''}>${t('status_confirmed')}</option>
                    <option value="checked-in"    ${b.status === 'checked-in'    ? 'selected' : ''}>${t('status_checked_in')}</option>
                    <option value="checked-out"   ${b.status === 'checked-out'   ? 'selected' : ''}>${t('status_checked_out')}</option>
                    <option value="cancelled"     ${b.status === 'cancelled'     ? 'selected' : ''}>${t('status_cancelled')}</option>
                </select>
            </td>
            <td class="px-6 py-4 text-sm">
                <button onclick="deleteBooking('${b.id}')" class="text-danger hover:text-danger/80">
                    <i class="fa fa-trash mr-1"></i>${t('btn_delete')}
                </button>
            </td>
        </tr>
    `).join('');

    const counts = { pending: 0, confirmed: 0, 'checked-in': 0, cancelled: 0 };
    filteredBookings.forEach(b => { if (counts[b.status] !== undefined) counts[b.status]++; });
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

function filterBookings() { 
    // 应用筛选条件并重新显示
    filterAndDisplayBookings(); 
}

function refreshBookings() { 
    // 重新从服务器加载数据
    loadBookings(); 
}

// ===== 留言管理（显示用户评价，支持回复）=====
let replyingMessageId = null;

async function loadMessages() {
    const res = await fetch(`${API}/api/reviews`);
    const data = await res.json();
    const tbody = document.getElementById('messageTableBody');
    if (!tbody) return;
    if (!data.reviews.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">暂无评价</td></tr>`;
        return;
    }
    const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
    tbody.innerHTML = data.reviews.slice().reverse().map(m => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-medium">${m.username}</td>
            <td class="px-6 py-4 text-sm">
                <div class="text-warning text-sm mb-1">${stars(m.rating)} <span class="text-gray-400 text-xs">${m.rating}.0</span></div>
                <div>${m.comment}</div>
                ${m.reply ? `<div class="mt-1 text-xs text-primary bg-primary/5 px-2 py-1 rounded">管理员回复：${m.reply}</div>` : ''}
            </td>
            <td class="px-6 py-4 text-sm">${new Date(m.createdAt).toLocaleDateString('zh-CN')}</td>
        </tr>
    `).join('');
}

function openReplyModal(id, content) {
    replyingMessageId = id;
    document.getElementById('replyOriginal').textContent = '用户评价：' + content;
    document.getElementById('replyContent').value = '';
    document.getElementById('replyModal').classList.remove('hidden');
}

function closeReplyModal() {
    document.getElementById('replyModal').classList.add('hidden');
    replyingMessageId = null;
}

async function submitReply() {
    const reply = document.getElementById('replyContent').value.trim();
    if (!reply) { alert('请输入回复内容'); return; }
    await fetch(`${API}/api/reviews/${replyingMessageId}/reply`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply })
    });
    closeReplyModal();
    loadMessages();
}

async function deleteMessage(id) {
    if (!confirm('确认删除该评价？')) return;
    await fetch(`${API}/api/reviews/${id}`, { method: 'DELETE' });
    loadMessages();
}

// ===== 评价管理（真实数据）=====
async function loadReviews() {
    const res = await fetch(`${API}/api/reviews`);
    const data = await res.json();
    const tbody = document.getElementById('reviewTableBody');
    if (!tbody) return;

    if (!data.reviews.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">${currentLang === 'en' ? 'No review records found' : '暂无评价记录'}</td></tr>`;
        return;
    }

    tbody.innerHTML = data.reviews.map(r => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm">${r.username}</td>
            <td class="px-6 py-4 text-sm text-warning">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</td>
            <td class="px-6 py-4 text-sm">${r.comment}</td>
            <td class="px-6 py-4 text-sm">${new Date(r.createdAt).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'zh-CN')}</td>
            <td class="px-6 py-4 text-sm">
                <button onclick="deleteReview(${r.id})" class="text-danger hover:text-danger/80">
                    <i class="fa fa-trash mr-1"></i>${t('btn_delete')}
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
