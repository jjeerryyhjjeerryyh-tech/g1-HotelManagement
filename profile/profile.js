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
        }
    });

})();