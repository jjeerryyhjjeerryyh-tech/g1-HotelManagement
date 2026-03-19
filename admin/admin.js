// 滚动到客户管理区域
function scrollToUsers() {
    document.getElementById('section-users').scrollIntoView({ behavior: 'smooth' });
}

// 权限验证
const role = sessionStorage.getItem('role');
const username = sessionStorage.getItem('username');
if (role !== 'admin') {
    alert('Access denied');
    window.location.href = '../admin/adminLogin.html';
}

const API = 'http://localhost:3000';
let editingId = null;

// 加载用户列表
async function loadUsers() {
    const res = await fetch(`${API}/api/users`);
    const data = await res.json();
    const tbody = document.getElementById('userTableBody');
    if (!data.users.length) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">No users found</td></tr>`;
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
    document.getElementById('modalTitle').textContent = 'Add User';
    document.getElementById('userForm').reset();
    document.getElementById('passwordHint').style.display = 'none';
    document.getElementById('fieldPassword').required = true;
    document.getElementById('userModal').classList.remove('hidden');
}

// 打开编辑弹窗
function editUser(id, username, name, email, phone) {
    editingId = id;
    document.getElementById('modalTitle').textContent = 'Edit User';
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

// 删除用户
async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const res = await fetch(`${API}/api/users/${id}`, { method: 'DELETE' });
    const data = await res.json();
    alert(data.message);
    loadUsers();
}

// 表单提交（新增 / 编辑）
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

    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
        closeModal();
        loadUsers();
    } else {
        alert(data.message);
    }
});

// 退出登录
document.querySelector('.fa-sign-out').closest('button').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '../admin/adminLogin.html';
});

// 初始化
loadUsers();
