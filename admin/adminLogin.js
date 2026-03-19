const loginForm = document.getElementById('adminLoginForm');
const registerForm = document.getElementById('adminRegisterForm');

// 切换表单
document.getElementById('toRegister').addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

document.getElementById('toLogin').addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// 管理员登录
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = loginForm.querySelector('input[name="username"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    try {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            if (data.role !== 'admin') {
                alert('This account is not an admin account');
                return;
            }
            sessionStorage.setItem('username', data.username || data.name);
            sessionStorage.setItem('role', data.role);
            
            // 如果账号是 12345678，跳转到 admin_interface.html
            if (username === '12345678') {
                window.location.href = '../admin/admin_interface.html';
            } else {
                window.location.href = '../admin/admin.html';
            }
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert('Cannot connect to server. Please make sure the backend is running.');
    }
});

// 管理员注册
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = registerForm.querySelector('input[name="username"]').value;
    const password = registerForm.querySelector('input[name="password"]').value;

    try {
        const res = await fetch('http://localhost:3000/api/admin/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert('Admin registered successfully! Please sign in.');
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            loginForm.reset();
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert('Cannot connect to server. Please make sure the backend is running.');
    }
});
