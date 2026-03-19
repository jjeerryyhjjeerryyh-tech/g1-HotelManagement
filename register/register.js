const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

// 1. Theme switching logic
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// 2. Register form submission handling
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [username, fullName, email, phone, password] = [...inputs].map(i => i.value);

    try {
        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, fullName, email, phone, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert('注册成功！');
            window.location.href = '../login/login.html';
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert('无法连接服务器，请确认后端已启动');
    }
});

function setupCustomValidation() {
    const requiredFields = document.querySelectorAll('input[required]');
    requiredFields.forEach(field => {
        field.addEventListener('invalid', (e) => {
            if (field.validity.valueMissing) {
                field.setCustomValidity('Please fill out this field.');
            } else if (field.validity.typeMismatch) {
                if (field.type === 'email') {
                    field.setCustomValidity('Please enter a valid email address.');
                } else if (field.type === 'tel') {
                    field.setCustomValidity('Please enter a valid phone number.');
                }
            }
        });
        field.addEventListener('input', () => {
            field.setCustomValidity(''); 
        });
    });
}
document.addEventListener('DOMContentLoaded', setupCustomValidation);
