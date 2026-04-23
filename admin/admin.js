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
        roomtype_management_title: '房型管理',
        add_roomtype_button: '新增房型',
        table_roomtype_name: '房型名称',
        table_bed_area: '床型/面积',
        table_occupancy: '可住人数',
        table_base_price: '基础价格',
        table_status: '状态',
        add_roomtype_modal_title: '新增房型',
        form_roomtype_name: '房型名称',
        form_roomtype_type: '类型',
        option_standard_room: '标准客房',
        option_deluxe_room: '豪华客房',
        option_suite: '套房',
        form_roomtype_area: '面积',
        form_roomtype_bed_type: '床型',
        form_roomtype_occupancy: '可住人数',
        form_roomtype_base_price: '基础价格 (¥)',
        form_roomtype_original_price: '原价 (¥)',
        form_roomtype_available_quantity: '可用数量',
        form_roomtype_image_url: '图片 URL',
        form_roomtype_cancellation_policy: '取消政策',
        button_cancel: '取消',
        button_save: '保存',
        user_management_title: '用户管理',
        add_user_button: '新增用户',
        room_management_title: '房间管理',
        add_room_button: '新增房间',
        table_room_number: '房号',
        table_room_type: '房型',
        table_floor: '楼层',
        status_occupied: '已入住',
        interface_only: '（仅界面）',
        stat_pending_bookings: '待确认预订',
        stat_confirmed_bookings: '已确认预订',
        stat_checked_in: '已入住',
        stat_cancelled_bookings: '已取消预订',
        booking_management_title: '预订管理',
        option_all_status: '所有状态',
        option_pending: '待确认',
        option_confirmed: '已确认',
        option_checked_in: '已入住',
        option_cancelled: '已取消',
        search_booking_placeholder: '搜索订单号/姓名/手机...',
        button_refresh: '刷新',
        table_order_number: '订单号',
        table_booker: '预订人',
        table_room_type_number: '房型/房号',
        table_checkin_checkout_date: '入住/退房日期',
        table_total_amount: '总金额',
        checkin_management_title: '入住管理',
        add_checkin_button: '新增入住',
        table_checkin_number: '入住单号',
        table_checkin_time: '入住时间',
        status_checked_in: '已入住',
        message_management_title: '留言管理',
        button_filter: '筛选',
        table_messenger: '留言人',
        table_content: '内容',
        table_time: '时间',
        status_unreplied: '未回复',
        announcement_management_title: '公告管理',
        publish_announcement_button: '发布公告',
        table_title: '标题',
        table_publish_time: '发布时间',
        table_publisher: '发布人',
        status_published: '已发布',
        review_management_title: '评价管理',
        table_rating: '评分',
        room_booking_conditions_title: '房间预订条件',
        form_checkin_date: '入住日期',
        form_checkout_date: '退房日期',
        form_room_type: '房型',
        option_all_room_types: '全部房型',
        button_search_available_rooms: '查询可用房间',
        date_error_message: '请检查日期：入住日期需晚于今日、早于退房日期',
        no_available_rooms_tip: '暂无可用房间，请调整预订条件',
        room_number_type: '{no} | {type}',
        room_price_per_night: '单价：¥{price}/晚',
        nights_stayed: '入住晚数：{nights}晚',
        total_price: '总价：¥{total}',
        button_select_room: '选择此房间',
        nights_unit: '晚',
        per_night_unit: '晚',
        booker_label: '预订人：',
        contact_email_label: '联系邮箱：',
        confirm_booking_info_title: '确认预订信息',
        button_confirm_booking: '确认预订',
        booking_success_title: '预订成功！',
        order_number_tip: '您的订单号：',
        booking_email_sent_tip: '我们已向您的邮箱发送预订通知，请注意查收',
        button_confirm: '确认',
        room_unavailable_alert: '抱歉，该房间已被他人预订，请重新选择',
        booking_details_title: '预订详情',
        button_close: '关闭',
        no_roomtypes_found: '暂无房型',
        person_unit: '人',
        status_enabled: '启用',
        button_edit: '编辑',
        button_delete: '删除',
        no_users_found: '暂无用户',
        confirm_delete_user: '确认删除该用户？',
        no_bookings_found: '暂无预订记录',
        status_confirmed: '已确认',
        status_pending: '待确认',
        status_cancelled: '已取消',
        status_checked_in: '已入住',
        status_checked_out: '已退房',
        checkin_person_unit: '人入住',
        no_reviews_found: '暂无评价记录',
        confirm_delete_roomtype: '确认删除该房型？',
        confirm_delete_booking: '确认删除该预订？',
        confirm_delete_review: '确认删除该评价？',
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
        roomtype_management_title: 'Room Type Management',
        add_roomtype_button: 'Add Room Type',
        table_roomtype_name: 'Room Type Name',
        table_bed_area: 'Bed Type/Area',
        table_occupancy: 'Occupancy',
        table_base_price: 'Base Price',
        table_status: 'Status',
        add_roomtype_modal_title: 'Add Room Type',
        form_roomtype_name: 'Room Type Name',
        form_roomtype_type: 'Type',
        option_standard_room: 'Standard Room',
        option_deluxe_room: 'Deluxe Room',
        option_suite: 'Suite',
        form_roomtype_area: 'Area',
        form_roomtype_bed_type: 'Bed Type',
        form_roomtype_occupancy: 'Occupancy',
        form_roomtype_base_price: 'Base Price (¥)',
        form_roomtype_original_price: 'Original Price (¥)',
        form_roomtype_available_quantity: 'Available Quantity',
        form_roomtype_image_url: 'Image URL',
        form_roomtype_cancellation_policy: 'Cancellation Policy',
        button_cancel: 'Cancel',
        button_save: 'Save',
        user_management_title: 'User Management',
        add_user_button: 'Add User',
        room_management_title: 'Room Management',
        add_room_button: 'Add Room',
        table_room_number: 'Room No.',
        table_room_type: 'Room Type',
        table_floor: 'Floor',
        status_occupied: 'Occupied',
        interface_only: '(Interface Only)',
        stat_pending_bookings: 'Pending Bookings',
        stat_confirmed_bookings: 'Confirmed Bookings',
        stat_checked_in: 'Checked-in',
        stat_cancelled_bookings: 'Cancelled Bookings',
        booking_management_title: 'Booking Management',
        option_all_status: 'All Status',
        option_pending: 'Pending',
        option_confirmed: 'Confirmed',
        option_checked_in: 'Checked-in',
        option_cancelled: 'Cancelled',
        search_booking_placeholder: 'Search Order No./Name/Phone...', 
        button_refresh: 'Refresh',
        table_order_number: 'Order No.',
        table_booker: 'Booker',
        table_room_type_number: 'Room Type/No.',
        table_checkin_checkout_date: 'Check-in/Check-out Date',
        table_total_amount: 'Total Amount',
        checkin_management_title: 'Check-in Management',
        add_checkin_button: 'Add Check-in',
        table_checkin_number: 'Check-in No.',
        table_checkin_time: 'Check-in Time',
        status_checked_in: 'Checked-in',
        message_management_title: 'Message Management',
        button_filter: 'Filter',
        table_messenger: 'Messenger',
        table_content: 'Content',
        table_time: 'Time',
        status_unreplied: 'Unreplied',
        announcement_management_title: 'Announcement Management',
        publish_announcement_button: 'Publish Announcement',
        table_title: 'Title',
        table_publish_time: 'Publish Time',
        table_publisher: 'Publisher',
        status_published: 'Published',
        review_management_title: 'Review Management',
        table_rating: 'Rating',
        room_booking_conditions_title: 'Room Booking Conditions',
        form_checkin_date: 'Check-in Date',
        form_checkout_date: 'Check-out Date',
        form_room_type: 'Room Type',
        option_all_room_types: 'All Room Types',
        button_search_available_rooms: 'Search Available Rooms',
        date_error_message: 'Please check dates: Check-in date must be after today and before check-out date.',
        no_available_rooms_tip: 'No rooms available, please adjust booking conditions.',
        room_number_type: '{no} | {type}',
        room_price_per_night: 'Price: ¥{price}/night',
        nights_stayed: 'Nights: {nights}',
        total_price: 'Total: ¥{total}',
        button_select_room: 'Select This Room',
        nights_unit: ' nights',
        per_night_unit: 'night',
        booker_label: 'Booker:',
        contact_email_label: 'Contact Email:',
        confirm_booking_info_title: 'Confirm Booking Information',
        button_confirm_booking: 'Confirm Booking',
        booking_success_title: 'Booking Successful!',
        order_number_tip: 'Your Order Number:',
        booking_email_sent_tip: 'We have sent a booking notification to your email, please check.',
        button_confirm: 'Confirm',
        room_unavailable_alert: 'Sorry, this room is already booked. Please choose another.',
        booking_details_title: 'Booking Details',
        button_close: 'Close',
        no_roomtypes_found: 'No room types found',
        person_unit: 'persons',
        status_enabled: 'Enabled',
        button_edit: 'Edit',
        button_delete: 'Delete',
        no_users_found: 'No users found',
        confirm_delete_user: 'Confirm deletion of this user?',
        no_bookings_found: 'No booking records found',
        status_confirmed: 'Confirmed',
        status_pending: 'Pending',
        status_cancelled: 'Cancelled',
        status_checked_in: 'Checked-in',
        status_checked_out: 'Checked-out',
        checkin_person_unit: 'persons staying',
        no_reviews_found: 'No review records found',
        confirm_delete_roomtype: 'Confirm deletion of this room type?',
        confirm_delete_booking: 'Confirm deletion of this booking?',
        confirm_delete_review: 'Confirm deletion of this review?',
    }
};

let currentLang = localStorage.getItem('lang') || 'zh';

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
}

// ===== 房型管理 =====
let editingRoomTypeId = null;

async function loadRoomTypes() {
    const res = await fetch(`${API}/api/roomtypes`);
    const data = await res.json();
    const tbody = document.getElementById('roomTypeTableBody');
    if (!tbody) return;
    if (!data.roomTypes.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-400">${i18nAdmin[currentLang].no_roomtypes_found}</td></tr>`;
        return;
    }
    tbody.innerHTML = data.roomTypes.map(r => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-medium">${r.name}</td>
            <td class="px-6 py-4 text-sm">${r.bed || '-'} / ${r.size || '-'}</td>
            <td class="px-6 py-4 text-sm">${r.guests} ${i18nAdmin[currentLang].person_unit}</td>
            <td class="px-6 py-4 text-sm">¥${r.price}</td>
            <td class="px-6 py-4 text-sm"><span class="px-2 py-1 rounded-full text-xs bg-success/10 text-success">${i18nAdmin[currentLang].status_enabled}</span></td>
            <td class="px-6 py-4 text-sm">
                <div class="flex space-x-3">
                    <button onclick="editRoomType('${r.id}')" class="text-warning hover:text-warning/80"><i class="fa fa-edit mr-1"></i>${i18nAdmin[currentLang].button_edit}</button>
                    <button onclick="deleteRoomType('${r.id}')" class="text-danger hover:text-danger/80"><i class="fa fa-trash mr-1"></i>${i18nAdmin[currentLang].button_delete}</button>
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
    if (!confirm(i18nAdmin[currentLang].confirm_delete_roomtype)) return;
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
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">${i18nAdmin[currentLang].no_users_found}</td></tr>`;
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
                        <i class="fa fa-edit mr-1"></i>${i18nAdmin[currentLang].button_edit}
                    </button>
                    <button onclick="deleteUser(${u.id})" class="text-danger hover:text-danger/80">
                        <i class="fa fa-trash mr-1"></i>${i18nAdmin[currentLang].button_delete}
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
    if (!confirm(i18nAdmin[currentLang].confirm_delete_user)) return;
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
        tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">${i18nAdmin[currentLang].no_bookings_found}</td></tr>`;
        updateBookingStats({});
        return;
    }

    const statusMap = {
        confirmed:      `<span class="px-2 py-1 text-xs rounded-full bg-success/10 text-success">${i18nAdmin[currentLang].status_confirmed}</span>`,
        pending:        `<span class="px-2 py-1 text-xs rounded-full bg-warning/10 text-warning">${i18nAdmin[currentLang].status_pending}</span>`,
        cancelled:      `<span class="px-2 py-1 text-xs rounded-full bg-danger/10 text-danger">${i18nAdmin[currentLang].status_cancelled}</span>`,
        'checked-in':   `<span class="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">${i18nAdmin[currentLang].status_checked_in}</span>`,
        'checked-out':  `<span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">${i18nAdmin[currentLang].status_checked_out}</span>`
    };

    tbody.innerHTML = data.bookings.map(b => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-medium">${b.id}</td>
            <td class="px-6 py-4 text-sm">
                <div>${b.guestName || b.username}</div>
                ${b.guestName && b.username !== 'guest' ? `<div class="text-xs text-gray-400">@${b.username}</div>` : ''}
            </td>
            <td class="px-6 py-4 text-sm">
                <div>${b.roomName || b.roomType || '-'}</div>
                <div class="text-xs text-gray-400">${b.guests || 2} ${i18nAdmin[currentLang].person_unit} ${i18nAdmin[currentLang].checkin_person_unit}</div>
            </td>
            <td class="px-6 py-4 text-sm">${b.checkIn} / ${b.checkOut}</td>
            <td class="px-6 py-4 text-sm">${b.totalDisplay || ('¥' + (b.totalAmount || '-'))}</td>
            <td class="px-6 py-4 text-sm">
                <select onchange="updateBookingStatus('${b.id}', this.value)"
                    class="text-xs border border-gray-200 rounded-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    style="background:transparent;">
                    <option value="pending"       ${b.status === 'pending'       ? 'selected' : ''}>${i18nAdmin[currentLang].status_pending}</option>
                    <option value="confirmed"     ${b.status === 'confirmed'     ? 'selected' : ''}>${i18nAdmin[currentLang].status_confirmed}</option>
                    <option value="checked-in"    ${b.status === 'checked-in'    ? 'selected' : ''}>${i18nAdmin[currentLang].status_checked_in}</option>
                    <option value="checked-out"   ${b.status === 'checked-out'   ? 'selected' : ''}>${i18nAdmin[currentLang].status_checked_out}</option>
                    <option value="cancelled"     ${b.status === 'cancelled'     ? 'selected' : ''}>${i18nAdmin[currentLang].status_cancelled}</option>
                </select>
            </td>
            <td class="px-6 py-4 text-sm">
                <button onclick="deleteBooking('${b.id}')" class="text-danger hover:text-danger/80">
                    <i class="fa fa-trash mr-1"></i>${i18nAdmin[currentLang].button_delete}
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
    if (!confirm(i18nAdmin[currentLang].confirm_delete_booking)) return;
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
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">${i18nAdmin[currentLang].no_reviews_found}</td></tr>`;
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
    if (!confirm(i18nAdmin[currentLang].confirm_delete_review)) return;
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
