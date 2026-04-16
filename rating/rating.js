document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.querySelector('.theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    const langBtn = document.querySelector('.lang-toggle');
    const submitBtn = document.getElementById('submitReview');
    
    // ==============================================
    // 多语言包（中英文）
    // ==============================================
    const i18n = {
        zh: {
            title: "提交客房评价",
            subtitle: "已完成入住 · 仅可评价一次",
            totalRating: "总体评分",
            clean: "清洁度",
            comfort: "舒适度",
            service: "服务态度",
            facility: "设施状况",
            comment: "文字评价（可选）",
            placeholder: "分享你的入住体验",
            upload: "上传图片（可选）",
            submit: "提交评价",
            success: "评价提交成功！",
            reviewed: "已评价（每单仅可评价一次）"
        },
        en: {
            title: "Submit Review",
            subtitle: "Completed · Only one review allowed",
            totalRating: "Overall Rating",
            clean: "Cleanliness",
            comfort: "Comfort",
            service: "Service",
            facility: "Facilities",
            comment: "Comment (Optional)",
            placeholder: "Share your experience",
            upload: "Upload Images (Optional)",
            submit: "Submit Review",
            success: "Review submitted successfully!",
            reviewed: "Reviewed (One per order)"
        }
    };

    // ==============================================
    // 语言切换
    // ==============================================
    let currentLang = localStorage.getItem('lang') || 'zh';

    function applyLang(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang][key]) el.textContent = i18n[lang][key];
        });
        document.querySelector('textarea').placeholder = i18n[lang].placeholder;
        langBtn.textContent = lang === 'zh' ? 'English' : '中文';
        currentLang = lang;
        localStorage.setItem('lang', lang);
    }

    langBtn.addEventListener('click', () => {
        applyLang(currentLang === 'zh' ? 'en' : 'zh');
    });

    // ==============================================
    // 主题切换
    // ==============================================
    function initTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeBtn.addEventListener('click', () => {
        const dark = document.documentElement.hasAttribute('data-theme');
        if (dark) {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==============================================
    // 星级评分
    // ==============================================
    function bindStars(selector) {
        document.querySelectorAll(selector).forEach(group => {
            const stars = group.querySelectorAll('i');
            stars.forEach((s, idx) => {
                s.addEventListener('click', () => {
                    stars.forEach((item, i) => {
                        if (i <= idx) {
                            item.classList.add('active', 'fas');
                            item.classList.remove('far');
                        } else {
                            item.classList.remove('active', 'fas');
                            item.classList.add('far');
                        }
                    });
                });
            });
        });
    }
    bindStars('.stars');

    // ==============================================
    // 图片预览
    // ==============================================
    const input = document.querySelector('input[type="file"]');
    const preview = document.querySelector('.preview');
    input.addEventListener('change', () => {
        preview.innerHTML = '';
        for (let file of input.files) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            preview.appendChild(img);
        }
    });

    // ==============================================
    // 提交评价（仅一次）
    // ==============================================
    let submitted = localStorage.getItem('reviewed') === 'true';

    function checkSubmitted() {
        if (submitted) {
            submitBtn.disabled = true;
            submitBtn.innerText = i18n[currentLang].reviewed;
            submitBtn.style.background = '#999';
        }
    }

    submitBtn.addEventListener('click', () => {
        if (submitted) return;
        alert(i18n[currentLang].success);
        submitted = true;
        localStorage.setItem('reviewed', 'true');
        checkSubmitted();
    });

    // ==============================================
    // 初始化
    // ==============================================
    applyLang(currentLang);
    initTheme();
    checkSubmitted();
});