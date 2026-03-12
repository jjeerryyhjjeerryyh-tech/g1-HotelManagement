const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');

// 1. Theme switching logic (system function 11)
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

// 2. Login/Register toggle logic
toRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

toLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// 3. Basic form submission handling (system function 1)
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Verifying login credentials...');
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Creating your hotel management account...');
});
// 4. Optimized form switch animation
function switchForm(hideForm, showForm) {
    hideForm.style.opacity = '0';
    setTimeout(() => {
        hideForm.classList.add('hidden');
        showForm.classList.remove('hidden');
        showForm.style.opacity = '1';
    }, 300);
}

toRegister.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(loginForm, registerForm);
});

toLogin.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(registerForm, loginForm);
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