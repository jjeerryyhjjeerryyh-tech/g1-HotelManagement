/**
 * 通知系统核心模块 v2.3
 *
 * 通知内容存储为 {templateKey, params} 格式，
 * 渲染时通过 lang.js 的 renderNotif() 动态翻译，
 * 实现"切换语言后已存通知也能显示对应语言"的效果。
 *
 * 语言系统依赖：notifications/lang.js（必须在此前加载）
 */

(function () {
    'use strict';

    var storageKey = 'hotel_notifications';
    var maxNotifications = 50;

    // ============================================
    // 初始化
    // ============================================
    function init() {
        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, '[]');
        }
    }

    // ============================================
    // 数据操作
    // ============================================
    function getAllNotifications() {
        return JSON.parse(localStorage.getItem(storageKey) || '[]');
    }

    function saveNotifications(notifications) {
        localStorage.setItem(storageKey, JSON.stringify(notifications));
    }

    function getNotifications(userId) {
        var all = getAllNotifications();
        if (userId) return all.filter(function (n) { return n.userId === userId; });
        return all;
    }

    function addNotification(notification) {
        var notifications = getAllNotifications();
        notifications.unshift(notification);
        if (notifications.length > maxNotifications) {
            notifications = notifications.slice(0, maxNotifications);
        }
        saveNotifications(notifications);
        updateNotificationBadge();
    }

    function getUnreadCount(userId) {
        return getNotifications(userId).filter(function (n) { return !n.isRead; }).length;
    }

    function markAsRead(notificationId) {
        var notifications = getAllNotifications();
        var found = notifications.find(function (n) { return n.id == notificationId; });
        if (found) {
            found.isRead = true;
            saveNotifications(notifications);
            updateNotificationBadge();
        }
    }

    function markAllAsRead(userId) {
        var notifications = getAllNotifications();
        notifications.forEach(function (n) {
            if (n.userId === userId) n.isRead = true;
        });
        saveNotifications(notifications);
        updateNotificationBadge();
    }

    function deleteNotification(notificationId) {
        var notifications = getAllNotifications();
        notifications = notifications.filter(function (n) { return n.id != notificationId; });
        saveNotifications(notifications);
        updateNotificationBadge();
    }

    // ============================================
    // 通知徽章更新
    // ============================================
    function updateNotificationBadge() {
        var currentUser = sessionStorage.getItem('username');
        if (!currentUser || !document) return;

        var unreadCount = getUnreadCount(currentUser);
        document.querySelectorAll('.notification-badge').forEach(function (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        });
    }

    // ============================================
    // 翻译辅助（使用 lang.js 的全局函数）
    // ============================================
    function getLang() {
        return (window.__notifLang && window.__notifLang.getLang)
            ? window.__notifLang.getLang()
            : (localStorage.getItem('lang') || 'zh');
    }

    function renderNotif(templateKey, params) {
        return (window.__notifLang && window.__notifLang.renderNotif)
            ? window.__notifLang.renderNotif(templateKey, params)
            : (params && params.roomType ? templateKey : templateKey);
    }

    function t(key) {
        return (window.__notifLang && window.__notifLang.t)
            ? window.__notifLang.t(key)
            : key;
    }

    // ============================================
    // 渲染通知内容（语言切换时重新调用此函数）
    // ============================================
    function renderNotification(notification) {
        // 如果存的是 templateKey + params（v2.3+），动态翻译
        if (notification.templateKey) {
            // 标题在 UI 字典里，用 t() 翻译
            var title = t(notification.templateKey + '_title');
            // 正文在 NOTIF_TEMPLATES 里，用 renderNotif() 翻译+替换占位符
            var body  = renderNotif(notification.templateKey + '_body', notification.params);
            return { title: title, message: body };
        }
        // 如果存的是旧格式的 pre-filled text（v1/v2），直接返回
        return { title: notification.title, message: notification.message };
    }

    // ============================================
    // 快捷通知方法
    // ============================================
    var NotificationTypes = {
        LOGIN_SUCCESS:    'login_success',
        BOOKING_SUCCESS:  'booking_success',
        PROFILE_UPDATE:   'profile_update',
        ADMIN_LOGIN:      'admin_login',
        FIRST_LOGIN:      'first_login'
    };

    function notifyLoginSuccess(username, isFirstLogin) {
        var type      = isFirstLogin ? 'first_login' : 'login_success';
        var templateKey = type;
        var params    = { name: username };

        var notification = {
            id:          Date.now() + Math.random(),
            userId:      username,
            type:        type,
            templateKey: templateKey,
            params:      params,
            timestamp:   new Date().toISOString(),
            isRead:      false
        };
        addNotification(notification);
        return notification;
    }

    function notifyBookingSuccess(username, bookingDetails) {
        var notification = {
            id:          Date.now() + Math.random(),
            userId:      username,
            type:        'booking_success',
            templateKey: 'booking_success',
            params: {
                roomType:  bookingDetails.roomType  || '',
                checkIn:   bookingDetails.checkIn   || '',
                checkOut:  bookingDetails.checkOut  || ''
            },
            timestamp:   new Date().toISOString(),
            isRead:      false,
            bookingDetails: bookingDetails
        };
        addNotification(notification);
        return notification;
    }

    function notifyProfileUpdate(username) {
        var notification = {
            id:          Date.now() + Math.random(),
            userId:      username,
            type:        'profile_update',
            templateKey: 'profile_update',
            params:      {},
            timestamp:   new Date().toISOString(),
            isRead:      false
        };
        addNotification(notification);
        return notification;
    }

    function notifyNewsletterSubscription(username) {
        var notification = {
            id:          Date.now() + Math.random(),
            userId:      username,
            type:        'newsletter_subscription',
            templateKey: 'newsletter_subscription',
            params:      {},
            timestamp:   new Date().toISOString(),
            isRead:      false
        };
        addNotification(notification);
        return notification;
    }

    function notifyNewsletterUnsubscription(username) {
        var notification = {
            id:          Date.now() + Math.random(),
            userId:      username,
            type:        'newsletter_unsubscription',
            templateKey: 'newsletter_unsubscription',
            params:      {},
            timestamp:   new Date().toISOString(),
            isRead:      false
        };
        addNotification(notification);
        return notification;
    }

    function notifyRoomRecommendation(username, params) {
        var notification = {
            id:          Date.now() + Math.random(),
            userId:      username,
            type:        'room_recommendation',
            templateKey: 'room_recommendation',
            params:      params,
            timestamp:   new Date().toISOString(),
            isRead:      false
        };
        addNotification(notification);
        return notification;
    }

    function notifyAdminLogin(username) {
        var notification = {
            id:          Date.now() + Math.random(),
            userId:      username,
            type:        'admin_login',
            templateKey: 'admin_login',
            params:      {},
            timestamp:   new Date().toISOString(),
            isRead:      false
        };
        addNotification(notification);
        return notification;
    }

    function notifyBookingCancelled(username, bookingDetails) {
        if (!bookingDetails) bookingDetails = {};
        var notification = {
            id:          Date.now() + Math.random(),
            userId:      username,
            type:        'booking_cancelled',
            templateKey: 'booking_cancelled',
            params: {
                roomType: bookingDetails.roomType || '',
                checkIn:  bookingDetails.checkIn  || '',
                checkOut: bookingDetails.checkOut || ''
            },
            timestamp: new Date().toISOString(),
            isRead:    false
        };
        addNotification(notification);
        return notification;
    }

    // ============================================
    // 语言变化时通知所有页面刷新
    // ============================================
    // 监听 lang.js 广播的 notifLangChanged 事件
    window.addEventListener('notifLangChanged', function () {
        updateNotificationBadge();
    });

    // 兼容旧的 storage 事件（以防其他地方也有写入 lang）
    window.addEventListener('storage', function (e) {
        if (e.key === 'lang') updateNotificationBadge();
    });

    // ============================================
    // 初始化 & 暴露到全局
    // ============================================
    init();

    document.addEventListener('DOMContentLoaded', function () {
        updateNotificationBadge();
    });

    // 每 5 秒刷新徽章
    setInterval(function () { updateNotificationBadge(); }, 5000);

    window.notificationSystem = {
        NotificationTypes:     NotificationTypes,
        getNotifications:       getNotifications,
        getUnreadCount:        getUnreadCount,
        markAsRead:            markAsRead,
        markAllAsRead:         markAllAsRead,
        deleteNotification:    deleteNotification,
        updateNotificationBadge: updateNotificationBadge,
        notifyLoginSuccess:    notifyLoginSuccess,
        notifyBookingSuccess:   notifyBookingSuccess,
        notifyBookingCancelled: notifyBookingCancelled,
        notifyProfileUpdate:    notifyProfileUpdate,
        notifyNewsletterSubscription: notifyNewsletterSubscription,
        notifyNewsletterUnsubscription: notifyNewsletterUnsubscription,
        notifyRoomRecommendation: notifyRoomRecommendation,
        notifyAdminLogin:      notifyAdminLogin,
        renderNotification:    renderNotification,
        t:                     t,
        getLang:               getLang
    };

})();
