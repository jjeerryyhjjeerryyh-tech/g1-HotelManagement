/**
 * 通知页面交互逻辑 v1.1
 * 包含修复的标为已读功能和自动标为已读功能
 */

class NotificationPage {
    constructor() {
        this.currentFilter = 'all';
        this.currentUser = sessionStorage.getItem('username');
        this.userId = this.currentUser;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadNotifications();
        this.updateUserGreeting();
        this.hideLoadingState();
    }

    setupEventListeners() {
        // 筛选按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.dataset.filter);
            });
        });

        // 全部标为已读
        document.getElementById('markAllReadBtn').addEventListener('click', () => {
            this.showConfirmDialog('标记所有消息为已读？', () => {
                this.markAllAsRead();
            });
        });

        // 清空消息
        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.showConfirmDialog('确定要清空所有消息吗？此操作不可恢复。', () => {
                this.clearAllMessages();
            });
        });

        // 退出登录
        document.getElementById('logoutBtn').addEventListener('click', () => {
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('role');
            window.location.href = '../Homepage/index.html';
        });

        // 模态框事件
        this.setupModalEvents();
    }

    setupModalEvents() {
        const messageModal = document.getElementById('messageModal');
        const confirmModal = document.getElementById('confirmModal');

        // 关闭消息详情模态框
        document.getElementById('modalCloseBtn').addEventListener('click', () => {
            messageModal.style.display = 'none';
        });

        // 模态框背景点击关闭
        messageModal.addEventListener('click', (e) => {
            if (e.target === messageModal) {
                messageModal.style.display = 'none';
            }
        });

        // 标记为已读
        document.getElementById('modalMarkReadBtn').addEventListener('click', () => {
            const notificationId = messageModal.dataset.notificationId;
            if (notificationId) {
                this.markAsRead(notificationId);
                messageModal.style.display = 'none';
            }
        });

        // 删除消息
        document.getElementById('modalDeleteBtn').addEventListener('click', () => {
            const notificationId = messageModal.dataset.notificationId;
            if (notificationId) {
                this.showConfirmDialog('确定要删除这条消息吗？', () => {
                    this.deleteMessage(notificationId);
                    messageModal.style.display = 'none';
                });
            }
        });

        // 确认对话框事件
        document.getElementById('confirmCancelBtn').addEventListener('click', () => {
            confirmModal.style.display = 'none';
        });

        document.getElementById('confirmOkBtn').addEventListener('click', () => {
            if (this.confirmCallback) {
                this.confirmCallback();
            }
            confirmModal.style.display = 'none';
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                messageModal.style.display = 'none';
                confirmModal.style.display = 'none';
            }
        });
    }

    updateUserGreeting() {
        const userGreeting = document.getElementById('userGreeting');
        if (this.currentUser) {
            userGreeting.textContent = `👤 ${this.currentUser}`;
        }
    }

    loadNotifications() {
        if (!window.notificationSystem) {
            console.error('通知系统未初始化');
            return;
        }

        const notifications = window.notificationSystem.getNotifications(this.userId);
        this.renderNotifications(notifications);
        this.updateStats(notifications);
    }

    renderNotifications(notifications) {
        const messagesList = document.getElementById('messagesList');
        const emptyState = document.getElementById('emptyState');

        // 根据当前筛选条件过滤通知
        const filteredNotifications = this.filterNotifications(notifications);

        if (filteredNotifications.length === 0) {
            messagesList.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        messagesList.innerHTML = filteredNotifications.map(notification => 
            this.createMessageHTML(notification)
        ).join('');

        // 添加点击事件
        messagesList.querySelectorAll('.message-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('action-btn')) {
                    this.showMessageDetail(item.dataset.notificationId);
                }
            });
        });

        // 添加操作按钮事件
        messagesList.querySelectorAll('.mark-read-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const notificationId = btn.dataset.notificationId;
                this.markAsRead(notificationId);
            });
        });

        messagesList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const notificationId = btn.dataset.notificationId;
                this.showConfirmDialog('确定要删除这条消息吗？', () => {
                    this.deleteMessage(notificationId);
                });
            });
        });
    }

    createMessageHTML(notification) {
        const isUnread = !notification.isRead;
        const icon = this.getNotificationIcon(notification.type);
        const time = this.formatTime(notification.timestamp);
        const typeText = this.getTypeText(notification.type);

        return `
            <div class="message-item ${isUnread ? 'unread' : ''}" data-notification-id="${notification.id}">
                <div class="message-icon">${icon}</div>
                <div class="message-content">
                    <div class="message-header">
                        <div>
                            <div class="message-title">${notification.title}</div>
                            <div class="message-type-badge">${typeText}</div>
                        </div>
                        <div class="message-time">${time}</div>
                    </div>
                    <div class="message-text">${notification.message}</div>
                </div>
                <div class="message-actions">
                    ${isUnread ? `<button class="action-btn mark-read-btn" data-notification-id="${notification.id}">标为已读</button>` : ''}
                    <button class="action-btn delete-btn" data-notification-id="${notification.id}">删除</button>
                </div>
            </div>
        `;
    }

    getNotificationIcon(type) {
        const icons = {
            'login_success': '🔐',
            'booking_success': '🏨',
            'profile_update': '👤',
            'admin_login': '⚙️',
            'first_login': '🎉'
        };
        return icons[type] || '📬';
    }

    getTypeText(type) {
        const typeTexts = {
            'login_success': '登录通知',
            'booking_success': '预订通知',
            'profile_update': '信息更新',
            'admin_login': '管理员',
            'first_login': '欢迎消息'
        };
        return typeTexts[type] || '系统通知';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return '刚刚';
        if (minutes < 60) return `${minutes}分钟前`;
        if (hours < 24) return `${hours}小时前`;
        if (days < 7) return `${days}天前`;
        
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    filterNotifications(notifications) {
        if (this.currentFilter === 'all') {
            return notifications;
        }
        if (this.currentFilter === 'unread') {
            return notifications.filter(n => !n.isRead);
        }
        return notifications.filter(n => n.type === this.currentFilter);
    }

    setActiveFilter(filter) {
        this.currentFilter = filter;
        
        // 更新按钮状态
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        // 重新加载通知
        this.loadNotifications();
    }

    updateStats(notifications) {
        const totalCount = notifications.length;
        const unreadCount = notifications.filter(n => !n.isRead).length;

        document.getElementById('totalCount').textContent = totalCount;
        document.getElementById('unreadCount').textContent = unreadCount;
    }

    showMessageDetail(notificationId) {
        const notifications = window.notificationSystem.getNotifications(this.userId);
        const notification = notifications.find(n => n.id == notificationId);
        
        if (!notification) return;

        // 自动标记为已读（如果未读的话）
        if (!notification.isRead) {
            this.markAsRead(notificationId);
        }

        const modal = document.getElementById('messageModal');
        modal.dataset.notificationId = notificationId;

        document.getElementById('modalTitle').textContent = notification.title;
        document.getElementById('modalType').textContent = this.getTypeText(notification.type);
        document.getElementById('modalTime').textContent = this.formatTime(notification.timestamp);
        document.getElementById('modalContent').textContent = notification.message;

        // 更新按钮状态 - 由于已经标为已读，隐藏标为已读按钮
        const markReadBtn = document.getElementById('modalMarkReadBtn');
        markReadBtn.style.display = 'none';

        modal.style.display = 'flex';
    }

    markAsRead(notificationId) {
        window.notificationSystem.markAsRead(notificationId);
        
        // 立即更新界面
        this.loadNotifications();
        
        // 更新徽章
        if (window.notificationSystem.updateNotificationBadge) {
            window.notificationSystem.updateNotificationBadge();
        }
    }

    markAllAsRead() {
        window.notificationSystem.markAllAsRead(this.userId);
        this.loadNotifications();
    }

    deleteMessage(notificationId) {
        window.notificationSystem.deleteNotification(notificationId);
        this.loadNotifications();
    }

    clearAllMessages() {
        const notifications = window.notificationSystem.getNotifications(this.userId);
        notifications.forEach(n => {
            window.notificationSystem.deleteNotification(n.id);
        });
        this.loadNotifications();
    }

    showConfirmDialog(message, callback) {
        this.confirmCallback = callback;
        document.getElementById('confirmMessage').textContent = message;
        document.getElementById('confirmModal').style.display = 'flex';
    }

    hideLoadingState() {
        setTimeout(() => {
            document.getElementById('loadingState').style.display = 'none';
        }, 500);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 检查用户是否已登录
    const currentUser = sessionStorage.getItem('username');
    if (!currentUser) {
        alert('请先登录');
        window.location.href = '../login/login.html';
        return;
    }

    // 初始化通知页面
    new NotificationPage();
});