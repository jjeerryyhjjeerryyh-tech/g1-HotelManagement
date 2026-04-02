/**
 * 通知系统核心模块 v1.1
 * 负责通知的创建、存储、获取和管理
 */

class NotificationSystem {
    constructor() {
        this.storageKey = 'hotel_notifications';
        this.maxNotifications = 10;
        this.init();
    }

    // 初始化通知系统
    init() {
        // 确保localStorage中有通知数据结构
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }

    // 创建新通知
    createNotification(userId, type, title, message, additionalData = {}) {
        const notification = {
            id: Date.now() + Math.random(), // 确保唯一性
            userId: userId,
            type: type,
            title: title,
            message: message,
            timestamp: new Date().toISOString(),
            isRead: false,
            ...additionalData
        };

        this.addNotification(notification);
        this.syncToServer(notification);
        return notification;
    }

    // 添加通知到本地存储
    addNotification(notification) {
        let notifications = this.getNotifications();
        notifications.unshift(notification); // 新通知放在前面
        
        // 限制通知数量
        if (notifications.length > this.maxNotifications) {
            notifications = notifications.slice(0, this.maxNotifications);
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(notifications));
        this.updateNotificationBadge();
    }

    // 获取所有通知
    getNotifications(userId = null) {
        const notifications = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        if (userId) {
            return notifications.filter(n => n.userId === userId);
        }
        return notifications;
    }

    // 获取用户的未读通知数量
    getUnreadCount(userId) {
        const notifications = this.getNotifications(userId);
        return notifications.filter(n => !n.isRead).length;
    }

    // 标记通知为已读
    markAsRead(notificationId) {
        const notifications = this.getNotifications();
        const notification = notifications.find(n => n.id == notificationId); // 使用 == 处理类型转换
        if (notification) {
            notification.isRead = true;
            localStorage.setItem(this.storageKey, JSON.stringify(notifications));
            this.updateNotificationBadge();
            this.syncReadStatusToServer(notificationId);
        }
    }

    // 标记所有通知为已读
    markAllAsRead(userId) {
        const notifications = this.getNotifications();
        notifications.forEach(n => {
            if (n.userId === userId) {
                n.isRead = true;
            }
        });
        localStorage.setItem(this.storageKey, JSON.stringify(notifications));
        this.updateNotificationBadge();
    }

    // 删除通知
    deleteNotification(notificationId) {
        let notifications = this.getNotifications();
        notifications = notifications.filter(n => n.id != notificationId); // 使用 != 处理类型转换
        localStorage.setItem(this.storageKey, JSON.stringify(notifications));
        this.updateNotificationBadge();
    }

    // 更新通知徽章显示
    updateNotificationBadge() {
        const currentUser = sessionStorage.getItem('username');
        if (!currentUser) return;

        const userId = this.getUserIdByUsername(currentUser);
        const unreadCount = this.getUnreadCount(userId);
        
        // 更新所有页面的通知徽章
        const badges = document.querySelectorAll('.notification-badge');
        badges.forEach(badge => {
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        });
    }

    // 根据用户名获取用户ID（简化版本）
    getUserIdByUsername(username) {
        // 这里使用用户名作为ID，实际项目中应该从用户数据中获取真实ID
        return username;
    }

    // 同步通知到服务器（可选功能）
    async syncToServer(notification) {
        try {
            await fetch('/api/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notification)
            });
        } catch (error) {
            console.log('通知同步到服务器失败，仅保存在本地:', error);
        }
    }

    // 同步已读状态到服务器
    async syncReadStatusToServer(notificationId) {
        try {
            await fetch(`/api/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.log('已读状态同步失败:', error);
        }
    }

    // 预定义的通知类型和模板
    static NotificationTypes = {
        LOGIN_SUCCESS: 'login_success',
        BOOKING_SUCCESS: 'booking_success',
        PROFILE_UPDATE: 'profile_update',
        ADMIN_LOGIN: 'admin_login',
        FIRST_LOGIN: 'first_login'
    };

    // 快捷方法：登录成功通知
    notifyLoginSuccess(username, isFirstLogin = false) {
        const userId = this.getUserIdByUsername(username);
        const type = isFirstLogin ? NotificationSystem.NotificationTypes.FIRST_LOGIN : NotificationSystem.NotificationTypes.LOGIN_SUCCESS;
        const title = isFirstLogin ? '欢迎加入！' : '登录成功';
        const message = isFirstLogin ? 
            `欢迎您，${username}！感谢您注册我们的酒店管理系统。` : 
            `欢迎回来，${username}！您已成功登录系统。`;
        
        return this.createNotification(userId, type, title, message);
    }

    // 快捷方法：预订成功通知
    notifyBookingSuccess(username, bookingDetails) {
        const userId = this.getUserIdByUsername(username);
        const message = `您已成功预订${bookingDetails.roomType || '房间'}，入住日期：${bookingDetails.checkIn || '待确认'}，退房日期：${bookingDetails.checkOut || '待确认'}。`;
        
        return this.createNotification(
            userId, 
            NotificationSystem.NotificationTypes.BOOKING_SUCCESS, 
            '预订成功', 
            message,
            { bookingDetails }
        );
    }

    // 快捷方法：个人信息变动通知
    notifyProfileUpdate(username) {
        const userId = this.getUserIdByUsername(username);
        const message = `您的个人信息已成功更新。如非本人操作，请及时联系客服。`;
        
        return this.createNotification(userId, NotificationSystem.NotificationTypes.PROFILE_UPDATE, '信息更新', message);
    }

    // 快捷方法：管理员登录通知
    notifyAdminLogin(username) {
        const userId = this.getUserIdByUsername(username);
        const message = `管理员账户登录成功。您现在可以访问系统管理功能。`;
        
        return this.createNotification(userId, NotificationSystem.NotificationTypes.ADMIN_LOGIN, '管理员登录', message);
    }
}

// 创建全局通知系统实例
window.notificationSystem = new NotificationSystem();

// 页面加载时更新徽章
document.addEventListener('DOMContentLoaded', () => {
    if (window.notificationSystem) {
        window.notificationSystem.updateNotificationBadge();
    }
});