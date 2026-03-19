const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'userProfile', 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 读取数据
function readData() {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
}

// 写入数据
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4), 'utf-8');
}

// 注册
app.post('/api/register', async (req, res) => {
    const { username, fullName, email, phone, password } = req.body;

    if (!username || !fullName || !email || !phone || !password) {
        return res.status(400).json({ message: '请填写所有字段' });
    }

    const data = readData();
    const exists = data.users.find(u => u.username === username || u.email === email);
    if (exists) {
        return res.status(409).json({ message: '用户名或邮箱已存在' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: Date.now(),
        username,
        name: fullName,
        email,
        phone,
        password: hashedPassword,
        role: 'user'
    };

    data.users.push(newUser);
    writeData(data);
    res.json({ message: '注册成功' });
});

// 登录
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const data = readData();
    const user = data.users.find(u => u.username === username || u.email === username)
                || data.admins.find(u => u.username === username || u.email === username);

    if (!user) {
        return res.status(401).json({ message: '用户不存在' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ message: '密码错误' });
    }

    res.json({ message: '登录成功', role: user.role, name: user.name, username: user.username });
});

// 管理员注册
app.post('/api/admin/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const data = readData();
    const exists = data.admins.find(a => a.username === username);
    if (exists) {
        return res.status(409).json({ message: 'Admin username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    data.admins.push({
        id: Date.now(),
        username,
        password: hashedPassword,
        role: 'admin'
    });

    writeData(data);
    res.json({ message: 'Admin registered successfully' });
});

// 获取所有用户（仅管理员用）
app.get('/api/users', (req, res) => {
    const data = readData();
    const users = data.users.map(({ password, ...u }) => u);
    res.json({ users });
});

// 新增用户
app.post('/api/users', async (req, res) => {
    const { username, fullName, email, phone, password } = req.body;
    if (!username || !fullName || !email || !phone || !password)
        return res.status(400).json({ message: 'Please fill in all fields' });

    const data = readData();
    if (data.users.find(u => u.username === username || u.email === email))
        return res.status(409).json({ message: 'Username or email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    data.users.push({ id: Date.now(), username, name: fullName, email, phone, password: hashedPassword, role: 'user' });
    writeData(data);
    res.json({ message: 'User created successfully' });
});

// 更新用户
app.put('/api/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { username, fullName, email, phone, password } = req.body;
    const data = readData();
    const idx = data.users.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ message: 'User not found' });

    data.users[idx] = {
        ...data.users[idx],
        username: username || data.users[idx].username,
        name: fullName || data.users[idx].name,
        email: email || data.users[idx].email,
        phone: phone || data.users[idx].phone,
        password: password ? await bcrypt.hash(password, 10) : data.users[idx].password
    };
    writeData(data);
    res.json({ message: 'User updated successfully' });
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readData();
    const idx = data.users.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ message: 'User not found' });
    data.users.splice(idx, 1);
    writeData(data);
    res.json({ message: 'User deleted successfully' });
});

app.listen(3000, () => console.log('服务器运行在 http://localhost:3000'));
