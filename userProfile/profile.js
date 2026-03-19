// 从 JSON 文件加载数据
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        renderTable('用户列表', data.users, 'usersTable');
        renderTable('管理员列表', data.admins, 'adminsTable');
    });

function renderTable(title, list, containerId) {
    const container = document.getElementById(containerId);
    let html = `<h2>${title}</h2><table><thead><tr>
        <th>姓名</th><th>性别</th><th>邮箱</th><th>电话号码</th><th>角色</th>
    </tr></thead><tbody>`;
    list.forEach(person => {
        html += `<tr>
            <td>${person.name}</td>
            <td>${person.gender}</td>
            <td>${person.email}</td>
            <td>${person.phone}</td>
            <td>${person.role}</td>
        </tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
}
