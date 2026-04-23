/**
 * notifications/lang.js - 统一语言系统
 *
 * Book.html 和 notifications.html 共用此文件，实现语言同步。
 * 所有语言切换通过 dispatchEvent('langChanged') 广播给所有页面。
 */

(function () {
    'use strict';

    // ==========================================
    // 翻译字典
    // ==========================================

    // 页面 UI 文本
    var UI = {
        zh: {
            page_title: '消息提醒',
            notifications: 'Notifications',
            mark_all_read: '全部标为已读',
            clear_all: '清空消息',
            total: '总消息数',
            unread: '未读消息',
            all: '全部',
            login_notif: '登录通知',
            booking_notif: '预订通知',
            profile_notif: '信息更新',
            empty_title: '暂无消息',
            empty_desc: '您目前没有任何通知消息',
            loading: '正在加载消息...',
            modal_detail: '消息详情',
            confirm_clear: '确认清空',
            confirm_clear_msg: '确定要清空所有消息吗？此操作不可撤销。',
            mark_all_confirm_msg: '确定要将所有消息标为已读吗？',
            delete_confirm: '确定要删除这条消息吗？',
            logout_confirm: '确定要退出登录吗？',
            cancel: '取消',
            ok: '确定',
            mark_read: '标为已读',
            delete: '删除消息',
            login_success_title: '登录成功',
            booking_success_title: '预订成功',
            profile_update_title: '信息更新',
            unread_tag: '未读',
            read_tag: '已读',
            lang_title: '语言',
            lang_display: '中文',
            tab_book: '房型预订',
            tab_mybookings: '我的预订',
            currency: '港币',
            account_login: '帐号登入',
            login: '登入',
            forgot_password: '忘记密码？',
            no_account_desc: '还没有帐号？建立帐号，储存您的订单历史记录，享受更快速的结帐体验。',
            create_account: '建立一个帐户',
            update_profile: '更新个人资料',
            logout_login: '登出登入',
        },
        en: {
            page_title: 'Notifications',
            notifications: 'Notifications',
            mark_all_read: 'Mark All as Read',
            clear_all: 'Clear All',
            total: 'Total',
            unread: 'Unread',
            all: 'All',
            login_notif: 'Login Notification',
            booking_notif: 'Booking Notification',
            profile_notif: 'Profile Update',
            empty_title: 'No Messages',
            empty_desc: 'You have no notification messages at the moment.',
            loading: 'Loading messages...',
            modal_detail: 'Message Details',
            confirm_clear: 'Confirm Clear',
            confirm_clear_msg: 'Are you sure you want to clear all messages? This cannot be undone.',
            mark_all_confirm_msg: 'Are you sure you want to mark all messages as read?',
            delete_confirm: 'Are you sure you want to delete this message?',
            logout_confirm: 'Are you sure you want to log out?',
            cancel: 'Cancel',
            ok: 'Confirm',
            mark_read: 'Mark as Read',
            delete: 'Delete Message',
            login_success_title: 'Login Successful',
            booking_success_title: 'Booking Confirmed',
            profile_update_title: 'Profile Updated',
            unread_tag: 'Unread',
            read_tag: 'Read',
            lang_title: 'Language',
            lang_display: 'English',
            tab_book: 'Book a Room',
            tab_mybookings: 'My Bookings',
            currency: 'HKD',
            account_login: 'Account Login',
            login: 'Log In',
            forgot_password: 'Forgot Password?',
            no_account_desc: "Don't have an account? Create one to save your order history and enjoy faster checkout.",
            create_account: 'Create an Account',
            update_profile: 'Update Profile',
            logout_login: 'Log Out',
        }
    };

    // 通知消息模板
    var NOTIF_TEMPLATES = {
        zh: {
            login_success_body:  '{name}，欢迎回来！',
            booking_success_body: '您已成功预订 {roomType}，入住：{checkIn}，退房：{checkOut}。',
            booking_success_body2: '您的预订已确认！{roomType}，{checkIn} 至 {checkOut}。祝您住宿愉快！',
            profile_update_body: '您的个人资料已成功更新。',
            general_body: '{content}',
        },
        en: {
            login_success_body:  'Welcome back, {name}!',
            booking_success_body: 'You have successfully booked {roomType}. Check-in: {checkIn}, Check-out: {checkOut}.',
            booking_success_body2: 'Your reservation is confirmed! {roomType}, {checkIn} to {checkOut}. Enjoy your stay!',
            profile_update_body: 'Your profile has been updated successfully.',
            general_body: '{content}',
        }
    };

    // ==========================================
    // 核心函数
    // ==========================================

    function getLang() {
        return localStorage.getItem('lang') || 'zh';
    }

    function t(key) {
        var lang = getLang();
        return UI[lang][key] || UI['zh'][key] || key;
    }

    function renderNotif(templateKey, params) {
        var lang = getLang();
        var tmpl = NOTIF_TEMPLATES[lang][templateKey] || NOTIF_TEMPLATES['zh'][templateKey] || templateKey;
        if (!params) return tmpl;
        for (var k in params) {
            tmpl = tmpl.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
        }
        return tmpl;
    }

    function setLang(lang) {
        localStorage.setItem('lang', lang);
        window.dispatchEvent(new CustomEvent('notifLangChanged', {
            detail: { lang: lang }
        }));
    }

    window.__notifLang = {
        getLang:     getLang,
        t:           t,
        renderNotif: renderNotif,
        setLang:     setLang,
        UI:          UI,
        NOTIF_TEMPLATES: NOTIF_TEMPLATES
    };

    window.t = t;
    window.setNotifLang = setLang;

    console.log('[i18n] lang.js loaded, lang:', getLang());
})();
