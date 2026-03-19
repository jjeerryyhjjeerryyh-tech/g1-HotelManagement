        // ============================================
        // Mock Data
        // ============================================
        const roomsData = [
            {
                id: 'R001',
                type: 'standard',
                name: '舒适标准间',
                description: '温馨舒适的标准客房，配备高品质床品和现代化设施，是商务出行和休闲旅行的理想选择。',
                price: 588,
                originalPrice: 688,
                size: '28㎡',
                bed: '大床/双床',
                guests: 2,
                image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'
                ],
                amenities: ['免费WiFi', '空调', '液晶电视', '迷你吧', '保险箱', '24小时热水'],
                policy: '入住前48小时可免费取消',
                available: 8
            },
            {
                id: 'R002',
                type: 'deluxe',
                name: '豪华海景房',
                description: '宽敞明亮的豪华客房，拥有绝佳海景视野，配备高端家具和豪华浴室设施。',
                price: 988,
                originalPrice: 1288,
                size: '45㎡',
                bed: '特大床',
                guests: 2,
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
                ],
                amenities: ['免费WiFi', '海景阳台', '浴缸', 'Nespresso咖啡机', '浴袍拖鞋', '行政礼遇'],
                policy: '入住前72小时可免费取消',
                available: 5
            },
            {
                id: 'R003',
                type: 'suite',
                name: '行政套房',
                description: '奢华宽敞的行政套房，独立客厅和卧室设计，尊享行政酒廊待遇和专属管家服务。',
                price: 1888,
                originalPrice: 2388,
                size: '75㎡',
                bed: '特大床',
                guests: 3,
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
                ],
                amenities: ['全景落地窗', '独立客厅', '按摩浴缸', '厨房设施', '专属管家', '行政酒廊'],
                policy: '入住前72小时可免费取消',
                available: 3
            },
            {
                id: 'R004',
                type: 'standard',
                name: '商务双床房',
                description: '专为商务人士设计，配备宽敞工作区域和高速网络，让工作效率倍增。',
                price: 628,
                originalPrice: 728,
                size: '32㎡',
                bed: '双床',
                guests: 2,
                image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
                ],
                amenities: ['免费WiFi', '办公桌', '人体工学椅', '打印机', '咖啡机', '熨烫设施'],
                policy: '入住前48小时可免费取消',
                available: 12
            },
            {
                id: 'R005',
                type: 'suite',
                name: '总统套房',
                description: '酒店最顶级的住宿体验，360度城市全景，私人电梯直达，尽享尊贵奢华。',
                price: 8888,
                originalPrice: 12888,
                size: '200㎡',
                bed: '特大床',
                guests: 4,
                image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
                ],
                amenities: ['私人电梯', '私人管家', '会议室', '厨房', '私人SPA', '直升机接送'],
                policy: '入住前7天可免费取消',
                available: 1
            },
            {
                id: 'R006',
                type: 'deluxe',
                name: '花园景观房',
                description: '静谧优雅的花园景观客房，远离城市喧嚣，享受自然清新的居住环境。',
                price: 788,
                originalPrice: 988,
                size: '38㎡',
                bed: '大床',
                guests: 2,
                image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
                ],
                amenities: ['花园景观', '私人阳台', '户外座椅', '茶具套装', '瑜伽垫', '浴盐'],
                policy: '入住前48小时可免费取消',
                available: 6
            }
        ];

        let myBookings = [
            {
                id: 'GB20240315001',
                roomId: 'R002',
                roomName: '豪华海景房',
                guestName: '张先生',
                guestPhone: '138****0001',
                checkIn: '2024-04-15',
                checkOut: '2024-04-18',
                nights: 3,
                totalAmount: 2964,
                status: 'confirmed',
                paymentMethod: '微信支付',
                bookingDate: '2024-03-15',
                cancellationDeadline: '2024-04-12',
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400'
            },
            {
                id: 'GB20240220003',
                roomId: 'R001',
                roomName: '舒适标准间',
                guestName: '张先生',
                guestPhone: '138****0001',
                checkIn: '2024-03-01',
                checkOut: '2024-03-03',
                nights: 2,
                totalAmount: 1176,
                status: 'completed',
                paymentMethod: '支付宝',
                bookingDate: '2024-02-20',
                image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
            },
            {
                id: 'GB20240301005',
                roomId: 'R003',
                roomName: '行政套房',
                guestName: '张先生',
                guestPhone: '138****0001',
                checkIn: '2024-05-01',
                checkOut: '2024-05-03',
                nights: 2,
                totalAmount: 3776,
                status: 'confirmed',
                paymentMethod: '信用卡',
                bookingDate: '2024-03-01',
                cancellationDeadline: '2024-04-28',
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400'
            }
        ];

        let currentRoom = null;
        let selectedDates = { checkIn: '', checkOut: '' };
        let currentBooking = null;

        // ============================================
        // Initialization
        // ============================================
        document.addEventListener('DOMContentLoaded', function() {
            // Set default dates
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const formatDateInput = (date) => date.toISOString().split('T')[0];
            
            document.getElementById('checkInDate').value = formatDateInput(today);
            document.getElementById('checkOutDate').value = formatDateInput(tomorrow);
            
            // Render rooms
            renderRooms();
            updateStats();
            renderMyBookings();
        });

        // ============================================
        // Navigation
        // ============================================
        function switchTab(tab) {
            // Update nav tabs
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            event.target.closest('.nav-tab').classList.add('active');
            
            // Show/hide sections
            const roomsSection = document.getElementById('roomsSection');
            const bookingsSection = document.getElementById('bookingsSection');
            const searchSection = document.getElementById('searchSection');
            const statsGrid = document.querySelector('.stats-grid');
            
            if (tab === 'search') {
                roomsSection.style.display = 'block';
                bookingsSection.style.display = 'none';
                searchSection.style.display = 'block';
                statsGrid.style.display = 'grid';
                renderRooms();
            } else if (tab === 'rooms') {
                roomsSection.style.display = 'block';
                bookingsSection.style.display = 'none';
                searchSection.style.display = 'none';
                statsGrid.style.display = 'none';
                renderRooms();
            } else if (tab === 'mybookings') {
                roomsSection.style.display = 'none';
                bookingsSection.style.display = 'block';
                searchSection.style.display = 'none';
                statsGrid.style.display = 'none';
                renderMyBookings();
            }
        }

        // ============================================
        // Room Functions
        // ============================================
        function renderRooms() {
            const grid = document.getElementById('roomGrid');
            grid.innerHTML = roomsData.map(room => createRoomCard(room)).join('');
        }

        function createRoomCard(room) {
            const discount = Math.round((1 - room.price / room.originalPrice) * 100);
            
            return `
                <div class="room-card">
                    <div class="room-image">
                        <img src="${room.image}" alt="${room.name}">
                        <div class="room-badges">
                            ${discount > 0 ? `<span class="room-badge badge-discount">-${discount}%</span>` : ''}
                            ${room.available < 5 ? `<span class="room-badge badge-limited">仅剩${room.available}间</span>` : ''}
                        </div>
                        <button class="room-favorite" onclick="toggleFavorite(this, '${room.id}')">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    <div class="room-content">
                        <div class="room-type">${room.type === 'standard' ? '标准客房' : room.type === 'deluxe' ? '豪华客房' : '套房'}</div>
                        <h3 class="room-name">${room.name}</h3>
                        <div class="room-features">
                            <span><i class="fas fa-ruler-combined"></i> ${room.size}</span>
                            <span><i class="fas fa-bed"></i> ${room.bed}</span>
                            <span><i class="fas fa-user"></i> 最多${room.guests}人</span>
                        </div>
                        <div class="room-footer">
                            <div class="room-price">
                                <span class="price-original">¥${room.originalPrice}</span>
                                <span class="price-current">¥${room.price}</span>
                                <span class="price-unit">/晚</span>
                            </div>
                            <button class="btn btn-primary" onclick="viewRoomDetail('${room.id}')">
                                查看详情
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        function filterRooms() {
            const typeFilter = document.getElementById('roomTypeFilter').value;
            const priceFilter = document.getElementById('priceFilter').value;
            
            let filtered = roomsData.filter(room => {
                // Type filter
                if (typeFilter !== 'all' && room.type !== typeFilter) return false;
                
                // Price filter
                if (priceFilter !== 'all') {
                    if (priceFilter === '0-500' && room.price >= 500) return false;
                    if (priceFilter === '500-1000' && (room.price < 500 || room.price >= 1000)) return false;
                    if (priceFilter === '1000+' && room.price < 1000) return false;
                }
                
                return true;
            });
            
            const grid = document.getElementById('roomGrid');
            grid.innerHTML = filtered.map(room => createRoomCard(room)).join('');
        }

        function sortRooms() {
            const sortType = document.getElementById('sortFilter').value;
            let sorted = [...roomsData];
            
            if (sortType === 'price-asc') {
                sorted.sort((a, b) => a.price - b.price);
            } else if (sortType === 'price-desc') {
                sorted.sort((a, b) => b.price - a.price);
            }
            
            const grid = document.getElementById('roomGrid');
            grid.innerHTML = sorted.map(room => createRoomCard(room)).join('');
        }

        function searchRooms() {
            const checkIn = document.getElementById('checkInDate').value;
            const checkOut = document.getElementById('checkOutDate').value;
            
            if (!checkIn || !checkOut) {
                showToast('请选择入住和退房日期', 'error');
                return;
            }
            
            if (new Date(checkIn) >= new Date(checkOut)) {
                showToast('退房日期必须晚于入住日期', 'error');
                return;
            }
            
            selectedDates = { checkIn, checkOut };
            
            showToast('正在查询可用客房...', 'info');
            setTimeout(() => {
                filterRooms();
                showToast(`找到 ${roomsData.length} 间可用客房`, 'success');
            }, 500);
        }

        function refreshRooms() {
            showToast('刷新成功', 'success');
            renderRooms();
        }

        function toggleFavorite(btn, roomId) {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showToast('已添加到收藏', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showToast('已取消收藏', 'info');
            }
        }

        // ============================================
        // Room Detail & Booking
        // ============================================
       function viewRoomDetail(roomId) {
    currentRoom = roomsData.find(r => r.id === roomId);
    if (!currentRoom) return;
    
    const modal = document.getElementById('roomModal');
    const title = document.getElementById('roomModalTitle');
    const body = document.getElementById('roomModalBody');
    
    title.textContent = currentRoom.name;
    
    // 确保这个模板字符串完整闭合
    body.innerHTML = `
        <div class="gallery-grid">
            <div class="gallery-main">
                <img src="${currentRoom.gallery[0]}" alt="${currentRoom.name}">
            </div>
            <div class="gallery-thumbs">
                ${currentRoom.gallery.slice(1).map((img, i) => `
                    <div class="gallery-thumb ${i === 1 ? 'more' : ''}">
                        <img src="${img}" alt="">
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <div>
                <h3>${currentRoom.name}</h3>
                <div class="room-features" style="margin-top: 0.5rem;">
                    <span><i class="fas fa-ruler-combined"></i> ${currentRoom.size}</span>
                    <span><i class="fas fa-bed"></i> ${currentRoom.bed}</span>
                    <span><i class="fas fa-user"></i> 最多${currentRoom.guests}人</span>
                </div>
            </div>
            <div class="room-price">
                <span class="price-original">¥${currentRoom.originalPrice}</span>
                <div>
                    <span class="price-current" style="font-size: 2rem;">¥${currentRoom.price}</span>
                    <span class="price-unit">/晚</span>
                </div>
            </div>
        </div>
        
        <p style="color: var(--gray-600); line-height: 1.6; margin-bottom: 1rem;">
            ${currentRoom.description}
        </p>
        
        <h4 style="margin-bottom: 0.75rem;">客房设施</h4>
        <div class="amenities-list">
            ${currentRoom.amenities.map(a => `<span class="amenity-tag"><i class="fas fa-check"></i> ${a}</span>`).join('')}
        </div>
        
        <div class="policy-box">
            <h4><i class="fas fa-info-circle"></i> 预订政策</h4>
            <p>${currentRoom.policy}</p>
        </div>
    `;  // ← 确保这里有闭合的反引号和分号
    
    modal.classList.add('active');
}

function closeRoomModal() {
    document.getElementById('roomModal').classList.remove('active');
}

function proceedToBook() {
    if (!currentRoom) return;
    
    closeRoomModal();
    const modal = document.getElementById('bookingModal');
    const summary = document.getElementById('bookingSummary');
    
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const total = currentRoom.price * nights;
    
    summary.innerHTML = `
        <div class="fee-row">
            <span>房型</span>
            <span>${currentRoom.name}</span>
        </div>
        <div class="fee-row">
            <span>入住日期</span>
            <span>${checkIn}</span>
        </div>
        <div class="fee-row">
            <span>退房日期</span>
            <span>${checkOut}</span>
        </div>
        <div class="fee-row">
            <span>单价</span>
            <span>¥${currentRoom.price} / 晚</span>
        </div>
        <div class="fee-row">
            <span>天数</span>
            <span>${nights} 晚</span>
        </div>
        <div class="fee-row">
            <span>总计</span>
            <span>¥${total}</span>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('active');
}

function submitBooking(event) {
    event.preventDefault();
    showToast('预订成功！', 'success');
    closeBookingModal();
    
    // Add to mock bookings
    const newBooking = {
        id: 'GB' + Date.now(),
        roomId: currentRoom.id,
        roomName: currentRoom.name,
        checkIn: document.getElementById('checkInDate').value,
        checkOut: document.getElementById('checkOutDate').value,
        totalAmount: 0, // Simplified
        status: 'confirmed'
    };
    myBookings.unshift(newBooking);
    updateStats();
    renderMyBookings();
}

function showLookupModal() {
    document.getElementById('lookupModal').classList.add('active');
}

function closeLookupModal() {
    document.getElementById('lookupModal').classList.remove('active');
}

function lookupBooking() {
    const input = document.getElementById('lookupInput').value;
    if (!input) {
        showToast('请输入查询信息', 'error');
        return;
    }
    showToast('查询中...', 'info');
    setTimeout(() => {
        showToast('未找到相关预订', 'error');
    }, 1000);
}

function closeCancellationModal() {
    document.getElementById('cancellationModal').classList.remove('active');
}

function confirmCancellation() {
    showToast('预订已取消', 'success');
    closeCancellationModal();
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateStats() {
    document.getElementById('stat-available').textContent = roomsData.length;
    document.getElementById('stat-booked').textContent = myBookings.length;
}

function renderMyBookings() {
    const tbody = document.getElementById('myBookingsTable');
    if (!tbody) return;
    
    tbody.innerHTML = myBookings.map(b => `
        <tr>
            <td>${b.id}</td>
            <td>${b.roomName}</td>
            <td>${b.checkIn}</td>
            <td>${b.checkOut}</td>
            <td>¥${b.totalAmount}</td>
            <td><span class="status-badge status-${b.status}">${b.status}</span></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="showToast('功能暂未实现', 'info')">取消</button>
            </td>
        </tr>
    `).join('');
}

function filterMyBookings() {
    const status = document.getElementById('bookingStatusFilter').value;
    // Simplified
    renderMyBookings();
}

