// 主题切换功能
const themeToggle = document.getElementById('theme-toggle');
// 如果 localStorage 没有主题，默认为 'light'
const currentTheme = localStorage.getItem('theme') || 'light';

// 设置初始状态
document.documentElement.setAttribute('data-theme', currentTheme);
if (themeToggle) {
    themeToggle.setAttribute('value', currentTheme);
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
            alert('离店日期必须晚于入住日期');
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
