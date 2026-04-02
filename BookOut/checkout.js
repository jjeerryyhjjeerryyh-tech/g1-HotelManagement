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
const SYMBOLS = { CNY:'\u00a5', HKD:'HK\u0024', USD:'\u0024', EUR:'\u20ac', GBP:'\u00a3', SGD:'S\u0024', AUD:'A\u0024', JPY:'\u00a5', KRW:'\u20a9', THB:'\u0e3f', MYR:'RM' };

function getCurrency() {
    return localStorage.getItem('currency') || 'HKD';
}

function formatMoney(amountCNY) {
    const currency = getCurrency();
    const rate     = RATES[currency]   || 1;
    const symbol   = SYMBOLS[currency] || '\u00a5';
    const converted = amountCNY * rate;
    if (currency === 'JPY' || currency === 'KRW') {
        return symbol + Math.round(converted).toLocaleString();
    }
    return symbol + converted.toFixed(2);
}

function showToast(message, type) {
    type = type || 'info';
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(function() {
        toast.classList.add('fade-out');
        setTimeout(function() { toast.remove(); }, 300);
    }, 2800);
}

function renderSummary(room, params) {
    const nameEl = document.getElementById('summaryRoomName');
    const metaEl = document.getElementById('summaryRoomMeta');
    const feeEl  = document.getElementById('summaryFees');

    const nights   = nightsBetween(params.checkIn, params.checkOut);
    const guests   = params.guests || '2';
    const price    = Number(room.price || 0);
    const subtotal = price * nights;
    const tax      = subtotal * 0.1;
    const total    = subtotal + tax;

    if (nameEl) nameEl.textContent = room.name || '-';
    if (metaEl) metaEl.textContent = params.checkIn + ' - ' + params.checkOut + ' \u00b7 ' + guests + ' \u4f4d\u6210\u4eba \u00b7 ' + nights + ' \u665a';

    if (feeEl) {
        feeEl.innerHTML =
            '<div class="fee-row"><span>\u5ba2\u623f</span><span>' + (room.name || '-') + '</span></div>' +
            '<div class="fee-row"><span>\u4ef7\u683c</span><span>' + formatMoney(price) + ' /\u665a</span></div>' +
            '<div class="fee-row"><span>\u665a\u6570</span><span>' + nights + '</span></div>' +
            '<div class="fee-row"><span>\u7a0e\u8d39</span><span>' + formatMoney(tax) + '</span></div>' +
            '<div class="fee-row" style="font-weight:bold;color:#e07b39"><span>\u5168\u90e8\u7684</span><span>' + formatMoney(total) + '</span></div>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var roomRaw   = sessionStorage.getItem('checkout_room');
    var paramsRaw = sessionStorage.getItem('checkout_params');
    if (!roomRaw || !paramsRaw) {
        window.location.href = 'Book.html';
        return;
    }

    var room   = JSON.parse(roomRaw);
    var params = JSON.parse(paramsRaw);

    renderSummary(room, params);

    var form = document.getElementById('checkoutForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        var email        = (form.querySelector('input[name="email"]')        || {}).value || '';
        var confirmEmail = (form.querySelector('input[name="confirmEmail"]') || {}).value || '';
        email        = email.trim();
        confirmEmail = confirmEmail.trim();

        if (email && confirmEmail && email !== confirmEmail) {
            showToast('\u4e24\u6b21\u8f93\u5165\u7684\u90ae\u7b71\u4e0d\u4e00\u81f4', 'error');
            return;
        }

        var phone = ((form.querySelector('input[name="phone"]') || {}).value || '').trim();
        if (!/^\d{8}$/.test(phone)) {
            showToast('\u7535\u8bdd\u53f7\u7801\u5fc5\u987b\u662f8\u4f4d\u6570\u5b57', 'error');
            return;
        }

        var nights   = nightsBetween(params.checkIn, params.checkOut);
        var rawPrice = Number(room.price || 0);
        var totalCNY = parseFloat((rawPrice * nights * 1.1).toFixed(2));

        var currency     = getCurrency();
        var rate         = RATES[currency]   || 1;
        var symbol       = SYMBOLS[currency] || '\u00a5';
        var displayTotal = (totalCNY * rate).toFixed(2);
        var totalDisplay = symbol + displayTotal + ' (' + currency + ')';

        // 读取登录用户名
        var username = sessionStorage.getItem('username') || sessionStorage.getItem('name') || 'guest';

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

        console.log('[checkout] submitting booking:', booking);

        try {
            var res  = await fetch('http://localhost:3000/api/bookings', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(booking)
            });
            var data = await res.json();
            if (res.ok) {
                showToast('\u9884\u8ba2\u6210\u529f\uff01\u6b63\u5728\u8df3\u8f6c...', 'success');
                sessionStorage.removeItem('checkout_room');
                sessionStorage.removeItem('checkout_params');
                setTimeout(function() { window.location.href = 'Book.html'; }, 1800);
            } else {
                showToast(data.message || '\u9884\u8ba2\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5', 'error');
            }
        } catch (err) {
            console.error('[checkout] fetch error:', err);
            showToast('\u65e0\u6cd5\u8fde\u63a5\u670d\u52a1\u5668\uff0c\u8bf7\u786e\u8ba4\u540e\u7aef\u5df2\u542f\u52a8', 'error');
        }
    });
});
