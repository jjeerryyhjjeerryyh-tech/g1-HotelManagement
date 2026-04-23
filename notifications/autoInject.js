/**
 * 通知系统自动注入脚本 v2.3
 *
 * 工作流程：
 *   1. login.html    → 拦截 /api/login → 写 __justLoggedIn 标志
 *   2. checkout.html → 拦截表单提交  → 写 __justBooked + 预订详情
 *   3. Book.html     → 检测 __justLoggedIn → 触发登录通知
 *                    → 检测 __justBooked    → 触发预订通知
 *   4. 所有页面      → 添加 📬 消息提醒按钮 + 未读徽章
 *
 * HTML 引入方式（各页面 </body> 前）：
 *   <script src="../notifications/notificationSystem.js"></script>
 *   <script src="../notifications/autoInject.js"></script>
 *
 * v2.3 新增：i18n 支持（通过 lang.js 获取语言，监听 notifLangChanged 事件）
 */

(function () {
    'use strict';

    if (window.__notifAutoInjected) return;
    window.__notifAutoInjected = true;

    // ============================================
    // 路径工具
    // ============================================
    function notifBase() {
        var path = window.location.pathname;
        if (/\/BookOut\//.test(path))      return '../notifications/';
        if (/\/login\//.test(path))         return '../notifications/';
        if (/\/register\//.test(path))      return '../notifications/';
        if (/\/admin\//.test(path))         return '../notifications/';
        if (/\/profile\//.test(path))       return '../notifications/';
        if (/\/Homepage\//.test(path))      return '../notifications/';
        if (/\/homePage\//.test(path))      return '../notifications/';
        return './notifications/';
    }

    // ============================================
    // 全局 Fetch 拦截器（设置 __justLoggedIn 标志）
    // ============================================
    (function () {
        var _fetch = window.fetch;
        window.fetch = function (input, init) {
            var url = typeof input === 'string' ? input : input.url;
            var isLogin = url && url.includes('/api/login');

            return _fetch.apply(this, arguments).then(function (res) {
                if (res.ok && isLogin) {
                    sessionStorage.setItem('__justLoggedIn', '1');
                }
                return res;
            });
        };
    })();

    // ============================================
    // checkout.html 专用：表单提交拦截（比 checkout.js 更早）
    // ============================================
    function attachCheckoutInterceptor() {
        // 仅在 checkout.html 执行
        if (!/\/BookOut\/checkout\.html/.test(window.location.pathname)) return;

        var form = document.getElementById('checkoutForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            var roomRaw   = sessionStorage.getItem('checkout_room');
            var paramsRaw = sessionStorage.getItem('checkout_params');

            if (roomRaw && paramsRaw) {
                try {
                    var room   = JSON.parse(roomRaw);
                    var params = JSON.parse(paramsRaw);
                    // 预订详情存到 sessionStorage（checkout.js 会清空原字段，这些不会被清除）
                    sessionStorage.setItem('__bookingRoom', room.name || '');
                    sessionStorage.setItem('__bookingCheckIn', params.checkIn || '');
                    sessionStorage.setItem('__bookingCheckOut', params.checkOut || '');
                } catch (ex) { /* ignore parse errors */ }
            }
            // 设置标志：Book.html 读取后会清空
            sessionStorage.setItem('__justBooked', '1');
        });
    }

    // ============================================
    // Book.html 专用：读取标志 → 触发通知
    // ============================================
    function handlePostRedirectNotifications() {
        if (!/\/BookOut\/Book\.html/.test(window.location.pathname)) return;
        if (!window.notificationSystem) return;

        var user = sessionStorage.getItem('username');
        if (!user) return;

        // 登录成功通知
        if (sessionStorage.getItem('__justLoggedIn') === '1') {
            sessionStorage.removeItem('__justLoggedIn');
            window.notificationSystem.notifyLoginSuccess(user, false);
            updateBadge();
        }

        // 预订成功通知
        // 先读取数据，再删除 sessionStorage（防止读取到空值）
        if (sessionStorage.getItem('__justBooked') === '1') {
            var bookingData = {
                roomType:  sessionStorage.getItem('__bookingRoom')  || '',
                checkIn:   sessionStorage.getItem('__bookingCheckIn')   || '',
                checkOut:  sessionStorage.getItem('__bookingCheckOut')  || ''
            };

            sessionStorage.removeItem('__justBooked');
            sessionStorage.removeItem('__bookingRoom');
            sessionStorage.removeItem('__bookingCheckIn');
            sessionStorage.removeItem('__bookingCheckOut');

            window.notificationSystem.notifyBookingSuccess(user, bookingData);
            updateBadge();
        }
    }

    // ============================================
    // UI：添加消息提醒按钮
    // ============================================
    function getNotifBtnText() {
        // 优先通过 lang.js 获取语言
        if (window.__notifLang && window.__notifLang.getLang) {
            var lang = window.__notifLang.getLang();
            return lang === 'en' ? 'Notifications' : '消息提醒';
        }
        // 兜底：读 localStorage.lang
        var lang = localStorage.getItem('lang') || 'zh';
        return lang === 'en' ? 'Notifications' : '消息提醒';
    }

    function updateNotifBtnText() {
        var textEl = document.getElementById('notifBtnText');
        if (textEl) textEl.textContent = getNotifBtnText();
        var notifText = document.querySelector('.notif-text');
        if (notifText) notifText.textContent = getNotifBtnText();
    }

    function addNotificationButton() {
        if (document.querySelector('.notif-btn')) return;

        var container = document.querySelector('.header-links');
        if (!container) return;

        var btnText = getNotifBtnText();
        var badge = '<span class="notification-badge" style="display:none;background:#e74c3c;color:#fff;border-radius:50%;width:18px;height:18px;font-size:11px;line-height:18px;text-align:center;position:absolute;top:-9px;right:2px;font-weight:bold;">0</span>';

        var a = document.createElement('a');
        a.href = notifBase() + 'notifications.html';
        a.className = 'notif-btn header-link';
        a.id = 'notifBtn';
        a.setAttribute('data-i18n', 'nav_notifications');
        a.innerHTML = '&#128231; <span id="notifBtnText" class="notif-text">' + btnText + '</span>' + badge;
        a.style.cssText = 'position:relative;display:inline-flex;align-items:center;gap:4px;';

        var userMenu = container.querySelector('.user-menu-container');
        if (userMenu && userMenu.parentNode === container) {
            container.insertBefore(a, userMenu);
        } else {
            container.appendChild(a);
        }
    }

    function updateBadge() {
        if (!window.notificationSystem) return;
        var user = sessionStorage.getItem('username');
        if (!user) return;
        var count = window.notificationSystem.getUnreadCount(user);
        // 使用 .notification-badge 与 notificationSystem.js 保持一致
        document.querySelectorAll('.notification-badge').forEach(function (b) {
            b.textContent = count > 99 ? '99+' : (count > 0 ? count : '');
            b.style.display = count > 0 ? 'inline-block' : 'none';
        });
    }

    // ============================================
    // 初始化
    // ============================================
    function waitForNS(fn, tries) {
        if (window.notificationSystem) { fn(); return; }
        if (tries <= 0) return;
        setTimeout(function () { waitForNS(fn, tries - 1); }, 100);
    }

    function init() {
        // 按钮和徽章（所有页面）
        waitForNS(function () {
            addNotificationButton();
            updateBadge();

            // 页面专用逻辑
            attachCheckoutInterceptor();   // checkout.html
            handlePostRedirectNotifications(); // Book.html

            setInterval(updateBadge, 5000);

            // 监听语言切换，更新按钮文字
            window.addEventListener('notifLangChanged', function () {
                updateNotifBtnText();
                updateBadge();
            });

            // 兼容 localStorage storage 事件（多标签页同步）
            window.addEventListener('storage', function (e) {
                if (e.key === 'lang') {
                    updateNotifBtnText();
                    updateBadge();
                }
            });
        }, 30);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('[Notification] autoInject.js v2.3 已加载');
})();
