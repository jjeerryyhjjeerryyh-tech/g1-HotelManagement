const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'userProfile', 'data.json');
const BOOKINGS_FILE = path.join(__dirname, 'BookOut', 'bookings.json');

app.use(cors());
app.use(express.json());

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
    const { username, fullName, email, phone, password, subscribed } = req.body;

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
        role: 'user',
        subscribed: !!subscribed
    };

    data.users.push(newUser);

    // 如果注册时勾选了订阅，也加入全局订阅列表
    if (subscribed) {
        if (!data.subscribers) data.subscribers = [];
        if (!data.subscribers.includes(email)) {
            data.subscribers.push(email);
        }
    }

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

// ===== 房型 API =====
app.get('/api/roomtypes', (req, res) => {
    const data = readData();
    res.json({ roomTypes: data.roomTypes || [] });
});

app.post('/api/roomtypes', (req, res) => {
    const { name, type, size, bed, guests, price, originalPrice, image, policy, available } = req.body;
    if (!name || !price) return res.status(400).json({ message: '请填写房型名称和价格' });
    const data = readData();
    if (!data.roomTypes) data.roomTypes = [];
    const newRoom = {
        id: 'R' + Date.now(),
        name, type: type || 'standard', size: size || '',
        bed: bed || '', guests: parseInt(guests) || 2,
        price: parseFloat(price), originalPrice: parseFloat(originalPrice) || parseFloat(price),
        image: image || '', amenities: [],
        policy: policy || '', available: parseInt(available) || 0,
        status: 'active'
    };
    data.roomTypes.push(newRoom);
    writeData(data);
    res.json({ message: '房型新增成功', roomType: newRoom });
});

app.put('/api/roomtypes/:id', (req, res) => {
    const data = readData();
    const idx = data.roomTypes.findIndex(r => r.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: '房型不存在' });
    data.roomTypes[idx] = { ...data.roomTypes[idx], ...req.body };
    writeData(data);
    res.json({ message: '更新成功' });
});

app.delete('/api/roomtypes/:id', (req, res) => {
    const data = readData();
    const idx = data.roomTypes.findIndex(r => r.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: '房型不存在' });
    data.roomTypes.splice(idx, 1);
    writeData(data);
    res.json({ message: '删除成功' });
});

// ===== 预订 API =====
app.get('/api/bookings', (req, res) => {
    const data = readData();
    res.json({ bookings: data.bookings || [] });
});

app.post('/api/bookings', (req, res) => {
    const { roomId, roomName, roomType, guestName, guestPhone, guestEmail, checkIn, checkOut, nights, guests, totalAmount, arrivalTime, specialRequests } = req.body;
    const username = req.body.username || 'guest';
    const data = readData();
    const booking = {
        id: 'BK' + Date.now(),
        username,
        roomId,
        roomName: roomName || roomType || '-',   // 统一用 roomName，兼容旧字段
        roomType: roomType || roomName || '-',   // 保留 roomType 兼容管理员界面
        guestName, guestPhone, guestEmail,
        checkIn, checkOut,
        nights,
        guests: guests || 2,
        totalAmount,
        arrivalTime, specialRequests,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    if (!data.bookings) data.bookings = [];
    data.bookings.push(booking);
    writeData(data);
    res.json({ message: 'Booking created', booking });
});

app.put('/api/bookings/:id/status', (req, res) => {
    const { status } = req.body;
    const data = readData();
    const idx = data.bookings.findIndex(b => b.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Booking not found' });
    data.bookings[idx].status = status;
    writeData(data);
    res.json({ message: 'Status updated' });
});

app.delete('/api/bookings/:id', (req, res) => {
    const data = readData();
    const idx = data.bookings.findIndex(b => b.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Booking not found' });
    data.bookings.splice(idx, 1);
    writeData(data);
    res.json({ message: 'Booking deleted' });
});

// ===== 评价 API =====
app.get('/api/reviews', (req, res) => {
    const data = readData();
    const { roomId } = req.query;
    let reviews = data.reviews || [];
    if (roomId) reviews = reviews.filter(r => r.roomId === roomId);
    res.json({ reviews });
});

app.post('/api/reviews', (req, res) => {
    const { username, rating, comment, roomId, roomName, bookingId } = req.body;
    if (!username || !rating || !comment || !roomId)
        return res.status(400).json({ message: '请填写所有必填字段' });
    const data = readData();
    if (!data.reviews) data.reviews = [];
    // 按 bookingId 去重（有 bookingId 时），否则按 roomId+username 去重
    const duplicate = bookingId
        ? data.reviews.find(r => r.bookingId === bookingId)
        : data.reviews.find(r => r.roomId === roomId && r.username === username);
    if (duplicate)
        return res.status(409).json({ message: '您已评价过该房间' });
    const review = {
        id: Date.now(),
        username,
        bookingId: bookingId || null,
        roomId,
        roomName: roomName || '',
        rating: parseInt(rating),
        comment,
        createdAt: new Date().toISOString()
    };
    data.reviews.push(review);
    writeData(data);
    res.json({ message: '评价成功', review });
});

app.delete('/api/reviews/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readData();
    const idx = data.reviews.findIndex(r => r.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Review not found' });
    data.reviews.splice(idx, 1);
    writeData(data);
    res.json({ message: 'Review deleted' });
});

// ===== 新闻简报 API =====
app.post('/api/newsletter/subscribe', (req, res) => {
    const { email, username } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const data = readData();
    if (!data.subscribers) data.subscribers = [];

    // 如果提供了用户名，更新用户信息
    if (username) {
        const user = data.users.find(u => u.username === username);
        if (user) {
            user.subscribed = true;
        }
    }

    // 无论是否登录，都记录在订阅者列表中（去重）
    if (!data.subscribers.includes(email)) {
        data.subscribers.push(email);
    }

    writeData(data);
    res.json({ message: 'Successfully subscribed to newsletter' });
});

app.get('/api/newsletter/status/:username', (req, res) => {
    const { username } = req.params;
    const data = readData();
    const user = data.users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ subscribed: !!user.subscribed });
});

app.put('/api/newsletter/update', (req, res) => {
    const { username, subscribed } = req.body;
    const data = readData();
    const user = data.users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.subscribed = subscribed;
    
    if (subscribed) {
        if (!data.subscribers) data.subscribers = [];
        if (!data.subscribers.includes(user.email)) {
            data.subscribers.push(user.email);
        }
    } else {
        if (data.subscribers) {
            data.subscribers = data.subscribers.filter(e => e !== user.email);
        }
    }

    writeData(data);
    res.json({ message: 'Subscription preference updated' });
});

// 静态文件放在所有API路由之后
app.use(express.static(__dirname));

app.listen(3000, () => console.log('服务器运行在 http://localhost:3000'));
