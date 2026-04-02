/**
 * 通知系统自动注入脚本
 * 无需修改任何现有文件，通过浏览器扩展或书签方式注入
 */

(function() {
    'use strict';
    
    // 防止重复注入
    if (window.notificationSystemInjected) {
        return;
    }
    window.notificationSystemInjected = true;

    // 动态加载通知系统核心
    function loadNotificationSystem() {
        return new Promise((resolve, reject) => {
            if (window.notificationSystem) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = getBasePath() + 'notifications/notificationSystem.js';
            script.onload = () => {
                // 等待通知系统初始化
                setTimeout(resolve, 100);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // 获取基础路径
    function getBasePath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/BookOut/')) {
            return '../';
        } else if (currentPath.includes('/login/') || currentPath.includes('/register/') || 
                   currentPath.includes('/Homepage/') || currentPath.includes('/admin/') ||
                   currentPath.includes('/profile/') || currentPath.includes('/userProfile/')) {
            return '../';
        } else {
            return './';
        }
    }

    // 主初始化函数
    async function initNotificationSystem() {
        try {
            await loadNotificationSystem();
            
            // 根据当前页面类型进行不同的初始化
            const currentPage = detectCurrentPage();
            
            switch (currentPage) {
                case 'booking':
                    initBookingPageFeatures();
                    break;
                case 'login':
                    initLoginPageFeatures();
                    break;
                case 'homepage':
                    initHomepageFeatures();
                    break;
                case 'admin':
                    initAdminPageFeatures();
                    break;
                default:
                    initGenericPageFeatures();
            }
            
            // 通用功能
            addNotificationButton();
            checkLoginStatus();
            updateNotificationBadge();
            
        } catch (error) {
            console.error('通知系统注入失败:', error);
        }
    }

    // 检测当前页面类型
    function detectCurrentPage() {
        const path = window.location.pathname.toLowerCase();
        const title = document.title.toLowerCase();
        
        if (path.includes('book') || title.includes('预订') || title.includes('booking')) {
            return 'booking';
        } else if (path.includes('login') || title.includes('登录') || title.includes('login')) {
            return 'login';
        } else if (path.includes('admin') || title.includes('管理') || title.includes('admin')) {
            return 'admin';
        } else if (path.includes('homepage') || path.includes('index') || title.includes('首页')) {
            return 'homepage';
        }
        return 'generic';
    }

    // 添加通知按钮到页面
    function addNotificationButton() {
        // 尝试多种选择器找到合适的位置
        const possibleSelectors = [
            // BookOut页面
            'a[onclick*="mybookings"]',
            '.header-links a:first-child',
            '.header-right nav a:first-child',
            
            // Homepage页面
            '.navbar-auth',
            '.navbar-right',
            '.navbar-actions',
            
            // 通用选择器
            'nav a:last-child',
            'header a:last-child',
            '.nav-btn:last-child',
            'header .container'
        ];

        let targetElement = null;
        let insertMethod = 'before'; // 'before', 'after', 'prepend', 'append'

        for (const selector of possibleSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                targetElement = element;
                
                // 根据元素类型决定插入方式
                if (selector.includes('mybookings')) {
                    insertMethod = 'before';
                } else if (selector.includes('navbar-auth')) {
                    insertMethod = 'before';
                } else if (selector.includes('container')) {
                    insertMethod = 'append';
                } else {
                    insertMethod = 'after';
                }
                break;
            }
        }

        if (!targetElement) {
            console.warn('未找到合适的位置添加通知按钮');
            return;
        }

        // 创建通知按钮
        const notificationContainer = createNotificationButton();
        
        // 根据插入方式添加按钮
        switch (insertMethod) {
            case 'before':
                targetElement.parentNode.insertBefore(notificationContainer, targetElement);
                break;
            case 'after':
                targetElement.parentNode.insertBefore(notificationContainer, targetElement.nextSibling);
                break;
            case 'prepend':
                targetElement.insertBefore(notificationContainer, targetElement.firstChild);
                break;
            case 'append':
                targetElement.appendChild(notificationContainer);
                break;
        }
    }

    // 创建通知按钮
    function createNotificationButton() {
        const container = document.createElement('div');
        container.style.cssText = 'position: relative; display: inline-block; margin: 0 0.5rem;';

        const button = document.createElement('a');
        button.href = getBasePath() + 'notifications/notifications.html';
        button.innerHTML = '📬 消息提醒';
        button.style.cssText = `
            position: relative;
            text-decoration: none;
            padding: 0.5rem 1rem;
            color: #666;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #fff;
            font-size: 0.9rem;
            transition: all 0.3s;
            display: inline-block;
        `;

        // 添加悬停效果
        button.addEventListener('mouseenter', () => {
            button.style.background = '#f8f9fa';
            button.style.borderColor = '#3498db';
            button.style.color = '#3498db';
        });

        button.addEventListener('mouseleave', () => {
            button.style.background = '#fff';
            button.style.borderColor = '#ddd';
            button.style.color = '#666';
        });

        // 尝试匹配现有按钮样式
        const existingButton = document.querySelector('.nav-btn, .header-link, .btn');
        if (existingButton) {
            const computedStyle = window.getComputedStyle(existingButton);
            button.className = existingButton.className;
            button.style.cssText = ''; // 清除内联样式，使用CSS类
            button.innerHTML = '📬 消息提醒';
        }

        // 创建通知徽章
        const badge = document.createElement('span');
        badge.className = 'notification-badge';
        badge.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: #e74c3c;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 0.7rem;
            display: none;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            z-index: 1000;
        `;

        container.appendChild(button);
        container.appendChild(badge);

        return container;
    }

    // 预订页面功能
    function initBookingPageFeatures() {
        // 监听预订表单
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                setTimeout(() => {
                    handleBookingSubmission();
                }, 500);
            });
        }

        // 监听页面内登录
        const dropdownLoginBtn = document.getElementById('dropdownLoginBtn');
        if (dropdownLoginBtn) {
            dropdownLoginBtn.addEventListener('click', function() {
                setTimeout(() => {
                    handleLoginSuccess();
                }, 1000);
            });
        }
    }

    // 登录页面功能
    function initLoginPageFeatures() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                setTimeout(() => {
                    handleLoginSuccess();
                }, 1500);
            });
        }
    }

    // 主页功能
    function initHomepageFeatures() {
        // 监听预订表单
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                setTimeout(() => {
                    handleBookingSubmission();
                }, 500);
            });
        }
    }

    // 管理员页面功能
    function initAdminPageFeatures() {
        // 管理员特定功能
        checkAdminLogin();
    }

    // 通用页面功能
    function initGenericPageFeatures() {
        // 通用功能，如监听动态登录等
    }

    // 处理预订提交
    function handleBookingSubmission() {
        const username = sessionStorage.getItem('username');
        if (!username || !window.notificationSystem) return;

        const checkIn = document.getElementById('checkInDate')?.value || 
                       document.getElementById('checkIn')?.value || '待确认';
        const checkOut = document.getElementById('checkOutDate')?.value || 
                        document.getElementById('checkOut')?.value || '待确认';
        
        const bookingDetails = {
            checkIn: checkIn,
            checkOut: checkOut,
            roomType: '房间'
        };

        window.notificationSystem.notifyBookingSuccess(username, bookingDetails);
        updateNotificationBadge();
    }

    // 处理登录成功
    function handleLoginSuccess() {
        const username = sessionStorage.getItem('username');
        const role = sessionStorage.getItem('role');
        
        if (!username || !window.notificationSystem) return;

        const isFirstLogin = checkFirstLogin(username);
        
        if (role === 'admin') {
            window.notificationSystem.notifyAdminLogin(username);
        } else {
            window.notificationSystem.notifyLoginSuccess(username, isFirstLogin);
        }

        markUserAsLoggedIn(username);
        updateNotificationBadge();
    }

    // 检查管理员登录
    function checkAdminLogin() {
        const role = sessionStorage.getItem('role');
        const username = sessionStorage.getItem('username');
        
        if (role === 'admin' && username && window.notificationSystem) {
            window.notificationSystem.notifyAdminLogin(username);
            updateNotificationBadge();
        }
    }

    // 检查登录状态
    function checkLoginStatus() {
        const username = sessionStorage.getItem('username');
        if (username && window.notificationSystem) {
            const role = sessionStorage.getItem('role');
            const isFirstLogin = checkFirstLogin(username);
            
            if (isFirstLogin) {
                window.notificationSystem.notifyLoginSuccess(username, true);
                markUserAsLoggedIn(username);
            }
            
            updateNotificationBadge();
        }
    }

    // 检查首次登录
    function checkFirstLogin(username) {
        const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '{}');
        return !loginHistory[username];
    }

    // 标记用户已登录
    function markUserAsLoggedIn(username) {
        const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '{}');
        loginHistory[username] = new Date().toISOString();
        localStorage.setItem('loginHistory', JSON.stringify(loginHistory));
    }

    // 更新通知徽章
    function updateNotificationBadge() {
        if (!window.notificationSystem) return;
        
        const currentUser = sessionStorage.getItem('username');
        if (!currentUser) return;

        const unreadCount = window.notificationSystem.getUnreadCount(currentUser);
        const badge = document.querySelector('.notification-badge');
        
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNotificationSystem);
    } else {
        initNotificationSystem();
    }

    // 定期更新徽章
    setInterval(updateNotificationBadge, 5000);

    console.log('通知系统已自动注入');

})();