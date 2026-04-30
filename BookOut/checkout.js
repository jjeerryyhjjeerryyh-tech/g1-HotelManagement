(function(){
    "use strict";

    // 动态加载通知系统
    function loadNotificationSystem(callback) {
        if (window.HotelNotification) {
            callback();
            return;
        }
        var script = document.createElement('script');
        script.src = '../notifications/notificationSystem.js';
        script.onload = callback;
        document.head.appendChild(script);
    }

    // 等待通知系统加载后执行回调
    loadNotificationSystem(function() {
        console.log('通知系统已加载');
    });

    // ---------- 多语言配置 ----------
    const translations = {
        zh: {
            hotel_name: "91酒店",
            pageTitle: "预订信息 · 91酒店",
            backToRooms: "返回客房",
            selectDates: "选择入住 / 退房日期",
            checkInDate: "入住日期 *",
            checkOutDate: "退房日期 *",
            totalNights: "共 {nights} 晚",
            contactInfo: "联系信息",
            title: "称谓 *",
            pleaseSelect: "请选择",
            mr: "先生",
            ms: "女士",
            fullName: "姓名 *",
            fullNamePlaceholder: "姓名（与证件一致）",
            email: "电子邮箱地址 *",
            confirmEmail: "确认电子邮箱地址 *",
            phone: "联系电话",
            phonePlaceholder: "请输入8位数字电话号码",
            phoneHint: "请填写8位数字电话号码",
            arrivalTime: "预计到达时间",
            after18: "18:00 以后",
            specialRequests: "特殊要求（可选）",
            specialRequestsPlaceholder: "如无烟房、高层、靠近电梯等",
            payment: "付款",
            securityNotice: "安全提示",
            securityMessage: "我们使用加密方式处理支付信息。此页面为前端展示，暂不进行真实扣款。",
            cardNumber: "卡号",
            expiry: "有效期 (MM/YY) *",
            expiryHint: "例如：1228 表示 12/28",
            cardholderName: "持卡人姓名 *",
            cardholderNamePlaceholder: "姓名",
            cardNumberTitle: "请填写12位数字卡号",
            expiryTitle: "请填写4位数字（MMYY）",
            policies: "政策",
            checkIn: "入住",
            checkInTime: "下午 2:00 之后",
            checkOut: "退房",
            checkOutTime: "中午 12:00 之前",
            cancellationPolicy: "取消条款",
            cancellationMessage: "入住前 48 小时可免费取消，之后将收取首晚房费作为取消费用。",
            agreeTermsPrefix: "我已阅读并同意",
            bookingTerms: "预订条款",
            and: "和",
            privacyPolicy: "隐私政策",
            back: "返回",
            confirmBooking: "确认预订",
            priceDetails: "价格详情",
            directBookingBenefits: "直接预订，专享礼遇",
            benefit1: "灵活的入住和退房时间",
            benefit2: "灵活预订，区域任选",
            benefit3: "专享优惠和价格",
            benefit4: "体验独特策划活动",
            needHelp: "需要帮助？",
            helpText: "我们的专业预订团队随时为您服务：",
            room: "客房",
            price: "价格",
            nights: "晚数",
            tax: "税费",
            total: "总计",
            adults: "位成人",
            nightsUnit: "晚",
            toastEmailMismatch: "两次输入的邮箱不一致",
            toastPhoneInvalid: "电话号码必须是8位数字",
            toastSelectDates: "请选择入住和退房日期",
            toastCheckOutBeforeCheckIn: "退房日期必须晚于入住日期",
            toastMinOneNight: "入住天数至少为1晚",
            toastBookingSuccess: "预订成功！正在跳转...",
            toastBookingFailed: "预订失败，请重试",
            toastServerError: "无法连接服务器，请确认后端已启动",
            toastNoData: "缺少预订信息，即将返回选房页",
            toastDataParseError: "数据解析失败"
        },
        en: {
            hotel_name: "91 Hotel",
            pageTitle: "Booking Details · 91 Hotel",
            backToRooms: "Back to Rooms",
            selectDates: "Select Check-in / Check-out Dates",
            checkInDate: "Check-in Date *",
            checkOutDate: "Check-out Date *",
            totalNights: "{nights} night(s) in total",
            contactInfo: "Contact Information",
            title: "Title *",
            pleaseSelect: "Please select",
            mr: "Mr.",
            ms: "Ms.",
            fullName: "Full Name *",
            fullNamePlaceholder: "Name (as per ID)",
            email: "Email Address *",
            confirmEmail: "Confirm Email Address *",
            phone: "Phone Number",
            phonePlaceholder: "Enter 8-digit phone number",
            phoneHint: "Please enter an 8-digit phone number",
            arrivalTime: "Estimated Arrival Time",
            after18: "After 18:00",
            specialRequests: "Special Requests (Optional)",
            specialRequestsPlaceholder: "e.g., non-smoking room, high floor, near elevator",
            payment: "Payment",
            securityNotice: "Security Notice",
            securityMessage: "We encrypt payment information. This page is a front-end demo, no actual charges will be made.",
            cardNumber: "Card Number",
            expiry: "Expiry (MM/YY) *",
            expiryHint: "e.g., 1228 for 12/28",
            cardholderName: "Cardholder Name *",
            cardholderNamePlaceholder: "Name",
            cardNumberTitle: "Please enter a 12-digit card number",
            expiryTitle: "Please enter 4 digits (MMYY)",
            policies: "Policies",
            checkIn: "Check-in",
            checkInTime: "After 2:00 PM",
            checkOut: "Check-out",
            checkOutTime: "Before 12:00 PM",
            cancellationPolicy: "Cancellation Policy",
            cancellationMessage: "Free cancellation up to 48 hours before check-in. After that, the first night's room rate will be charged.",
            agreeTermsPrefix: "I have read and agree to the",
            bookingTerms: "Booking Terms",
            and: "and",
            privacyPolicy: "Privacy Policy",
            back: "Back",
            confirmBooking: "Confirm Booking",
            priceDetails: "Price Details",
            directBookingBenefits: "Direct Booking Benefits",
            benefit1: "Flexible check-in/out times",
            benefit2: "Flexible booking, choose any area",
            benefit3: "Exclusive offers and rates",
            benefit4: "Experience unique curated events",
            needHelp: "Need Help?",
            helpText: "Our professional reservation team is at your service:",
            room: "Room",
            price: "Price",
            nights: "Nights",
            tax: "Tax",
            total: "Total",
            adults: "adult(s)",
            nightsUnit: "night(s)",
            toastEmailMismatch: "Email addresses do not match",
            toastPhoneInvalid: "Phone number must be 8 digits",
            toastSelectDates: "Please select check-in and check-out dates",
            toastCheckOutBeforeCheckIn: "Check-out date must be after check-in date",
            toastMinOneNight: "Minimum stay is 1 night",
            toastBookingSuccess: "Booking successful! Redirecting...",
            toastBookingFailed: "Booking failed, please try again",
            toastServerError: "Unable to connect to server. Please ensure backend is running.",
            toastNoData: "Missing booking information. Redirecting to room selection.",
            toastDataParseError: "Data parsing error"
        },
        ja: {
            hotel_name: "91ホテル",
            pageTitle: "予約情報 · 91ホテル",
            backToRooms: "客室に戻る",
            selectDates: "チェックイン / チェックアウト日を選択",
            checkInDate: "チェックイン日 *",
            checkOutDate: "チェックアウト日 *",
            totalNights: "合計 {nights} 泊",
            contactInfo: "連絡先情報",
            title: "敬称 *",
            pleaseSelect: "選択してください",
            mr: "様",
            ms: "様",
            fullName: "氏名 *",
            fullNamePlaceholder: "氏名（身分証明書と一致）",
            email: "メールアドレス *",
            confirmEmail: "メールアドレス確認 *",
            phone: "電話番号",
            phonePlaceholder: "8桁の電話番号を入力",
            phoneHint: "8桁の電話番号を入力してください",
            arrivalTime: "到着予定時刻",
            after18: "18:00以降",
            specialRequests: "特別リクエスト（任意）",
            specialRequestsPlaceholder: "例：禁煙室、高層階、エレベーター近く",
            payment: "お支払い",
            securityNotice: "セキュリティ通知",
            securityMessage: "お支払い情報は暗号化されます。このページはフロントエンドデモであり、実際の請求は行われません。",
            cardNumber: "カード番号",
            expiry: "有効期限 (MM/YY) *",
            expiryHint: "例：1228 → 12/28",
            cardholderName: "カード名義人 *",
            cardholderNamePlaceholder: "名義",
            cardNumberTitle: "12桁のカード番号を入力してください",
            expiryTitle: "4桁の数字（MMYY）を入力してください",
            policies: "ポリシー",
            checkIn: "チェックイン",
            checkInTime: "14:00以降",
            checkOut: "チェックアウト",
            checkOutTime: "12:00まで",
            cancellationPolicy: "キャンセルポリシー",
            cancellationMessage: "チェックイン48時間前まで無料キャンセル可能。以降は初泊料金をキャンセル料として申し受けます。",
            agreeTermsPrefix: "私は以下を読み、同意しました：",
            bookingTerms: "予約規約",
            and: "および",
            privacyPolicy: "プライバシーポリシー",
            back: "戻る",
            confirmBooking: "予約を確定する",
            priceDetails: "料金詳細",
            directBookingBenefits: "直接予約特典",
            benefit1: "柔軟なチェックイン/アウト時間",
            benefit2: "柔軟な予約、エリア選択可能",
            benefit3: "限定オファーと料金",
            benefit4: "ユニークな企画イベント体験",
            needHelp: "お問い合わせ",
            helpText: "専門予約チームが対応いたします：",
            room: "客室",
            price: "料金",
            nights: "泊数",
            tax: "税金",
            total: "合計",
            adults: "名",
            nightsUnit: "泊",
            toastEmailMismatch: "メールアドレスが一致しません",
            toastPhoneInvalid: "電話番号は8桁の数字で入力してください",
            toastSelectDates: "チェックイン日とチェックアウト日を選択してください",
            toastCheckOutBeforeCheckIn: "チェックアウト日はチェックイン日より後にしてください",
            toastMinOneNight: "最低1泊以上で予約してください",
            toastBookingSuccess: "予約が完了しました！画面遷移中...",
            toastBookingFailed: "予約に失敗しました。再試行してください",
            toastServerError: "サーバーに接続できません。バックエンドが起動しているか確認してください",
            toastNoData: "予約情報がありません。客室選択画面に戻ります",
            toastDataParseError: "データ解析エラー"
        }
    };

    let currentLang = localStorage.getItem('language') || 'zh';

    // i18n 函数：翻译页面
    function translatePage(lang) {
        const t = translations[lang] || translations.zh;
        
        // 1. 翻译带有 data-i18n 的元素（文本内容）
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            let text = t[key] || key;
            
            // 处理带参数的情况 (如 {nights})
            const argsAttr = el.getAttribute('data-i18n-args');
            if (argsAttr) {
                try {
                    const args = JSON.parse(argsAttr);
                    text = text.replace(/\{(\w+)\}/g, (_, k) => args[k] !== undefined ? args[k] : '');
                } catch(e) {}
            }
            
            if (el.tagName === 'OPTION') {
                el.textContent = text;
            } else {
                el.textContent = text;
            }
        });

        // 2. 专门翻译带有 data-i18n-placeholder 的元素（占位符）
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) {
                el.placeholder = t[key];
            }
        });

        // 3. 专门翻译带有 data-i18n-title 的元素（提示文本）
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (t[key]) {
                el.title = t[key];
            }
        });

        // 更新动态生成的摘要文本
        updateNightsDisplay();
        if (typeof renderSummary === 'function') renderSummary();
        document.documentElement.lang = lang;
    }

    // 更新夜数显示（支持参数）
    function updateNightsDisplay() {
        const nightsSpan = document.getElementById('nightsDisplay');
        if (nightsSpan && currentParams) {
            const nights = nightsBetween(currentParams.checkIn, currentParams.checkOut);
            const t = translations[currentLang];
            const text = (t.totalNights || "共 {nights} 晚").replace('{nights}', nights);
            nightsSpan.textContent = text;
        }
    }

    // 语言切换事件
    function setupLanguageSwitcher() {
        const select = document.getElementById('languageSelect');
        if (select) {
            select.value = currentLang;
            select.addEventListener('change', (e) => {
                currentLang = e.target.value;
                localStorage.setItem('language', currentLang);
                translatePage(currentLang);
                // 重新渲染摘要以更新标签
                if (typeof renderSummary === 'function') renderSummary();
            });
        }
        translatePage(currentLang);
    }

    // ---------- 工具函数 (与之前相同) ----------
    function parseISODate(value) {
        const d = new Date(value);
        return Number.isNaN(d.getTime()) ? null : d;
    }

    function nightsBetween(checkIn, checkOut) {
        const inD = parseISODate(checkIn);
        const outD = parseISODate(checkOut);
        if (!inD || !outD) return 0;
        return Math.max(0, Math.ceil((outD - inD) / (1000 * 60 * 60 * 24)));
    }

    const RATES   = { CNY:1, HKD:1.1, USD:0.14, EUR:0.13, GBP:0.11, SGD:0.19, AUD:0.21, JPY:21.0, KRW:188.0, THB:5.0, MYR:0.66 };
    const SYMBOLS = { CNY:'¥', HKD:'HK$', USD:'$', EUR:'€', GBP:'£', SGD:'S$', AUD:'A$', JPY:'¥', KRW:'₩', THB:'฿', MYR:'RM' };

    function getCurrency() {
        return localStorage.getItem('currency') || 'HKD';
    }

    function formatMoney(amountCNY) {
        const currency = getCurrency();
        const rate     = RATES[currency]   || 1;
        const symbol   = SYMBOLS[currency] || '¥';
        const converted = amountCNY * rate;
        if (currency === 'JPY' || currency === 'KRW') {
            return symbol + Math.round(converted).toLocaleString();
        }
        return symbol + converted.toFixed(2);
    }

    function showToast(messageKey, type = 'info') {
        const t = translations[currentLang] || translations.zh;
        const message = t[messageKey] || messageKey;
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.innerHTML = '<span>' + message + '</span>';
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 2800);
    }

    window.formatExpiry = function(input) {
        let val = input.value.replace(/\D/g, '').slice(0, 4);
        if (val.length >= 3) {
            val = val.slice(0, 2) + '/' + val.slice(2);
        }
        input.value = val;
    };

    // ---------- 全局变量 ----------
    let currentRoom = null;
    let currentParams = { checkIn: '', checkOut: '', guests: '2' };

    const checkInInput = document.getElementById('checkInDate');
    const checkOutInput = document.getElementById('checkOutDate');
    const nightsSpan = document.getElementById('nightsDisplay');
    const summaryName = document.getElementById('summaryRoomName');
    const summaryMeta = document.getElementById('summaryRoomMeta');
    const summaryFees = document.getElementById('summaryFees');

    function getTodayString() {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function renderSummary() {
        if (!currentRoom) return;
        const t = translations[currentLang] || translations.zh;

        const roomName = typeof currentRoom.name === 'object' 
            ? (currentRoom.name[currentLang] || currentRoom.name.zh || '-') 
            : (currentRoom.name || '-');

        const nights = nightsBetween(currentParams.checkIn, currentParams.checkOut);
        const price = Number(currentRoom.price || 0);
        const subtotal = price * nights;
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        if (summaryName) summaryName.textContent = roomName;
        if (summaryMeta) {
            const checkInShow = currentParams.checkIn || '--';
            const checkOutShow = currentParams.checkOut || '--';
            summaryMeta.textContent = `${checkInShow} - ${checkOutShow} · ${currentParams.guests} ${t.adults} · ${nights} ${t.nightsUnit}`;
        }

        if (summaryFees) {
            summaryFees.innerHTML = `
                <div class="fee-row"><span>${t.room}</span><span>${roomName}</span></div>
                <div class="fee-row"><span>${t.price}</span><span>${formatMoney(price)} /${t.nightsUnit}</span></div>
                <div class="fee-row"><span>${t.nights}</span><span>${nights}</span></div>
                <div class="fee-row"><span>${t.tax}</span><span>${formatMoney(tax)}</span></div>
                <div class="fee-row" style="font-weight:bold;color:#e07b39"><span>${t.total}</span><span>${formatMoney(total)}</span></div>
            `;
        }

        if (nightsSpan) {
            nightsSpan.textContent = (t.totalNights || "共 {nights} 晚").replace('{nights}', nights);
        }
    }

    function updateDatesAndRender(newCheckIn, newCheckOut) {
        currentParams.checkIn = newCheckIn;
        currentParams.checkOut = newCheckOut;
        renderSummary();
    }

    function setupDateConstraints() {
        const today = getTodayString();
        checkInInput.min = today;
        checkOutInput.min = today;

        checkInInput.addEventListener('change', function() {
            const inVal = checkInInput.value;
            if (inVal) {
                checkOutInput.min = inVal;
                if (checkOutInput.value && checkOutInput.value < inVal) {
                    checkOutInput.value = inVal;
                }
                if (checkOutInput.value) {
                    updateDatesAndRender(inVal, checkOutInput.value);
                }
            }
        });

        checkOutInput.addEventListener('change', function() {
            const inVal = checkInInput.value;
            const outVal = checkOutInput.value;
            if (inVal && outVal) {
                if (outVal <= inVal) {
                    showToast('toastCheckOutBeforeCheckIn', 'error');
                    checkOutInput.value = '';
                    return;
                }
                updateDatesAndRender(inVal, outVal);
            }
        });
    }

    function initFromStorage() {
        const roomRaw = sessionStorage.getItem('checkout_room');
        const paramsRaw = sessionStorage.getItem('checkout_params');

        if (!roomRaw || !paramsRaw) {
            showToast('toastNoData', 'error');
            setTimeout(() => { window.location.href = 'Book.html'; }, 1500);
            return false;
        }

        try {
            currentRoom = JSON.parse(roomRaw);
            currentParams = JSON.parse(paramsRaw);
        } catch (e) {
            showToast('toastDataParseError', 'error');
            return false;
        }

        if (checkInInput && checkOutInput) {
            checkInInput.value = currentParams.checkIn || '';
            checkOutInput.value = currentParams.checkOut || '';
        }

        renderSummary();
        return true;
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const t = translations[currentLang];
        const form = e.target;
        
        const email = (form.querySelector('input[name="email"]')?.value || '').trim();
        const confirmEmail = (form.querySelector('input[name="confirmEmail"]')?.value || '').trim();
        if (email && confirmEmail && email !== confirmEmail) {
            showToast('toastEmailMismatch', 'error');
            return;
        }

        const phone = (form.querySelector('input[name="phone"]')?.value || '').trim();
        if (!/^\d{8}$/.test(phone)) {
            showToast('toastPhoneInvalid', 'error');
            return;
        }

        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;
        if (!checkIn || !checkOut) {
            showToast('toastSelectDates', 'error');
            return;
        }
        if (checkOut <= checkIn) {
            showToast('toastCheckOutBeforeCheckIn', 'error');
            return;
        }

        const nights = nightsBetween(checkIn, checkOut);
        if (nights <= 0) {
            showToast('toastMinOneNight', 'error');
            return;
        }

        const rawPrice = Number(currentRoom.price || 0);
        const totalCNY = parseFloat((rawPrice * nights * 1.1).toFixed(2));
        const currency = getCurrency();
        const rate = RATES[currency] || 1;
        const symbol = SYMBOLS[currency] || '¥';
        const displayTotal = (totalCNY * rate).toFixed(2);
        const totalDisplay = symbol + displayTotal + ' (' + currency + ')';

        const username = sessionStorage.getItem('username') || sessionStorage.getItem('name') || 'guest';

        const roomNameForDB = typeof currentRoom.name === 'object' ? (currentRoom.name.zh || currentRoom.name.en || '') : (currentRoom.name || '');

        const booking = {
            username: username,
            roomId: currentRoom.id || '',
            roomName: roomNameForDB,
            roomType: roomNameForDB,
            guestName: (form.querySelector('input[name="fullName"]')?.value || '').trim(),
            guestPhone: phone,
            guestEmail: email,
            checkIn: checkIn,
            checkOut: checkOut,
            nights: nights,
            totalAmount: totalCNY,
            totalDisplay: totalDisplay,
            currency: currency,
            arrivalTime: form.querySelector('select[name="arrivalTime"]')?.value || '',
            specialRequests: (form.querySelector('input[name="specialRequests"]')?.value || '').trim(),
            status: 'confirmed'
        };

        console.log('[checkout] submitting booking:', booking);

        try {
            const res = await fetch('http://43.132.210.15:3000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking)
            });
            const data = await res.json();
            if (res.ok) {
                showToast('toastBookingSuccess', 'success');
                
                // 添加预订成功通知
                if (window.HotelNotification) {
                    window.HotelNotification.addNotification({
                        userId: username,
                        type: 'booking_success',
                        templateKey: 'booking_success',
                        params: {
                            roomName: currentRoom.name || '房间',
                            checkIn: checkIn,
                            checkOut: checkOut,
                            totalAmount: totalDisplay || (currency + ' ' + displayTotal)
                        }
                    });
                }
                
                sessionStorage.removeItem('checkout_room');
                sessionStorage.removeItem('checkout_params');
                setTimeout(() => { window.location.href = 'Book.html'; }, 1800);
            } else {
                showToast('toastBookingFailed', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('toastServerError', 'error');
        }
    }

    // 主题切换
    function setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(icon, savedTheme);

        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(icon, newTheme);
        });
    }

    function updateThemeIcon(icon, theme) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ---------- 启动 ----------
    document.addEventListener('DOMContentLoaded', function() {
        setupLanguageSwitcher();
        setupThemeToggle();

        if (!initFromStorage()) return;

        setupDateConstraints();

        if (checkInInput.value && checkOutInput.value) {
            updateDatesAndRender(checkInInput.value, checkOutInput.value);
        }

        const form = document.getElementById('checkoutForm');
        form.addEventListener('submit', handleFormSubmit);
    });

})();