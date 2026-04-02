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

function formatMoney(amount) {
    const currency = localStorage.getItem('currency') || 'HKD';
    const rates = {
        CNY: 1,
        HKD: 1.1,
        USD: 0.14,
        EUR: 0.13,
        GBP: 0.11,
        SGD: 0.19,
        AUD: 0.21,
        JPY: 21.0,
        KRW: 188.0,
        THB: 5.0,
        MYR: 0.66
    };
    const symbols = {
        CNY: '¥',
        HKD: 'HK$',
        USD: '$',
        EUR: '€',
        GBP: '£',
        SGD: 'S$',
        AUD: 'A$',
        JPY: '¥',
        KRW: '₩',
        THB: '฿',
        MYR: 'RM'
    };
    const rate = rates[currency] || 1;
    const symbol = symbols[currency] || '¥';
    const converted = amount * rate;
    if (currency === 'JPY' || currency === 'KRW') return `${symbol}${Math.round(converted).toLocaleString()}`;
    return `${symbol}${converted.toFixed(2)}`;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

function renderSummary(room, params) {
    const nameEl = document.getElementById('summaryRoomName');
    const metaEl = document.getElementById('summaryRoomMeta');
    const feeEl = document.getElementById('summaryFees');

    const nights = nightsBetween(params.checkIn, params.checkOut);
    const guests = params.guests || '2';

    const roomPrice = Number(room.price || 0);
    const subtotal = roomPrice * nights;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    if (nameEl) nameEl.textContent = room.name || '-';
    if (metaEl) metaEl.textContent = `${params.checkIn} - ${params.checkOut} · ${guests} 位成人 · ${nights} 晚`;

    if (feeEl) {
        feeEl.innerHTML = `
            <div class="fee-row"><span>客房</span><span>${room.name || '-'}</span></div>
            <div class="fee-row"><span>价格</span><span>${formatMoney(roomPrice)} /晚</span></div>
            <div class="fee-row"><span>晚数</span><span>${nights}</span></div>
            <div class="fee-row"><span>税费</span><span>${formatMoney(tax)}</span></div>
            <div class="fee-row"><span>全部的</span><span>${formatMoney(total)}</span></div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const roomRaw = sessionStorage.getItem('checkout_room');
    const paramsRaw = sessionStorage.getItem('checkout_params');
    if (!roomRaw || !paramsRaw) {
        window.location.href = 'Book.html';
        return;
    }

    const room = JSON.parse(roomRaw);
    const params = JSON.parse(paramsRaw);

    renderSummary(room, params);

    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[name="email"]')?.value?.trim() || '';
        const confirmEmail = form.querySelector('input[name="confirmEmail"]')?.value?.trim() || '';
        if (email && confirmEmail && email !== confirmEmail) {
            showToast('两次输入的邮箱不一致', 'error');
            return;
        }
        showToast('已提交预订（仅前端展示）', 'success');
    });
});

