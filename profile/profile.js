document.addEventListener('DOMContentLoaded', () => {
    // Populate user data if logged in
    const username = sessionStorage.getItem('username');
    if (username) {
        // Just mock some data based on username
        document.getElementById('firstName').value = username;
        document.getElementById('lastName').value = '';
    } else {
        // Redirect to login or home if not logged in
        showToast('请先登入', 'error');
        setTimeout(() => {
            window.location.href = '../homePage/index.html';
        }, 1500);
    }

    const profileForm = document.getElementById('profileForm');
    const cancelBtn = document.getElementById('cancelBtn');
    
    cancelBtn.addEventListener('click', () => {
        window.history.back();
    });

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword && newPassword !== confirmPassword) {
            showToast('两次输入的密码不一致', 'error');
            return;
        }
        
        showToast('个人资料已更新', 'success');
        
        // Mock save logic
        const firstName = document.getElementById('firstName').value;
        if (firstName) {
            sessionStorage.setItem('username', firstName);
        }
    });
});

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    // Simple inline styles for toast since we might not have all Book.css styles perfectly matching here
    toast.style.padding = '12px 24px';
    toast.style.marginBottom = '10px';
    toast.style.borderRadius = '4px';
    toast.style.color = '#fff';
    toast.style.background = type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    toast.style.transition = 'opacity 0.3s ease';
    
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}