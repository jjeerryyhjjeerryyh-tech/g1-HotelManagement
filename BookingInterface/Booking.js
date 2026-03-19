// Mock Data
let bookings = [
    {
        id: 'BK001234',
        guest: { name: '张伟', email: 'zhangwei@email.com', phone: '+86 138-0000-0001' },
        room: { type: '豪华套房', roomNumber: '801', channel: '官网直销', ratePlan: '标准价' },
        checkIn: '2024-03-15',
        checkOut: '2024-03-18',
        nights: 3,
        totalAmount: 3600,
        status: 'confirmed',
        paymentMethod: '信用卡',
        cancellationDeadline: '2024-03-12',
        refundable: true
    },
    {
        id: 'BK001235',
        guest: { name: '李娜', email: 'lina@email.com', phone: '+86 139-0000-0002' },
        room: { type: '标准客房', roomNumber: '502', channel: 'OTA-携程', ratePlan: '促销价' },
        checkIn: '2024-03-20',
        checkOut: '2024-03-22',
        nights: 2,
        totalAmount: 1200,
        status: 'tentative',
        paymentMethod: '支付宝',
        cancellationDeadline: '2024-03-18',
        refundable: true
    },
    {
        id: 'BK001236',
        guest: { name: '王芳', email: 'wangfang@email.com', phone: '+86 137-0000-0003' },
        room: { type: '海景房', roomNumber: '1203', channel: '电话预订', ratePlan: '会员价' },
        checkIn: '2024-03-10',
        checkOut: '2024-03-12',
        nights: 2,
        totalAmount: 2800,
        status: 'checked-in',
        paymentMethod: '微信支付',
        cancellationDeadline: '2024-03-07',
        refundable: false
    },
    {
        id: 'BK001237',
        guest: { name: '刘洋', email: 'liuyang@email.com', phone: '+86 136-0000-0004' },
        room: { type: '标准客房', roomNumber: '305', channel: '官网直销', ratePlan: '早鸟价' },
        checkIn: '2024-03-25',
        checkOut: '2024-03-28',
        nights: 3,
        totalAmount: 1500,
        status: 'confirmed',
        paymentMethod: '信用卡',
        cancellationDeadline: '2024-03-22',
        refundable: true
    },
    {
        id: 'BK001238',
        guest: { name: '陈明', email: 'chenming@email.com', phone: '+86 135-0000-0005' },
        room: { type: '总统套房', roomNumber: '2001', channel: 'OTA-Booking.com', ratePlan: '不可退款价' },
        checkIn: '2024-03-08',
        checkOut: '2024-03-10',
        nights: 2,
        totalAmount: 12000,
        status: 'checked-out',
        paymentMethod: '信用卡',
        cancellationDeadline: '2024-03-05',
        refundable: false
    },
    {
        id: 'BK001239',
        guest: { name: '赵静', email: 'zhaojing@email.com', phone: '+86 134-0000-0006' },
        room: { type: '标准客房', roomNumber: '412', channel: '微信小程序', ratePlan: '标准价' },
        checkIn: '2024-03-30',
        checkOut: '2024-04-02',
        nights: 3,
        totalAmount: 1800,
        status: 'tentative',
        paymentMethod: '支付宝',
        cancellationDeadline: '2024-03-28',
        refundable: true
    }
];

let currentBooking = null;
let selectedNights = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderBookings();
    updateStats();
});

// Render Bookings Table
function renderBookings(filterStatus = 'all', searchQuery = '') {
    const tbody = document.getElementById('bookingTableBody');
    tbody.innerHTML = '';

    let filtered = bookings.filter(b => {
        const matchStatus = filterStatus === 'all' || b.status === filterStatus;
        const matchSearch = b.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           b.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchStatus && matchSearch;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>没有找到匹配的预订记录</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${booking.id}</strong></td>
            <td>
                <div class="guest-info">
                    <div class="guest-avatar">${booking.guest.name.charAt(0)}</div>
                    <div class="guest-details">
                        <h4>${booking.guest.name}</h4>
                        <p>${booking.guest.phone}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="room-info">
                    <span class="room-type">${booking.room.type}</span>
                    <span class="room-details">房号 ${booking.room.roomNumber} | ${booking.room.channel}</span>
                </div>
            </td>
            <td>${formatDate(booking.checkIn)}</td>
            <td>${formatDate(booking.checkOut)}</td>
            <td><strong>¥${booking.totalAmount.toLocaleString()}</strong></td>
            <td>${getStatusBadge(booking.status)}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn" onclick="viewDetails('${booking.id}')" title="查看详情">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${canCancel(booking) ? `
                    <button class="action-btn danger" onclick="initiateCancellation('${booking.id}')" title="取消预订">
                        <i class="fas fa-times"></i>
                    </button>
                    ` : ''}
                    ${booking.status === 'confirmed' ? `
                    <button class="action-btn" onclick="checkIn('${booking.id}')" title="办理入住" style="color: var(--success);">
                        <i class="fas fa-sign-in-alt"></i>
                    </button>
                    ` : ''}
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Get Status Badge HTML
function getStatusBadge(status) {
    const statusMap = {
        'tentative': { class: 'status-tentative', icon: 'fa-clock', text: '待确认' },
        'confirmed': { class: 'status-confirmed', icon: 'fa-check', text: '已确认' },
        'checked-in': { class: 'status-checked-in', icon: 'fa-door-open', text: '已入住' },
        'checked-out': { class: 'status-checked-out', icon: 'fa-door-closed', text: '已退房' },
        'cancelled': { class: 'status-cancelled', icon: 'fa-ban', text: '已取消' }
    };
    const s = statusMap[status];
    return `<span class="status-badge ${s.class}"><i class="fas ${s.icon}"></i> ${s.text}</span>`;
}

// Check if booking can be cancelled
function canCancel(booking) {
    return ['tentative', 'confirmed'].includes(booking.status) && 
           new Date(booking.checkIn) > new Date();
}

// Filter Bookings
function filterBookings() {
    const status = document.getElementById('statusFilter').value;
    const search = document.getElementById('searchInput').value;
    renderBookings(status, search);
}

// Update Statistics
function updateStats() {
    const counts = {
        tentative: bookings.filter(b => b.status === 'tentative').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        'checked-in': bookings.filter(b => b.status === 'checked-in').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length
    };
    
    document.getElementById('count-pending').textContent = counts.tentative;
    document.getElementById('count-confirmed').textContent = counts.confirmed;
    document.getElementById('count-checked-in').textContent = counts['checked-in'];
    document.getElementById('count-cancelled').textContent = counts.cancelled;
}

// Initiate Cancellation
function initiateCancellation(bookingId) {
    currentBooking = bookings.find(b => b.id === bookingId);
    selectedNights = [];
    
    const modal = document.getElementById('cancellationModal');
    const content = document.getElementById('cancellationContent');
    
    // Calculate cancellation fee based on rules
    const today = new Date();
    const checkIn = new Date(currentBooking.checkIn);
    const daysUntilCheckIn = Math.ceil((checkIn - today) / (1000 * 60 * 60 * 24));
    
    let feePercentage = 0;
    let policyText = '';
    
    if (currentBooking.room.ratePlan === '不可退款价' || currentBooking.room.ratePlan === '促销价') {
        feePercentage = 100;
        policyText = '此预订为不可退款房价，取消将收取全额费用。';
    } else if (daysUntilCheckIn >= 72) {
        feePercentage = 0;
        policyText = '在入住前72小时取消，可获全额退款。';
    } else if (daysUntilCheckIn >= 48) {
        feePercentage = 33; // First night
        policyText = '在入住前48小时内取消，将收取首晚房费作为取消费用。';
    } else if (daysUntilCheckIn >= 24) {
        feePercentage = 50;
        policyText = '在入住前24小时内取消，将收取50%总费用作为取消费用。';
    } else {
        feePercentage = 100;
        policyText = '入住当天或未入住(No Show)将收取全额费用。';
    }
    
    const cancellationFee = Math.round(currentBooking.totalAmount * feePercentage / 100);
    const refundAmount = currentBooking.totalAmount - cancellationFee;
    
    content.innerHTML = `
        <div class="policy-box">
            <h4><i class="fas fa-exclamation-triangle"></i> 取消政策 (Cancellation Policy)</h4>
            <p>${policyText}</p>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.75rem;">预订信息</h4>
            <div style="background: var(--gray-100); padding: 1rem; border-radius: 0.5rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.875rem;">
                    <div><strong>预订号:</strong> ${currentBooking.id}</div>
                    <div><strong>客人:</strong> ${currentBooking.guest.name}</div>
                    <div><strong>房型:</strong> ${currentBooking.room.type}</div>
                    <div><strong>渠道:</strong> ${currentBooking.room.channel}</div>
                    <div><strong>入住:</strong> ${formatDate(currentBooking.checkIn)}</div>
                    <div><strong>退房:</strong> ${formatDate(currentBooking.checkOut)}</div>
                    <div><strong>晚数:</strong> ${currentBooking.nights} 晚</div>
                    <div><strong>支付方式:</strong> ${currentBooking.paymentMethod}</div>
                </div>
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.75rem;">部分取消 (Partial Cancellation)</h4>
            <p style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">
                如需取消部分晚数，请选择要取消的日期：
            </p>
            <div class="nights-selector" id="nightsSelector">
                ${generateNightTags(currentBooking)}
            </div>
        </div>
        
        <div class="fee-calculation">
            <div class="fee-row">
                <span>订单总额</span>
                <span>¥${currentBooking.totalAmount.toLocaleString()}</span>
            </div>
            <div class="fee-row">
                <span>取消费用 (${feePercentage}%)</span>
                <span style="color: var(--danger);">-¥${cancellationFee.toLocaleString()}</span>
            </div>
            <div class="fee-row">
                <span>退款金额</span>
                <span>¥${refundAmount.toLocaleString()}</span>
            </div>
        </div>

        <div class="form-group">
            <label class="form-label">取消原因 (Cancellation Reason)</label>
            <select class="form-select" id="cancelReason">
                <option value="">请选择取消原因...</option>
                <option value="change_plan">行程变更</option>
                <option value="found_better">找到更合适的酒店</option>
                <option value="emergency">紧急情况</option>
                <option value="duplicate">重复预订</option>
                <option value="other">其他原因</option>
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">备注说明</label>
            <textarea class="form-textarea" id="cancelNote" placeholder="请输入详细说明..."></textarea>
        </div>
        
        <div class="checkbox-wrapper">
            <input type="checkbox" id="confirmCheck">
            <label for="confirmCheck">我已阅读并同意取消政策，确认取消此预订。</label>
        </div>

        <div class="refund-timeline">
            <i class="fas fa-info-circle"></i>
            <div>
                <strong>退款说明：</strong>退款将在3-7个工作日内原路返回至您的${currentBooking.paymentMethod}账户。
            </div>
        </div>
    `;
    
    // Add event listeners to night tags
    setTimeout(() => {
        document.querySelectorAll('.night-tag:not(.cancelled)').forEach(tag => {
            tag.addEventListener('click', function() {
                this.classList.toggle('selected');
                updateCancellationFee();
            });
        });
    }, 0);
    
    modal.classList.add('active');
}

// Generate Night Tags for Partial Cancellation
function generateNightTags(booking) {
    const checkIn = new Date(booking.checkIn);
    let html = '';
    for (let i = 0; i < booking.nights; i++) {
        const date = new Date(checkIn);
        date.setDate(date.getDate() + i);
        const dateStr = date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
        const isPast = date < new Date().setHours(0,0,0,0);
        html += `<div class="night-tag ${isPast ? 'cancelled' : ''}" data-night="${i}">${dateStr}</div>`;
    }
    return html;
}

// Update Cancellation Fee based on selected nights
function updateCancellationFee() {
    const selected = document.querySelectorAll('.night-tag.selected');
    // This is a simplified calculation - in real system would recalculate based on selected nights
}

// Confirm Cancellation
function confirmCancellation() {
    const confirmCheck = document.getElementById('confirmCheck');
    const reason = document.getElementById('cancelReason').value;
    
    if (!confirmCheck.checked) {
        showToast('请勾选确认取消选项', 'error');
        return;
    }
    
    if (!reason) {
        showToast('请选择取消原因', 'error');
        return;
    }
    
    // Simulate API call
    const btn = document.getElementById('confirmCancelBtn');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<div class="spinner"></div> 处理中...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Update booking status
        currentBooking.status = 'cancelled';
        currentBooking.cancellationDetails = {
            cancelledAt: new Date().toISOString(),
            reason: reason,
            refundAmount: calculateRefund(currentBooking)
        };
        
        // Trigger inventory release workflow
        releaseInventory(currentBooking);
        
        // Trigger refund workflow
        initiateRefund(currentBooking);
        
        closeModal();
        renderBookings();
        updateStats();
        showToast('预订已成功取消，库存已释放，退款处理中', 'success');
        
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }, 1500);
}

// Calculate Refund Amount
function calculateRefund(booking) {
    // Simplified calculation
    return booking.totalAmount * 0.8; // Example: 80% refund
}

// Release Inventory
function releaseInventory(booking) {
    console.log(`库存释放: 房间 ${booking.room.roomNumber} 从 ${booking.checkIn} 到 ${booking.checkOut} 已重新开放销售`);
    // In real system, this would update all connected distribution channels
}

// Initiate Refund
function initiateRefund(booking) {
    console.log(`退款流程启动: 向 ${booking.paymentMethod} 退款 ¥${calculateRefund(booking)}`);
    // In real system, this would integrate with payment gateway
}

// View Booking Details
function viewDetails(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    const modal = document.getElementById('detailsModal');
    const content = document.getElementById('detailsContent');
    
    content.innerHTML = `
        <div style="display: grid; gap: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--gray-100); border-radius: 0.5rem;">
                <div>
                    <div style="font-size: 0.75rem; color: var(--gray-600);">预订状态</div>
                    <div style="margin-top: 0.25rem;">${getStatusBadge(booking.status)}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 0.75rem; color: var(--gray-600);">预订号</div>
                    <div style="font-weight: 700; font-size: 1.125rem;">${booking.id}</div>
                </div>
            </div>
            
            <div>
                <h4 style="margin-bottom: 0.75rem; color: var(--primary);">客人信息</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.875rem;">
                    <div><strong>姓名:</strong> ${booking.guest.name}</div>
                    <div><strong>电话:</strong> ${booking.guest.phone}</div>
                    <div><strong>邮箱:</strong> ${booking.guest.email}</div>
                    <div><strong>支付方式:</strong> ${booking.paymentMethod}</div>
                </div>
            </div>
            
            <div>
                <h4 style="margin-bottom: 0.75rem; color: var(--primary);">预订详情</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.875rem;">
                    <div><strong>房型:</strong> ${booking.room.type}</div>
                    <div><strong>房号:</strong> ${booking.room.roomNumber}</div>
                    <div><strong>预订渠道:</strong> ${booking.room.channel}</div>
                    <div><strong>房价计划:</strong> ${booking.room.ratePlan}</div>
                    <div><strong>入住日期:</strong> ${formatDate(booking.checkIn)}</div>
                    <div><strong>退房日期:</strong> ${formatDate(booking.checkOut)}</div>
                    <div><strong>入住晚数:</strong> ${booking.nights} 晚</div>
                    <div><strong>订单总额:</strong> ¥${booking.totalAmount.toLocaleString()}</div>
                </div>
            </div>
            
            ${booking.cancellationDetails ? `
            <div style="background: #fee2e2; padding: 1rem; border-radius: 0.5rem;">
                <h4 style="margin-bottom: 0.5rem; color: var(--danger);">取消记录</h4>
                <p style="font-size: 0.875rem; color: var(--gray-600);">
                    取消时间: ${formatDateTime(booking.cancellationDetails.cancelledAt)}<br>
                    取消原因: ${booking.cancellationDetails.reason}<br>
                    退款金额: ¥${booking.cancellationDetails.refundAmount.toLocaleString()}
                </p>
            </div>
            ` : ''}
        </div>
    `;
    
    modal.classList.add('active');
}

// Check In Function
function checkIn(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (confirm(`确认为客人 ${booking.guest.name} 办理入住？`)) {
        booking.status = 'checked-in';
        renderBookings();
        updateStats();
        showToast(`客人 ${booking.guest.name} 已成功入住房间 ${booking.room.roomNumber}`, 'success');
        
        // Trigger housekeeping workflow
        console.log(`触发客房部工作流程: 房间 ${booking.room.roomNumber} 状态更新为已入住`);
    }
}

// Close Modals
function closeModal() {
    document.getElementById('cancellationModal').classList.remove('active');
    currentBooking = null;
}

function closeDetailsModal() {
    document.getElementById('detailsModal').classList.remove('active');
}

// Show Toast Notification
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]}" style="font-size: 1.25rem; color: var(--${type === 'info' ? 'primary' : type});"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Format Date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN');
}

// Refresh Data
function refreshData() {
    showToast('数据已刷新', 'success');
    renderBookings();
    updateStats();
}

// Edit Rules (placeholder)
function editRules() {
    showToast('取消规则编辑功能开发中...', 'info');
}

// Switch Tab
function switchTab(tab) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    event.target.closest('.nav-tab').classList.add('active');
    
    if (tab === 'cancellations') {
        document.getElementById('statusFilter').value = 'cancelled';
        filterBookings();
    } else if (tab === 'bookings') {
        document.getElementById('statusFilter').value = 'all';
        filterBookings();
    }
}

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});
