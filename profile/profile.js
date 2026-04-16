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
        setTimeout(() => {
            window.location.href = '../homePage/index.html';
        }, 1500);
    }

    const profileForm = document.getElementById('profileForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    cancelBtn.addEventListener('click', () => {
        window.history.back();
    });

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
});

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    // Simple inline styles for toast since we might not have all Book.css styles perfectly matching here
    toast.style.padding = '12px 24px';
    toast.style.marginBottom = '10px';
    toast.style.borderRadius = '4px';
    toast.style.color = '#fff';
    toast.style.background = type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    toast.style.transition = 'opacity 0.3s ease';
    
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}