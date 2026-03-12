// 示例用户数据
const userData = {
    name: '[姓名]',
    gender: '[性别]',
    email: '[email]',
    phone: '[phone_number]'
};

// 页面加载时显示用户信息
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userGender').textContent = userData.gender;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userPhone').textContent = userData.phone;
});
