<<<<<<< Updated upstream
document.addEventListener('DOMContentLoaded', async () => {
    // Populate user data if logged in
    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('fullName').value = username;
        
        // 获取订阅状态
        try {
            const response = await fetch(`http://localhost:3000/api/newsletter/status/${username}`);
            if (response.ok) {
                const data = await response.json();
                document.getElementById('marketing').checked = data.subscribed;
            }
        } catch (error) {
            console.error('Error fetching subscription status:', error);
        }
    } else {
        // Redirect to login or home if not logged in
        showToast('请先登入', 'error');
=======
(function(){
    "use strict";

    // ---------- 工具函数：Toast 提示 ----------
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        
>>>>>>> Stashed changes
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            toast.style.transition = 'opacity 0.3s, transform 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ---------- 模拟用户数据 (实际应从 sessionStorage 或 API 获取) ----------
    function loadUserData() {
        // 从 sessionStorage 获取当前登录用户名
        let username = sessionStorage.getItem('username') || 'lengpao';
        
        // 模拟完整的用户数据 (实际可调用后端 API)
        const mockUserData = {
            username: username,
            fullName: '冷泡',
            email: 'lengpao@gmail.com',
            phone: '12345678',
            role: username === 'admin' ? 'admin' : 'user',   // 简单权限模拟
            avatar: sessionStorage.getItem('userAvatar') || '',
            registerDate: '2024-01-15',
            status: 'active'
        };

<<<<<<< Updated upstream
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const isSubscribed = document.getElementById('marketing').checked;
        
        if (newPassword && newPassword !== confirmPassword) {
            showToast('两次输入的密码不一致', 'error');
            return;
        }
        
        // 更新订阅偏好
        try {
            const subResponse = await fetch('http://localhost:3000/api/newsletter/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, subscribed: isSubscribed })
            });
            
            if (subResponse.ok) {
                // 如果已登录，发送通知
                if (window.notificationSystem) {
                    window.notificationSystem.createNotification(
                        username,
                        'newsletter_preference_update',
                        '偏好更新成功',
                        isSubscribed ? '您已成功订阅酒店新闻简报。' : '您已成功取消订阅酒店新闻简报。'
                    );
                }
            }
        } catch (error) {
            console.error('Error updating subscription status:', error);
        }
        
        showToast('个人资料已更新', 'success');
        
        const fullName = document.getElementById('fullName').value;
        if (fullName) {
            sessionStorage.setItem('username', fullName);
=======
        // 填充表单
        document.getElementById('username').value = mockUserData.username;
        document.getElementById('fullName').value = mockUserData.fullName;
        document.getElementById('email').value = mockUserData.email;
        document.getElementById('confirmEmail').value = mockUserData.email;
        document.getElementById('phone').value = mockUserData.phone;
        document.getElementById('roleDisplay').value = mockUserData.role === 'admin' ? '管理员' : '普通用户';

        // 权限控制：只有管理员显示额外字段
        if (mockUserData.role === 'admin') {
            const adminFields = document.getElementById('adminFields');
            if (adminFields) adminFields.style.display = 'flex';
            document.getElementById('registerDate').value = mockUserData.registerDate;
            document.getElementById('accountStatus').value = mockUserData.status;
        }

        // 加载头像
        const avatarImg = document.getElementById('avatarImg');
        const defaultAvatar = document.querySelector('.default-avatar');
        if (mockUserData.avatar) {
            avatarImg.src = mockUserData.avatar;
            avatarImg.style.display = 'block';
            if (defaultAvatar) defaultAvatar.style.display = 'none';
        } else {
            avatarImg.style.display = 'none';
            if (defaultAvatar) defaultAvatar.style.display = 'block';
        }

        return mockUserData;
    }

    // ---------- 头像上传处理 ----------
    function setupAvatarUpload() {
        const uploadBtn = document.getElementById('uploadAvatarBtn');
        const fileInput = document.getElementById('avatarInput');
        const avatarImg = document.getElementById('avatarImg');
        const defaultAvatar = document.querySelector('.default-avatar');

        uploadBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // 校验大小 (2MB)
            if (file.size > 2 * 1024 * 1024) {
                showToast('图片大小不能超过 2MB', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                avatarImg.src = dataUrl;
                avatarImg.style.display = 'block';
                if (defaultAvatar) defaultAvatar.style.display = 'none';
                
                // 存入 sessionStorage (实际应上传至服务器)
                sessionStorage.setItem('userAvatar', dataUrl);
                showToast('头像已更新', 'success');
            };
            reader.readAsDataURL(file);
        });
    }

    // ---------- 主题切换 (深色/浅色) ----------
    function setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        
        // 从 localStorage 读取主题
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(icon, savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(icon, newTheme);
        });
    }

    function updateThemeIcon(icon, theme) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // ---------- 表单提交处理 ----------
    function setupFormSubmit() {
        const form = document.getElementById('profileForm');
        const cancelBtn = document.getElementById('cancelBtn');

        cancelBtn.addEventListener('click', () => {
            window.history.back();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 邮箱一致性校验
            const email = document.getElementById('email').value.trim();
            const confirmEmail = document.getElementById('confirmEmail').value.trim();
            if (email !== confirmEmail) {
                showToast('两次输入的邮箱地址不一致', 'error');
                return;
            }

            // 密码一致性校验 (可选)
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (newPassword || confirmPassword) {
                if (newPassword !== confirmPassword) {
                    showToast('两次输入的密码不一致', 'error');
                    return;
                }
                if (newPassword.length < 8) {
                    showToast('密码长度至少为 8 个字符', 'error');
                    return;
                }
                // 实际应用中应调用修改密码 API
            }

            // 条款同意校验
            const termsCheck = document.getElementById('terms');
            if (!termsCheck.checked) {
                showToast('请阅读并同意隐私权条款', 'error');
                return;
            }

            // 收集数据 (模拟更新)
            const fullName = document.getElementById('fullName').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            // 更新 sessionStorage 中的用户名
            if (fullName) {
                sessionStorage.setItem('username', fullName);
            }

            // 模拟保存成功
            showToast('个人资料已更新', 'success');
            
            // 实际应发送请求至后端 API
            console.log('用户资料更新:', { fullName, email, phone });
        });
    }

    // ---------- 初始化 ----------
    document.addEventListener('DOMContentLoaded', () => {
        // 检查登录状态
        const username = sessionStorage.getItem('username');
        if (!username) {
            showToast('请先登录', 'error');
            setTimeout(() => {
                window.location.href = '../homePage/index.html';
            }, 1500);
            return;
        }

        loadUserData();
        setupAvatarUpload();
        setupThemeToggle();
        setupFormSubmit();

        // 货币显示 (占位)
        const currencyDisplay = document.getElementById('currencyDisplay');
        if (currencyDisplay) {
            const currency = localStorage.getItem('currency') || 'HKD';
            const currencyMap = { HKD: '港币', CNY: '人民币', USD: '美元' };
            currencyDisplay.innerHTML = `${currencyMap[currency] || currency} <i class="fas fa-chevron-down"></i>`;
>>>>>>> Stashed changes
        }
    });

})();