// 主题切换功能
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

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

document.getElementById('checkIn').value = today.toISOString().split('T')[0];
document.getElementById('checkOut').value = tomorrow.toISOString().split('T')[0];

// 表单提交
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('正在查询可用房间...');
});

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
