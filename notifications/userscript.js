// ==UserScript==
// @name         酒店管理系统通知功能
// @namespace    http://localhost:8080/
// @version      1.1
// @description  为酒店管理系统自动添加通知功能
// @author       You
// @match        http://localhost:8080/*
// @match        http://127.0.0.1:8080/*
// @match        http://localhost:3000/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    // 防止重复注入
    if (window.notificationSystemInjected) {
        return;
    }
    window.notificationSystemInjected = true;
    
    console.log('用户脚本：开始注入通知系统');
    
    // 获取基础路径
    function getBasePath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/BookOut/') || currentPath.includes('/login/') || 
            currentPath.includes('/Homepage/') || currentPath.includes('/homePage/') ||
            currentPath.includes('/admin/') || currentPath.includes('/register/') || 
            currentPath.includes('/profile/') || currentPath.includes('/userProfile/')) {
            return '../';
        }
        return './';
    }
    
    // 动态加载脚本
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                console.log('用户脚本：已加载', src);
                resolve();
            };
            script.onerror = (error) => {
                console.error('用户脚本：加载失败', src, error);
                reject(error);
            };
            document.head.appendChild(script);
        });
    }
    
    // 主加载函数
    async function loadNotificationSystem() {
        try {
            const basePath = getBasePath();
            console.log('用户脚本：基础路径', basePath);
            
            // 加载核心系统
            await loadScript(basePath + 'notifications/notificationSystem.js');
            
            // 等待系统初始化
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // 检查系统是否加载成功
            if (!window.notificationSystem) {
                throw new Error('通知系统核心加载失败');
            }
            
            console.log('用户脚本：通知系统核心已加载');
            
            // 直接执行注入逻辑（不再加载autoInject.js，避免循环）
            initNotificationFeatures();
            
        } catch (error) {
            console.error('用户脚本：通知系统加载失败', error);
        }
    }
    
    // 初始化通知功能
    function initNotificationFeatures() {
        console.log('用户脚本：初始化通知功能');
        
        // 添加通知按钮
        addNotificationButton();
        
        // 根据页面类型初始化功能
        const currentPage = detectCurrentPage();
        console.log('用户脚本：检测到页面类型', currentPage);
        
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
        }
        
        // 检查登录状态
        checkLoginStatus();
        updateNotificationBadge();
        
        // 定期更新徽章
        setInterval(updateNotificationBadge, 5000);
        
        console.log('用户脚本：通知系统初始化完成');
    }
    
    // 检测当前页面类型
    function detectCurrentPage() {
        const path = window.location.pathname.toLowerCase();
        const title = document.title.toLowerCase();
        
        if (path.includes('book') || title.includes('预订')) {
            return 'booking';
        } else if (path.includes('login') || title.includes('登录')) {
            return 'login';
        } else if (path.includes('homepage') || path.includes('index') || title.includes('首页')) {
            return 'homepage';
        }
        return 'generic';
    }
    
    // 添加通知按钮
    function addNotificationButton() {
        // 查找合适的位置
        const selectors = [
            'a[onclick*="mybookings"]',
            '.navbar-auth',
            '.header-links a:first-child',
            'nav a:last-child'
        ];
        
        let targetElement = null;
        for (const selector of selectors) {
            targetElement = document.querySelector(selector);
            if (targetElement) break;
        }
        
        if (!targetElement) {
            console.warn('用户脚本：未找到合适位置添加通知按钮');
            return;
        }
        
        // 创建按钮
        const container = document.createElement('div');
        container.style.cssText = 'position: relative; display: inline-block; margin-right: 1rem;';
        
        const button = document.createElement('a');
        button.href = getBasePath() + 'notifications/notifications.html';
        button.innerHTML = '📬 消息提醒';
        
        // 尝试匹配现有样式
        const existingButton = document.querySelector('.nav-btn, .header-link, .btn');
        if (existingButton) {
            button.className = existingButton.className;
        } else {
            button.style.cssText = `
                padding: 0.5rem 1rem;
                color: #666;
                text-decoration: none;
                border: 1px solid #ddd;
                border-radius: 4px;
                background: #fff;
                font-size: 0.9rem;
            `;
        }
        
        // 创建徽章
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
        
        // 插入按钮
        targetElement.parentNode.insertBefore(container, targetElement);
        
        console.log('用户脚本：通知按钮已添加');
    }
    
    // 预订页面功能
    function initBookingPageFeatures() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function() {
                setTimeout(handleBookingSubmission, 500);
            });
        }
        
        const loginBtn = document.getElementById('dropdownLoginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                setTimeout(handleLoginSuccess, 1000);
            });
        }
    }
    
    // 登录页面功能
    function initLoginPageFeatures() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function() {
                setTimeout(handleLoginSuccess, 1500);
            });
        }
    }
    
    // 主页功能
    function initHomepageFeatures() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function() {
                setTimeout(handleBookingSubmission, 500);
            });
        }
    }
    
    // 处理预订提交
    function handleBookingSubmission() {
        const username = sessionStorage.getItem('username');
        if (!username || !window.notificationSystem) return;
        
        const bookingDetails = {
            checkIn: '待确认',
            checkOut: '待确认',
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
    
    // 检查登录状态
    function checkLoginStatus() {
        const username = sessionStorage.getItem('username');
        if (username && window.notificationSystem) {
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
    
    // 开始加载
    loadNotificationSystem();
    
})();