(function(){
    "use strict";

    // ---------- 工具函数 ----------
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

<<<<<<< Updated upstream
    // 设置初始入住人数
    var guestsSelect = document.getElementById('guestsSelect');
    if (guestsSelect) {
        guestsSelect.value = params.guests || '2';
        guestsSelect.addEventListener('change', function() {
            params.guests = this.value;
            renderSummary(room, params);
        });
    }

    renderSummary(room, params);
=======
    // 汇率配置
    const RATES   = { CNY:1, HKD:1.1, USD:0.14, EUR:0.13, GBP:0.11, SGD:0.19, AUD:0.21, JPY:21.0, KRW:188.0, THB:5.0, MYR:0.66 };
    const SYMBOLS = { CNY:'¥', HKD:'HK$', USD:'$', EUR:'€', GBP:'£', SGD:'S$', AUD:'A$', JPY:'¥', KRW:'₩', THB:'฿', MYR:'RM' };
>>>>>>> Stashed changes

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

    // Toast 提示
    function showToast(message, type = 'info') {
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

    // 有效期格式化 (供 HTML 内联 oninput 调用)
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

    // DOM 元素
    const checkInInput = document.getElementById('checkInDate');
    const checkOutInput = document.getElementById('checkOutDate');
    const nightsSpan = document.getElementById('nightsDisplay');
    const summaryName = document.getElementById('summaryRoomName');
    const summaryMeta = document.getElementById('summaryRoomMeta');
    const summaryFees = document.getElementById('summaryFees');

    // 获取今天的日期字符串 YYYY-MM-DD
    function getTodayString() {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 渲染右侧摘要 (价格 + 房间信息)
    function renderSummary() {
        if (!currentRoom) return;

        const nights = nightsBetween(currentParams.checkIn, currentParams.checkOut);
        const price = Number(currentRoom.price || 0);
        const subtotal = price * nights;
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        if (summaryName) summaryName.textContent = currentRoom.name || '-';
        if (summaryMeta) {
            const checkInShow = currentParams.checkIn || '--';
            const checkOutShow = currentParams.checkOut || '--';
            summaryMeta.textContent = `${checkInShow} - ${checkOutShow} · ${currentParams.guests} 位成人 · ${nights} 晚`;
        }

        if (summaryFees) {
            summaryFees.innerHTML = `
                <div class="fee-row"><span>客房</span><span>${currentRoom.name || '-'}</span></div>
                <div class="fee-row"><span>价格</span><span>${formatMoney(price)} /晚</span></div>
                <div class="fee-row"><span>晚数</span><span>${nights}</span></div>
                <div class="fee-row"><span>税费</span><span>${formatMoney(tax)}</span></div>
                <div class="fee-row" style="font-weight:bold;color:#e07b39"><span>总计</span><span>${formatMoney(total)}</span></div>
            `;
        }

        if (nightsSpan) nightsSpan.textContent = `共 ${nights} 晚`;
    }

    // 更新日期并重新渲染
    function updateDatesAndRender(newCheckIn, newCheckOut) {
        currentParams.checkIn = newCheckIn;
        currentParams.checkOut = newCheckOut;
        renderSummary();
    }

    // 设置日期选择器的最小/最大值
    function setupDateConstraints() {
        const today = getTodayString();
        checkInInput.min = today;
        checkOutInput.min = today;

        var booking = {
            username:        username,
            roomId:          room.id   || '',
            roomName:        room.name || '',
            roomType:        room.name || '',
            guestName:       ((form.querySelector('input[name="fullName"]')       || {}).value || '').trim(),
            guestPhone:      phone,
            guestEmail:      email,
            checkIn:         params.checkIn,
            checkOut:        params.checkOut,
            nights:          nights,
            guests:          params.guests || '2',
            totalAmount:     totalCNY,
            totalDisplay:    totalDisplay,
            currency:        currency,
            arrivalTime:     ((form.querySelector('select[name="arrivalTime"]')   || {}).value || ''),
            specialRequests: ((form.querySelector('input[name="specialRequests"]')|| {}).value || '').trim(),
            country:         ((form.querySelector('select[name="country"]')       || {}).value || ''),
            city:            ((form.querySelector('input[name="city"]')           || {}).value || '').trim(),
            address:         ((form.querySelector('input[name="address"]')        || {}).value || '').trim(),
            status:          'confirmed'
        };

        checkOutInput.addEventListener('change', function() {
            const inVal = checkInInput.value;
            const outVal = checkOutInput.value;
            if (inVal && outVal) {
                if (outVal <= inVal) {
                    showToast('退房日期必须晚于入住日期', 'error');
                    checkOutInput.value = '';
                    return;
                }
                updateDatesAndRender(inVal, outVal);
            }
        });
    }

    // 初始化：从 sessionStorage 读取房间和参数
    function initFromStorage() {
        const roomRaw = sessionStorage.getItem('checkout_room');
        const paramsRaw = sessionStorage.getItem('checkout_params');

        if (!roomRaw || !paramsRaw) {
            showToast('缺少预订信息，即将返回选房页', 'error');
            setTimeout(() => { window.location.href = 'Book.html'; }, 1500);
            return false;
        }

        try {
            currentRoom = JSON.parse(roomRaw);
            currentParams = JSON.parse(paramsRaw);
        } catch (e) {
            showToast('数据解析失败', 'error');
            return false;
        }

        if (checkInInput && checkOutInput) {
            checkInInput.value = currentParams.checkIn || '';
            checkOutInput.value = currentParams.checkOut || '';
        }

        renderSummary();
        return true;
    }

    // 表单提交处理
    async function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        
        const email = (form.querySelector('input[name="email"]')?.value || '').trim();
        const confirmEmail = (form.querySelector('input[name="confirmEmail"]')?.value || '').trim();
        if (email && confirmEmail && email !== confirmEmail) {
            showToast('两次输入的邮箱不一致', 'error');
            return;
        }

        const phone = (form.querySelector('input[name="phone"]')?.value || '').trim();
        if (!/^\d{8}$/.test(phone)) {
            showToast('电话号码必须是8位数字', 'error');
            return;
        }

        const checkIn = checkInInput.value;
        const checkOut = checkOutInput.value;
        if (!checkIn || !checkOut) {
            showToast('请选择入住和退房日期', 'error');
            return;
        }
        if (checkOut <= checkIn) {
            showToast('退房日期必须晚于入住日期', 'error');
            return;
        }

        const nights = nightsBetween(checkIn, checkOut);
        if (nights <= 0) {
            showToast('入住天数至少为1晚', 'error');
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

        const booking = {
            username: username,
            roomId: currentRoom.id || '',
            roomName: currentRoom.name || '',
            roomType: currentRoom.name || '',
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

        console.log('[checkout] 提交预订:', booking);

        try {
            const res = await fetch('http://localhost:3000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking)
            });
            const data = await res.json();
            if (res.ok) {
                showToast('预订成功！正在跳转...', 'success');
                sessionStorage.removeItem('checkout_room');
                sessionStorage.removeItem('checkout_params');
                setTimeout(() => { window.location.href = 'Book.html'; }, 1800);
            } else {
                showToast(data.message || '预订失败，请重试', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('无法连接服务器，请确认后端已启动', 'error');
        }
    }

    // ---------- 页面启动 ----------
    document.addEventListener('DOMContentLoaded', function() {
        if (!initFromStorage()) return;

        setupDateConstraints();

        if (checkInInput.value && checkOutInput.value) {
            updateDatesAndRender(checkInInput.value, checkOutInput.value);
        }

        const form = document.getElementById('checkoutForm');
        form.addEventListener('submit', handleFormSubmit);
    });

})();