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
    const form = e.target;
    const username = form.querySelector('input[name="username"]').value;
    const fullName = form.querySelector('input[name="fullName"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const subscribed = form.querySelector('input[name="subscribe"]').checked;

    try {
        const res = await fetch('http://43.132.210.15:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, fullName, email, phone, password, subscribed })
        });
        const data = await res.json();
        if (res.ok) {
            alert('注册成功！请登录');
            window.location.href = '../login/login.html';
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert('无法连接服务器，请确认后端已启动');
    }
});

function setupCustomValidation() {
   const requiredFields = document.querySelectorAll('input[required]');  // 注意改成 querySelectorAll
  
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
     
      if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^\d{8}$/;
        if (!phoneRegex.test(field.value.trim())) {
          field.setCustomValidity('请输入八位数的电话号码');
        }
      }
    });
    
  
    field.addEventListener('input', () => {
      field.setCustomValidity('');
      
      
      if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^\d{8}$/;
        if (!phoneRegex.test(field.value.trim())) {
          field.setCustomValidity('请输入八位数的电话号码');
        } else {
          field.setCustomValidity('');
        }
      }
    });
    
 
    if (field.type === 'tel') {
      field.addEventListener('input', function(e) {
      
        this.value = this.value.replace(/[^\d]/g, '').slice(0, 8);
        
       
        if (this.value.length === 8) {
          this.setCustomValidity('');
        } else if (this.value.length > 0) {
          this.setCustomValidity('请输入八位数的电话号码');
        }
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', setupCustomValidation);