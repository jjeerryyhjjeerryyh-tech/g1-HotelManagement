const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');

// 1. 主题切换逻辑 (系统功能 11)
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// 2. 登录/注册切换逻辑
toRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

toLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// 3. 基础表单提交处理 (系统功能 1)
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('正在验证登录信息...');
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('正在创建您的酒店管理账户...');
});

function switchForm(hideForm, showForm) {
    hideForm.style.opacity = '0';
    setTimeout(() => {
        hideForm.classList.add('hidden');
        showForm.classList.remove('hidden');
        showForm.style.opacity = '1';
    }, 300);
}

toRegister.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(loginForm, registerForm);
});

toLogin.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(registerForm, loginForm);
});