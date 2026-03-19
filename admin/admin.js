// 侧边栏切换功能
document.getElementById('sidebar-toggle').addEventListener('click', function() {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('w-64');
    sidebar.classList.toggle('w-20');
    
    // 切换文字显示/隐藏
    const sidebarTexts = sidebar.querySelectorAll('span:not(.absolute)');
    sidebarTexts.forEach(text => {
        text.classList.toggle('hidden');
    });
});

// 模拟菜单点击激活状态
const menuItems = document.querySelectorAll('nav a');
menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        // 移除所有激活状态
        menuItems.forEach(mi => mi.classList.remove('sidebar-item-active'));
        menuItems.forEach(mi => mi.classList.add('text-gray-700', 'hover:bg-gray-100'));
        // 添加当前激活状态
        this.classList.add('sidebar-item-active');
        this.classList.remove('text-gray-700', 'hover:bg-gray-100');
    });
});

// 模拟数据加载效果
document.addEventListener('DOMContentLoaded', function() {
    // 可以在这里添加图表初始化、数据加载等逻辑
    console.log('酒店管理员系统界面已加载完成');
});