/**
 * 通知系统书签注入器
 * 将此代码制作成浏览器书签，点击即可在任何页面注入通知系统
 */

javascript:(function(){
    // 防止重复注入
    if (window.notificationSystemInjected) {
        alert('通知系统已经注入！');
        return;
    }
    
    // 获取基础路径
    function getBasePath() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/BookOut/') || currentPath.includes('/login/') || 
            currentPath.includes('/Homepage/') || currentPath.includes('/admin/') ||
            currentPath.includes('/register/') || currentPath.includes('/profile/')) {
            return '../';
        }
        return './';
    }
    
    // 动态加载脚本
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // 加载通知系统
    async function loadNotificationSystem() {
        try {
            const basePath = getBasePath();
            
            // 加载核心系统
            await loadScript(basePath + 'notifications/notificationSystem.js');
            
            // 等待系统初始化
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // 加载自动注入脚本
            await loadScript(basePath + 'notifications/autoInject.js');
            
            // 显示成功消息
            const notification = document.createElement('div');
            notification.innerHTML = '✅ 通知系统已成功注入！';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                z-index: 10000;
                font-family: Arial, sans-serif;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(notification);
            
            // 3秒后移除提示
            setTimeout(() => {
                notification.remove();
            }, 3000);
            
        } catch (error) {
            alert('通知系统注入失败: ' + error.message);
        }
    }
    
    loadNotificationSystem();
})();