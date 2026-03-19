// 验证是否是管理员
const role = sessionStorage.getItem('role');
const username = sessionStorage.getItem('username');

if (role !== 'admin') {
    alert('无权限访问');
    window.location.href = '../login/login.html';
}

document.getElementById('adminGreeting').textContent = '👤 ' + username;

document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '../login/login.html';
});

// 加载用户列表
fetch('http://localhost:3000/api/users')
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector('#userTable tbody');
        const all = [...data.users, ...data.admins];
        tbody.innerHTML = all.map(u => `
            <tr>
                <td>${u.username}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.phone}</td>
                <td>${u.role}</td>
            </tr>
        `).join('');
    });
