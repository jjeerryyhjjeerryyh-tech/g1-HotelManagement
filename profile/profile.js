(function () {
    "use strict";

    // ---------- 工具函数：Toast 提示 ----------
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            toast.style.transition = 'opacity 0.3s, transform 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const username = sessionStorage.getItem('username');
        const profileForm = document.getElementById('profileForm');

        if (username) {
            document.getElementById('username').value = username;
            // 假设真实姓名也先用用户名填充，或者从后端获取
            document.getElementById('fullName').value = sessionStorage.getItem('name') || username;
            
            // 获取订阅状态
            try {
                const response = await fetch(`http://43.132.210.15:3000/api/newsletter/status/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    document.getElementById('marketing').checked = data.subscribed;
                }
            } catch (error) {
                console.error('Error fetching subscription status:', error);
            }
        } else {
            showToast('请先登录', 'error');
            setTimeout(() => { window.location.href = '../login/login.html'; }, 1500);
            return;
        }

        if (profileForm) {
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
                    const subResponse = await fetch('http://43.132.210.15:3000/api/newsletter/update', {
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
                    sessionStorage.setItem('name', fullName);
                }
            });
        }

        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                window.history.back();
            });
        }
    });

})();
