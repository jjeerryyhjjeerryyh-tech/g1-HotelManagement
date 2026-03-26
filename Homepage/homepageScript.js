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
        alert_invalid_date: '离店日期必须晚于入住日期'
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
        alert_invalid_date: 'Check-out date must be after check-in date.'
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

document.querySelectorAll('.hp-rooms .hp-btn-sm').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const u = sessionStorage.getItem('username');
        if (u) return;
        e.preventDefault();
        window.location.href = '../login/login.html';
    });
});

const subscribeForm = document.getElementById('hpSubscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailEl = document.getElementById('hpSubscribeEmail');
        const email = emailEl ? emailEl.value.trim() : '';
        if (!email) return;
        alert('已提交订阅：' + email);
        subscribeForm.reset();
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
