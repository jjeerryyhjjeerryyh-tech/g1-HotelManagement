// 主题切换功能
const themeToggle = document.getElementById('theme-toggle');
// 如果 localStorage 没有主题，默认为 'light'
const currentTheme = localStorage.getItem('theme') || 'light';

// 设置初始状态
document.documentElement.setAttribute('data-theme', currentTheme);
if (themeToggle) {
    themeToggle.setAttribute('value', currentTheme);
}

const i18n = {
    zh: {
        menu: '菜单',
        nav_rooms: '房型',
        nav_dining: '餐饮',
        nav_wellness: '康体',
        nav_offers: '优惠',
        nav_academy: '学院',
        nav_city: '城市',
        nav_events: '活动',
        nav_shops: '商店',
        nav_gifts: '礼品',
        nav_news: '资讯',
        nav_perspectives: '视角',
        nav_sustainability: '可持续',
        nav_about: '关于',
        lang: '语言',
        contact_us: '联系我们',
        reserve: '预订',
        search_rooms: '查询房间',
        global_homepage: '全球主页 >',
        select_hotel: '选择酒店 >',
        signup: '注册',
        login: '登录',
        logout: '退出',
        checkin: '入住日期',
        checkout: '离店日期',
        room_count: '房间数',
        guest_count: '入住人数',
        search_available: '查询空房',
        alert_invalid_date: '离店日期必须晚于入住日期',
        lang_opt_en: 'English',
        lang_opt_zh: '中文',
        hero1_line1: '为您开启',
        hero1_line2: '奢华住宿体验',
        hero1_subtitle: '在这里，每一处细节都为您精心打造，让您的旅程充满温馨与舒适。',
        hero1_feat_service: '五星级服务',
        hero1_feat_view: '无敌海景',
        hero1_feat_lux: '顶奢配套',
        hero2_line1: '尽享',
        hero2_line2: '宁静时光',
        hero2_subtitle: '在我们的豪华客房中，您可以完全放松身心，感受家一般的温暖。',
        hero3_line1: '品味',
        hero3_line2: '全球美食',
        hero3_subtitle: '我们的顶级厨师为您准备了各式佳肴，满足您挑剔的味蕾。',
        rooms_opt_1: '1 间',
        rooms_opt_2: '2 间',
        rooms_opt_3: '3 间',
        rooms_opt_4: '4 间',
        rooms_opt_5: '5 间',
        guests_opt_1: '1 人',
        guests_opt_2: '2 人',
        guests_opt_3: '3 人',
        guests_opt_4: '4 人',
        guests_opt_5: '5 人',
        guests_opt_6: '6 人',
        section_rooms: '房型介绍',
        view_all_rooms: '查看全部房型',
        badge_standard: '标准客房',
        badge_deluxe: '豪华客房',
        badge_suite: '套房',
        room_name_standard: '舒适标准间',
        room_name_seaview: '豪华海景房',
        room_name_suite: '行政套房',
        room_name_twin: '商务双床房',
        room_name_presidential: '总统套房',
        room_name_garden: '花园景观房',
        bed_king_twin: '大床/双床',
        bed_king: '特大床',
        bed_twin: '双床',
        bed_queen: '大床',
        guests_2: '2人',
        guests_3: '3人',
        guests_4: '4人',
        per_night: '/晚',
        book_btn: '预订',
        section_offers: '精选优惠',
        tag_stay: '住宿',
        tag_dining: '餐饮',
        tag_event: '活动',
        learn_more: '了解更多 →',
        offer_1_title: '半岛春日限定之旅',
        offer_1_desc: '含早餐、下午茶与城市精选体验，让每一次入住都值得纪念。',
        offer_2_title: '连住优享',
        offer_2_desc: '连住两晚及以上享专属折扣，含自助早餐与延迟退房权益。',
        offer_3_title: '用餐体验 · 住店优惠',
        offer_3_desc: '精选餐厅与下午茶套餐，住店宾客尊享折扣与礼遇。',
        offer_4_title: '亲子礼遇 · 周末计划',
        offer_4_desc: '亲子主题房布置、儿童欢迎礼与体验课程，打造难忘家庭时光。',
        view_more: '查看更多',
        section_connect: '畅享沟通',
        connect_desc: '订阅酒店电子报，第一时间获取专属优惠、旅行灵感以及精彩活动资讯。',
        subscribe_placeholder: '输入您的邮箱地址',
        subscribe_btn: '注册',
        subscribe_success: '已提交订阅：{email}',
        section_events: '活动',
        meta_group: 'XX酒店集团',
        meta_dining: '美食体验',
        meta_family: '家庭时光',
        event_1_title: '艺术回响',
        event_1_desc: '在音乐与灯光的氛围中，感受城市夜色与酒店空间的艺术对话。',
        event_2_title: '周末早午餐',
        event_2_desc: '主厨限定菜单与甜品吧台，搭配现场演奏，让周末更松弛。',
        event_3_title: '亲子手作日',
        event_3_desc: '亲子烘焙、绘画与趣味课程，让孩子在旅途中收获快乐与成长。',
        section_news: '全新资讯与精彩时刻',
        meta_news: '酒店资讯',
        meta_art: '艺术文化',
        learn_detail: '了解详情 →',
        news_feature_desc: '也许独自旅行是沉浸式探索城市的最佳方式。这里为您准备灵感与路线。',
        footer_guest_center: '环球宾客中心',
        footer_guest_booking: '客房预订与咨询',
        footer_guest_membership: '会员权益说明',
        footer_guest_transport: '交通与周边',
        footer_group: 'XX酒店集团',
        footer_about: '关于我们',
        footer_services: '住宿服务',
        footer_food: '餐饮美食',
        footer_contact: '联系我们',
        footer_media: '媒体',
        footer_newsroom: '新闻中心',
        footer_media_contact: '媒体联系人',
        footer_brand_assets: '品牌资料',
        footer_corporate: '企业',
        footer_meetings: '会议与宴会',
        footer_sustainability: '可持续发展',
        footer_careers: '招聘与工作',
        footer_suppliers: '供应商合作',
        footer_copyright: '© 2026 XX酒店',
        footer_privacy: '隐私政策',
        footer_terms: '条款与条件',
        footer_cookie: 'Cookie 设置',
        footer_lang: '语言',
        lang_link_zh: '中文',
        lang_link_en: 'English',
            section_events: '活动',
            section_news: '全新资讯与精彩时刻',
            meta_group: 'XX酒店集团',
            meta_dining: '餐饮体验',
            meta_family: '家庭时光',
            meta_news: '酒店资讯',
            meta_art: '艺术文化',
            event_1_title: '艺术回响',
            event_1_desc: '在音乐与灯光的氛围中，感受城市夜色与酒店空间的艺术对话。',
            event_2_title: '周末早午餐',
            event_2_desc: '主厨限定菜单与甜品吧台，搭配现场演奏，让周末更松弛。',
            event_3_title: '亲子手作日',
            event_3_desc: '亲子烘焙、绘画与趣味课程，让孩子在旅途中收获快乐与成长。',
            news_feature_desc: '也许独自旅行是沉浸式探索城市的最佳方式。这里为您准备灵感与路线。',
            learn_more: '了解更多 →',
            learn_detail: '了解详情 →',
            view_more: '查看更多',
            nav_notifications: '消息提醒',
            section_connect: '畅享沟通',
            connect_desc: '订阅酒店电子报，第一时间获取专属优惠、旅行灵感以及精彩活动资讯。',
            subscribe_placeholder: '输入您的邮箱地址',
            subscribe_btn: '注册'
        },
        en: {
        menu: 'MENU',
        nav_rooms: 'Rooms',
        nav_dining: 'Dining',
        nav_wellness: 'Wellness',
        nav_offers: 'Offers',
        nav_academy: 'Academy',
        nav_city: 'Our City',
        nav_events: 'Events',
        nav_shops: 'Shops',
        nav_gifts: 'Gifts',
        nav_news: 'News',
        nav_perspectives: 'Perspectives',
        nav_sustainability: 'Sustainability',
        nav_about: 'About',
        lang: 'Language',
        contact_us: 'CONTACT US',
        reserve: 'RESERVE',
        search_rooms: 'Search',
        global_homepage: 'GLOBAL HOMEPAGE >',
        select_hotel: 'SELECT A HOTEL >',
        signup: 'Sign up',
        login: 'Log in',
        logout: 'Logout',
        checkin: 'Check-in',
        checkout: 'Check-out',
        room_count: 'Rooms',
        guest_count: 'Guests',
        search_available: 'Search availability',
        alert_invalid_date: 'Check-out date must be after check-in date.',
        lang_opt_en: 'English',
        lang_opt_zh: '中文',
        hero1_line1: 'Begin Your',
        hero1_line2: 'Luxury Stay',
        hero1_subtitle: 'Every detail is thoughtfully crafted to make your journey warm and comfortable.',
        hero1_feat_service: 'Five-star Service',
        hero1_feat_view: 'Ocean View',
        hero1_feat_lux: 'Premium Amenities',
        hero2_line1: 'Enjoy',
        hero2_line2: 'Peaceful Moments',
        hero2_subtitle: 'Unwind completely in our luxury rooms and feel the comfort of home.',
        hero3_line1: 'Savor',
        hero3_line2: 'World-class Cuisine',
        hero3_subtitle: 'Our top chefs prepare exquisite dishes to satisfy your palate.',
        rooms_opt_1: '1 Room',
        rooms_opt_2: '2 Rooms',
        rooms_opt_3: '3 Rooms',
        rooms_opt_4: '4 Rooms',
        rooms_opt_5: '5 Rooms',
        guests_opt_1: '1 Guest',
        guests_opt_2: '2 Guests',
        guests_opt_3: '3 Guests',
        guests_opt_4: '4 Guests',
        guests_opt_5: '5 Guests',
        guests_opt_6: '6 Guests',
        section_rooms: 'Rooms',
        view_all_rooms: 'View All Rooms',
        badge_standard: 'Standard',
        badge_deluxe: 'Deluxe',
        badge_suite: 'Suite',
        room_name_standard: 'Standard Room',
        room_name_seaview: 'Deluxe Sea View Room',
        room_name_suite: 'Executive Suite',
        room_name_twin: 'Business Twin Room',
        room_name_presidential: 'Presidential Suite',
        room_name_garden: 'Garden View Room',
        bed_king_twin: 'King / Twin',
        bed_king: 'King Bed',
        bed_twin: 'Twin Beds',
        bed_queen: 'Queen Bed',
        guests_2: '2 Guests',
        guests_3: '3 Guests',
        guests_4: '4 Guests',
        per_night: '/night',
        book_btn: 'Book',
        section_offers: 'Featured Offers',
        tag_stay: 'Stay',
        tag_dining: 'Dining',
        tag_event: 'Events',
        learn_more: 'Learn more →',
        offer_1_title: 'Spring Journey',
        offer_1_desc: 'Breakfast, afternoon tea, and curated city experiences to make every stay memorable.',
        offer_2_title: 'Stay Longer',
        offer_2_desc: 'Exclusive discounts for 2+ nights, including breakfast and late checkout.',
        offer_3_title: 'Dining Experience',
        offer_3_desc: 'Curated restaurant sets and afternoon tea with exclusive in-house perks.',
        offer_4_title: 'Family Weekend Plan',
        offer_4_desc: 'Family-themed room setup, kids welcome gift, and fun experiences.',
        view_more: 'View More',
        section_connect: 'Stay Connected',
        connect_desc: 'Subscribe to our newsletter for exclusive offers, travel inspiration, and event highlights.',
        subscribe_placeholder: 'Enter your email address',
        subscribe_btn: 'Subscribe',
        subscribe_success: 'Subscribed: {email}',
        section_events: 'Events',
        meta_group: 'Hotel Group',
        meta_dining: 'Dining',
        meta_family: 'Family',
        event_1_title: 'Art In Resonance',
        event_1_desc: 'Experience a dialogue of music, lights, and the city night within our spaces.',
        event_2_title: 'Weekend Brunch',
        event_2_desc: 'Chef’s special menu and dessert bar with live performances for a relaxed weekend.',
        event_3_title: 'Family Craft Day',
        event_3_desc: 'Baking, drawing, and playful classes for joyful family moments.',
        section_news: 'News & Highlights',
        meta_news: 'Hotel News',
        meta_art: 'Arts & Culture',
        learn_detail: 'Learn details →',
        news_feature_desc: 'Solo travel can be the best way to explore a city—discover inspirations and routes here.',
        footer_guest_center: 'Global Guest Center',
            footer_guest_booking: 'Room Reservations',
            footer_guest_membership: 'Membership Benefits',
            footer_guest_transport: 'Transport & Surrounding',
            footer_group: 'XX Hotel Group',
            footer_about: 'About Us',
            footer_services: 'Stay Services',
            footer_food: 'Dining',
            footer_contact: 'Contact Us',
            footer_media: 'Media',
            footer_newsroom: 'Newsroom',
            footer_media_contact: 'Media Contacts',
            footer_brand_assets: 'Brand Assets',
            footer_corporate: 'Corporate',
            footer_meetings: 'Meetings & Events',
            footer_sustainability: 'Sustainability',
            footer_careers: 'Careers',
            footer_suppliers: 'Suppliers',
            footer_copyright: '© 2026 XX Hotel',
            footer_privacy: 'Privacy Policy',
            footer_terms: 'Terms & Conditions',
            footer_cookie: 'Cookie Settings',
            footer_lang: 'Language',
            lang_link_zh: 'Chinese',
            lang_link_en: 'English',
            section_events: 'Events',
            section_news: 'Latest News',
            meta_group: 'XX Hotel Group',
            meta_dining: 'Dining Experience',
            meta_family: 'Family Time',
            meta_news: 'Hotel News',
            meta_art: 'Art & Culture',
            event_1_title: 'Art Resonance',
            event_1_desc: 'Feel the art dialogue between the city night and the hotel space.',
            event_2_title: 'Weekend Brunch',
            event_2_desc: 'Chef special menu and dessert bar with live performance.',
            event_3_title: 'Family Craft Day',
            event_3_desc: 'Baking, painting and fun classes for kids.',
            news_feature_desc: 'Maybe solo travel is the best way to explore the city.',
            learn_more: 'Learn More →',
            learn_detail: 'Details →',
            view_more: 'View More',
            nav_notifications: 'Notifications',
            section_connect: 'Stay Connected',
            connect_desc: 'Subscribe to our newsletter for exclusive offers and updates.',
            subscribe_placeholder: 'Enter email address',
            subscribe_btn: 'Subscribe'
        }
    };

let currentLang = localStorage.getItem('lang') || 'zh';
if (!i18n[currentLang]) currentLang = 'zh';

const langSelect = document.getElementById('langSelect');
if (langSelect) langSelect.value = currentLang;
document.documentElement.setAttribute('lang', currentLang === 'zh' ? 'zh-CN' : 'en');
document.documentElement.setAttribute('data-lang', currentLang);

// 导航栏滚动效果
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 侧边栏菜单逻辑
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarExploreLink = document.getElementById('sidebarExploreLink');
const sidebarRightContent = document.getElementById('sidebarRightContent');

const menuData = {
    rooms: {
        exploreText: { zh: '探索所有房型 >', en: 'EXPLORE ALL ROOMS >' },
        exploreHref: '../BookOut/Book.html',
        items: [
            { img: 'images/hotel1.png', title: { zh: '豪华客房', en: 'Deluxe Room' }, sub: { zh: '舒适与雅致并存', en: 'Comfort meets elegance' }, href: '../BookOut/Book.html' },
            { img: 'images/hotel2.png', title: { zh: '海景房', en: 'Harbour View Room' }, sub: { zh: '尽览城市海岸线', en: 'A view to remember' }, href: '../BookOut/Book.html' },
            { img: 'images/hotel3.png', title: { zh: '行政套房', en: 'Superior Suite' }, sub: { zh: '更宽阔的私享空间', en: 'More space, more style' }, href: '../BookOut/Book.html' }
        ]
    },
    dining: {
        exploreText: { zh: '探索全部餐饮 >', en: 'EXPLORE ALL DINING >' },
        exploreHref: '#',
        items: [
            { img: 'images/hotel1.png', title: { zh: '全日餐厅', en: 'The Lobby' }, sub: { zh: '国际自助与下午茶', en: 'All day dining & tea' }, href: '#' },
            { img: 'images/hotel2.png', title: { zh: '法式餐厅', en: "Gaddi's" }, sub: { zh: '精选时令料理', en: 'Seasonal fine dining' }, href: '#' },
            { img: 'images/hotel3.png', title: { zh: '酒吧', en: 'Felix' }, sub: { zh: '夜色与城市天际线', en: 'Cocktails with skyline' }, href: '#' }
        ]
    },
    wellness: {
        exploreText: { zh: '探索全部康体 >', en: 'EXPLORE ALL WELLNESS >' },
        exploreHref: '#',
        items: [
            { img: 'images/hotel2.png', title: { zh: '水疗中心', en: 'The Peninsula Spa' }, sub: { zh: '专业护理与放松体验', en: 'Treatments & relaxation' }, href: '#' },
            { img: 'images/hotel3.png', title: { zh: '健身中心', en: 'Fitness Centre' }, sub: { zh: '全套器械与课程', en: 'Gym & classes' }, href: '#' },
            { img: 'images/hotel1.png', title: { zh: '泳池', en: 'The Pool' }, sub: { zh: '静谧空间，尽享时光', en: 'Swim in serenity' }, href: '#' }
        ]
    },
    offers: {
        exploreText: { zh: '探索全部优惠 >', en: 'EXPLORE ALL OFFERS >' },
        exploreHref: '#offers',
        items: [
            { img: 'images/hotel1.png', title: { zh: '提前预订优惠', en: 'Luxury In Advance' }, sub: { zh: '提前预订享更多礼遇', en: 'Book early, save more' }, href: '#offers' },
            { img: 'images/hotel2.png', title: { zh: '连住礼遇', en: 'Stay Longer' }, sub: { zh: '多住一晚，多一份从容', en: 'More nights, more perks' }, href: '#offers' },
            { img: 'images/hotel3.png', title: { zh: '餐饮体验', en: 'Dining Experience' }, sub: { zh: '精选餐饮组合', en: 'Curated culinary offers' }, href: '#offers' }
        ]
    },
    academy: {
        exploreText: { zh: '探索更多 >', en: 'EXPLORE MORE >' },
        exploreHref: '#',
        items: [
            { img: 'images/hotel2.png', title: { zh: '烹饪学院', en: 'Culinary Academy' }, sub: { zh: '大师课程与体验', en: 'Classes & experiences' }, href: '#' }
        ]
    },
    city: {
        exploreText: { zh: '探索城市 >', en: 'EXPLORE OUR CITY >' },
        exploreHref: '#',
        items: [
            { img: 'images/hotel3.png', title: { zh: '城市漫游', en: 'City Walks' }, sub: { zh: '精选路线与推荐', en: 'Curated routes' }, href: '#' }
        ]
    },
    events: {
        exploreText: { zh: '探索活动 >', en: 'EXPLORE EVENTS >' },
        exploreHref: '#events',
        items: [
            { img: 'images/hotel1.png', title: { zh: '主题活动', en: 'Seasonal Events' }, sub: { zh: '每月精彩活动', en: 'Monthly highlights' }, href: '#events' }
        ]
    },
    shops: {
        exploreText: { zh: '探索商店 >', en: 'EXPLORE SHOPS >' },
        exploreHref: '#',
        items: [
            { img: 'images/hotel2.png', title: { zh: '精品店', en: 'Boutique' }, sub: { zh: '精选礼品与纪念品', en: 'Gifts & souvenirs' }, href: '#' }
        ]
    },
    gifts: {
        exploreText: { zh: '探索礼品 >', en: 'EXPLORE GIFTS >' },
        exploreHref: '#',
        items: [
            { img: 'images/hotel3.png', title: { zh: '礼品卡', en: 'Gift Cards' }, sub: { zh: '把礼遇送给重要的人', en: 'Share the experience' }, href: '#' }
        ]
    },
    perspectives: {
        exploreText: { zh: '探索资讯 >', en: 'EXPLORE PERSPECTIVES >' },
        exploreHref: '#news',
        items: [
            { img: 'images/hotel1.png', title: { zh: '最新资讯', en: 'Latest Stories' }, sub: { zh: '关于酒店与城市', en: 'Hotel & city news' }, href: '#news' }
        ]
    },
    sustainability: {
        exploreText: { zh: '探索可持续 >', en: 'EXPLORE SUSTAINABILITY >' },
        exploreHref: '#about',
        items: [
            { img: 'images/hotel2.png', title: { zh: '可持续发展', en: 'Sustainability' }, sub: { zh: '我们的承诺与实践', en: 'Our commitments' }, href: '#about' }
        ]
    }
};

let activeMenuKey = 'rooms';

function pickLangText(value) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[currentLang] || value.zh || value.en || '';
}

function renderMenuPanel(key) {
    const data = menuData[key] || menuData.rooms;
    activeMenuKey = key in menuData ? key : 'rooms';
    if (sidebarExploreLink) {
        sidebarExploreLink.textContent = pickLangText(data.exploreText);
        sidebarExploreLink.setAttribute('href', data.exploreHref || '#');
    }
    if (sidebarRightContent) {
        sidebarRightContent.innerHTML = (data.items || []).map((item) => `
            <a class="sidebar-card" href="${item.href || '#'}">
                <img src="${item.img}" alt="">
                <div>
                    <div class="sidebar-card-title">${pickLangText(item.title)}</div>
                    <div class="sidebar-card-sub">${pickLangText(item.sub)}</div>
                </div>
            </a>
        `).join('');
    }
}

function setActiveMenu(key) {
    if (!sidebarMenu) return;
    sidebarMenu.querySelectorAll('.sidebar-item').forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-menu') === key);
    });
    renderMenuPanel(key);
}

function openSidebar() {
    if (sidebar) sidebar.classList.add('active');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
    setActiveMenu(activeMenuKey);
}

function closeSidebar() {
    if (sidebar) sidebar.classList.remove('active');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (menuBtn) menuBtn.addEventListener('click', openSidebar);
if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
if (sidebarMenu) {
    sidebarMenu.addEventListener('click', (e) => {
        const btn = e.target.closest('.sidebar-item');
        if (!btn) return;
        const key = btn.getAttribute('data-menu');
        if (!key) return;
        setActiveMenu(key);
    });
}

const applyI18n = () => {
    const dict = i18n[currentLang] || i18n.zh;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (!key) return;
        if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });
};

applyI18n();

if (langSelect) {
    langSelect.addEventListener('change', () => {
        const next = langSelect.value;
        currentLang = i18n[next] ? next : 'zh';
        localStorage.setItem('lang', currentLang);
        document.documentElement.setAttribute('lang', currentLang === 'zh' ? 'zh-CN' : 'en');
        document.documentElement.setAttribute('data-lang', currentLang);
        applyI18n();
        renderMenuPanel(activeMenuKey);
    });
}

if (themeToggle) {
    themeToggle.addEventListener('change', (e) => {
        const newTheme = e.detail;
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// 轮播功能
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

document.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
});

// 自动播放
setInterval(() => showSlide(currentSlide + 1), 5000);

// 设置默认日期
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const checkInEl = document.getElementById('checkIn');
const checkOutEl = document.getElementById('checkOut');
if (checkInEl && checkOutEl) {
    checkInEl.value = today.toISOString().split('T')[0];
    checkOutEl.value = tomorrow.toISOString().split('T')[0];
}

const searchModal = document.getElementById('hpSearchModal');
const openSearchBtn = document.getElementById('openSearchBtn');
const closeSearchBtn = document.getElementById('hpSearchCloseBtn');

const closeSearchModal = () => {
    if (!searchModal) return;
    searchModal.classList.remove('active');
    searchModal.setAttribute('aria-hidden', 'true');
};

const openSearchModal = () => {
    if (!searchModal) return;
    searchModal.classList.add('active');
    searchModal.setAttribute('aria-hidden', 'false');
    if (checkInEl && !checkInEl.value) checkInEl.value = today.toISOString().split('T')[0];
    if (checkOutEl && !checkOutEl.value) checkOutEl.value = tomorrow.toISOString().split('T')[0];
};

if (openSearchBtn) openSearchBtn.addEventListener('click', openSearchModal);
if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearchModal);
if (searchModal) {
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearchModal();
    });
}
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearchModal();
});

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const checkIn = checkInEl ? checkInEl.value : '';
        const checkOut = checkOutEl ? checkOutEl.value : '';
        const rooms = document.getElementById('rooms') ? document.getElementById('rooms').value : '1';
        const guests = document.getElementById('guests') ? document.getElementById('guests').value : '2';

        if (!checkIn || !checkOut) return;
        if (new Date(checkIn) >= new Date(checkOut)) {
            const dict = i18n[currentLang] || i18n.zh;
            alert(dict.alert_invalid_date);
            return;
        }

        sessionStorage.setItem('bookingSearch', JSON.stringify({ checkIn, checkOut, rooms, guests }));
        closeSearchModal();
        window.location.href = '../BookOut/Book.html';
    });
}

// 显示登录用户名
const username = sessionStorage.getItem('username');
if (username) {
    document.getElementById('registerBtn').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('userGreeting').style.display = 'inline';
    document.getElementById('userGreeting').textContent = '👤 ' + username;
    document.getElementById('logoutBtn').style.display = 'inline';
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('username');
    window.location.reload();
});

const subscribeForm = document.getElementById('hpSubscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailEl = document.getElementById('hpSubscribeEmail');
        const email = emailEl ? emailEl.value.trim() : '';
        if (!email) return;

        const username = sessionStorage.getItem('username');
        const dict = i18n[currentLang] || i18n.zh;

        try {
            const response = await fetch('http://localhost:3000/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username })
            });

            if (response.ok) {
                const tpl = dict.subscribe_success || 'Subscribed: {email}';
                alert(tpl.replace('{email}', email));
                subscribeForm.reset();
                
                // 如果已登录，发送通知
                if (username && window.notificationSystem) {
                    window.notificationSystem.createNotification(
                        username,
                        'newsletter_subscription',
                        '订阅成功',
                        '您已成功订阅酒店新闻简报。'
                    );
                }
            } else {
                alert('订阅失败，请稍后重试。');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            alert('服务器连接失败。');
        }
    });
}

const activityTrack = document.getElementById('hpActivityTrack');
const activityPrev = document.getElementById('hpActivityPrev');
const activityNext = document.getElementById('hpActivityNext');
const activityIndicator = document.getElementById('hpActivityIndicator');

if (activityTrack && activityPrev && activityNext && activityIndicator) {
    const total = activityTrack.children.length;
    let index = 0;

    const pad2 = (n) => String(n).padStart(2, '0');
    const render = () => {
        activityTrack.style.transform = `translateX(-${index * 100}%)`;
        activityIndicator.textContent = `${pad2(index + 1)}/${pad2(total)}`;
    };

    activityPrev.addEventListener('click', () => {
        index = (index - 1 + total) % total;
        render();
    });

    activityNext.addEventListener('click', () => {
        index = (index + 1) % total;
        render();
    });

    render();
}
