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

        const i18n = {
            zh: {
                brand: 'HotelBook 客户预订系统',
                tab_search: '查询预订',
                tab_rooms: '客房预订',
                tab_mybookings: '我的预订',
                lang: '语言',
                hero_copy: '直接选择入住与退房日期，即可享受专属礼遇与优惠。',
                checkin: '入住日期',
                checkout: '退房日期',
                guests: '入住人数',
                guests_1: '1位成人',
                guests_2: '2位成人',
                guests_3: '3位成人',
                guests_4: '4位成人',
                room_type: '房型筛选',
                room_type_all: '全部房型',
                room_type_standard: '标准客房',
                room_type_deluxe: '豪华客房',
                room_type_suite: '套房',
                search_available: '查询空房',
                rooms_title: '可预订客房',
                price_all: '全部价格',
                price_0_500: '¥500以下',
                price_500_1000: '¥500-1000',
                price_1000_plus: '¥1000以上',
                sort_default: '默认排序',
                sort_price_asc: '价格从低到高',
                sort_price_desc: '价格从高到低',
                refresh: '刷新',
                mybookings_title: '我的预订',
                status_all: '全部状态',
                status_confirmed: '已确认',
                status_completed: '已完成',
                status_cancelled: '已取消',
                lookup_other: '查询其他预订',
                th_booking_id: '预订号',
                th_room: '客房信息',
                th_checkin: '入住日期',
                th_checkout: '退房日期',
                th_total: '总价',
                th_status: '状态',
                th_action: '操作',
                stat_available: '可预订客房',
                stat_popular: '本周热门',
                stat_booked: '我的预订',
                stat_saved: '收藏客房',
                help_title: '需要帮助吗？',
                help_text: '我们将竭诚为您提供预订协助与咨询服务。',
                perks_title: '专属礼遇',
                perk_late_checkout: '延迟退房',
                perk_wifi: '高速 Wi‑Fi',
                perk_breakfast: '早餐礼遇',
                room_detail_title: '客房详情',
                close: '关闭',
                book_now: '立即预订',
                booking_form_title: '填写预订信息',
                guest_name: '入住人姓名',
                guest_name_ph: '请输入真实姓名',
                guest_phone: '联系电话',
                guest_email: '电子邮箱',
                arrival_time: '预计到达时间',
                select: '请选择',
                special_requests: '特殊要求',
                special_requests_ph: '如无烟房、高层风景等',
                back: '返回',
                confirm_booking: '确认预订',
                view_detail: '查看详情',
                only_left: '仅剩{count}间',
                up_to_guests: '最多{count}人',
                per_night: '/晚',
                fee_room: '房型',
                fee_checkin: '入住日期',
                fee_checkout: '退房日期',
                fee_price: '单价',
                fee_nights: '天数',
                fee_total: '总计',
                nights: '{count} 晚',
                cancel: '取消',
                toast_select_dates: '请选择入住和退房日期',
                toast_checkout_after: '退房日期必须晚于入住日期',
                toast_searching: '正在查询可用客房...',
                toast_found_rooms: '找到 {count} 间可用客房',
                toast_refresh_success: '刷新成功',
                toast_fav_added: '已添加到收藏',
                toast_fav_removed: '已取消收藏',
                toast_booking_success: '预订成功！',
                toast_enter_lookup: '请输入查询信息',
                toast_lookup_loading: '查询中...',
                toast_lookup_not_found: '未找到相关预订',
                toast_booking_cancelled: '预订已取消',
                toast_not_implemented: '功能暂未实现',
                amenities_title: '客房设施',
                booking_policy_title: '预订政策',
                select_hotel: '选择饭店',
                currency: '港币',
                update_profile: '更新个人资料',
                logout_login: '登出登入',
                account_login: '帐号登入',
                login: '登入',
                forgot_password: '忘记密码？',
                no_account_desc: '还没有帐号？建立帐号，储存您的订单历史记录，享受更快速的结帐体验。',
                create_account: '建立一个帐户',
                username_placeholder: '使用者名称',
                password_placeholder: '密码',
                currency_title: '货币',
                currency_popular: '热门货币',
                currency_hkd: '港币',
                currency_cny: '人民币 (CNY)',
                currency_usd: '美元',
                currency_eur: '欧元',
                currency_gbp: '英镑',
                currency_sgd: '新加坡元 (SGD)',
                currency_aud: '澳币',
                currency_all: '所有货币',
                currency_filter: '筛选',
                currency_jpy: 'JPY - 日元',
                currency_krw: 'KRW - 韩元',
                currency_thb: 'THB - 泰铢',
                currency_myr: 'MYR - 马来西亚林吉特',
                lang_display: '简体中文',
                lang_title: '语言'
            },
            en: {
                brand: 'HotelBook Booking',
                tab_search: 'Search',
                tab_rooms: 'Rooms',
                tab_mybookings: 'My Bookings',
                lang: 'Language',
                hero_copy: 'Select check-in and check-out dates to enjoy exclusive privileges.',
                checkin: 'Check-in',
                checkout: 'Check-out',
                guests: 'Guests',
                guests_1: '1 adult',
                guests_2: '2 adults',
                guests_3: '3 adults',
                guests_4: '4 adults',
                room_type: 'Room Type',
                room_type_all: 'All',
                room_type_standard: 'Standard',
                room_type_deluxe: 'Deluxe',
                room_type_suite: 'Suite',
                search_available: 'Search',
                rooms_title: 'Available Rooms',
                price_all: 'All Prices',
                price_0_500: 'Below ¥500',
                price_500_1000: '¥500-1000',
                price_1000_plus: 'Above ¥1000',
                sort_default: 'Default',
                sort_price_asc: 'Price: Low to High',
                sort_price_desc: 'Price: High to Low',
                refresh: 'Refresh',
                mybookings_title: 'My Bookings',
                status_all: 'All Status',
                status_confirmed: 'Confirmed',
                status_completed: 'Completed',
                status_cancelled: 'Cancelled',
                lookup_other: 'Lookup Booking',
                th_booking_id: 'Booking ID',
                th_room: 'Room',
                th_checkin: 'Check-in',
                th_checkout: 'Check-out',
                th_total: 'Total',
                th_status: 'Status',
                th_action: 'Action',
                stat_available: 'Available',
                stat_popular: 'Popular',
                stat_booked: 'My Bookings',
                stat_saved: 'Saved',
                help_title: 'Need help?',
                help_text: 'We are here to help with booking and inquiries.',
                perks_title: 'Perks',
                perk_late_checkout: 'Late checkout',
                perk_wifi: 'High-speed Wi‑Fi',
                perk_breakfast: 'Breakfast',
                room_detail_title: 'Room Details',
                close: 'Close',
                book_now: 'Book Now',
                booking_form_title: 'Booking Details',
                guest_name: 'Guest Name',
                guest_name_ph: 'Enter your name',
                guest_phone: 'Phone',
                guest_email: 'Email',
                arrival_time: 'Arrival Time',
                select: 'Select',
                special_requests: 'Special Requests',
                special_requests_ph: 'e.g. non-smoking, high floor',
                back: 'Back',
                confirm_booking: 'Confirm',
                view_detail: 'View',
                only_left: 'Only {count} left',
                up_to_guests: 'Up to {count} guests',
                per_night: '/night',
                fee_room: 'Room',
                fee_checkin: 'Check-in',
                fee_checkout: 'Check-out',
                fee_price: 'Rate',
                fee_nights: 'Nights',
                fee_total: 'Total',
                nights: '{count} nights',
                cancel: 'Cancel',
                toast_select_dates: 'Please select check-in and check-out dates',
                toast_checkout_after: 'Check-out must be later than check-in',
                toast_searching: 'Searching available rooms...',
                toast_found_rooms: 'Found {count} available rooms',
                toast_refresh_success: 'Refreshed',
                toast_fav_added: 'Added to favorites',
                toast_fav_removed: 'Removed from favorites',
                toast_booking_success: 'Booking successful!',
                toast_enter_lookup: 'Please enter lookup info',
                toast_lookup_loading: 'Searching...',
                toast_lookup_not_found: 'No booking found',
                toast_booking_cancelled: 'Booking cancelled',
                toast_not_implemented: 'Not implemented yet',
                amenities_title: 'Amenities',
                booking_policy_title: 'Booking Policy',
                select_hotel: 'Select Hotel',
                currency: 'HKD',
                update_profile: 'Update Profile',
                logout_login: 'Logout / Login',
                account_login: 'Account Login',
                login: 'Login',
                forgot_password: 'Forgot Password?',
                no_account_desc: 'Don\'t have an account? Create one to store your booking history and enjoy faster checkout.',
                create_account: 'Create an Account',
                username_placeholder: 'Username',
                password_placeholder: 'Password',
                currency_title: 'Currency',
                currency_popular: 'POPULAR CURRENCIES',
                currency_hkd: 'HKD',
                currency_cny: 'CNY',
                currency_usd: 'USD',
                currency_eur: 'EUR',
                currency_gbp: 'GBP',
                currency_sgd: 'SGD',
                currency_aud: 'AUD',
                currency_all: 'ALL CURRENCIES',
                currency_filter: 'Filter',
                currency_jpy: 'JPY',
                currency_krw: 'KRW',
                currency_thb: 'THB',
                currency_myr: 'MYR',
                lang_display: 'English - UK',
                lang_title: 'Language'
            }
        };

        let currentLang = localStorage.getItem('lang') || 'zh';

        function t(key, params = {}) {
            const dict = i18n[currentLang] || i18n.zh;
            const raw = dict[key] ?? i18n.zh[key] ?? key;
            return String(raw).replace(/\{(\w+)\}/g, (_, k) => (params[k] ?? `{${k}}`));
        }

        function applyI18n(lang) {
            currentLang = lang === 'en' ? 'en' : 'zh';
            localStorage.setItem('lang', currentLang);
            document.documentElement.setAttribute('data-lang', currentLang);
            document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const k = el.getAttribute('data-i18n');
                if (k) el.textContent = t(k);
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const k = el.getAttribute('data-i18n-placeholder');
                if (k) el.setAttribute('placeholder', t(k));
            });

            renderRooms();
            renderMyBookings();
        }

        function setTheme(theme) {
            const next = theme === 'dark' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        }

        function mountThemeToggle() {
            const mount = document.getElementById('themeToggleMount');
            if (!mount) return;
            mount.innerHTML = '';
            const savedTheme = localStorage.getItem('theme') || 'light';
            setTheme(savedTheme);
            const btn = document.createElement('theme-button');
            btn.setAttribute('value', savedTheme);
            btn.setAttribute('id', 'theme-toggle');
            btn.setAttribute('size', '0.8');
            btn.addEventListener('change', (e) => setTheme(e.detail));
            mount.appendChild(btn);
        }

        function initHeaderControls() {
            mountThemeToggle();
            const langSelect = document.getElementById('langSelect');
            if (langSelect) {
                langSelect.value = currentLang;
                langSelect.addEventListener('change', (e) => applyI18n(e.target.value));
            }
            applyI18n(currentLang);
        }

        // ============================================
        // Initialization
        // ============================================
        document.addEventListener('DOMContentLoaded', function() {
            initHeaderControls();
            // Set default dates
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const formatDateInput = (date) => date.toISOString().split('T')[0];
            
            document.getElementById('checkInDate').value = formatDateInput(today);
            document.getElementById('checkOutDate').value = formatDateInput(tomorrow);

            const storedSearch = sessionStorage.getItem('bookingSearch');
            if (storedSearch) {
                try {
                    const { checkIn, checkOut, guests } = JSON.parse(storedSearch);
                    if (checkIn) document.getElementById('checkInDate').value = checkIn;
                    if (checkOut) document.getElementById('checkOutDate').value = checkOut;
                    if (guests && document.getElementById('guestCount')) {
                        document.getElementById('guestCount').value = String(guests);
                    }
                    selectedDates = { checkIn: checkIn || '', checkOut: checkOut || '' };
                } catch (e) {
                }
                sessionStorage.removeItem('bookingSearch');
            }
            
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

        let currentCurrency = 'CNY';
        const exchangeRates = {
            'CNY': 1,
            'HKD': 1.1,
            'USD': 0.14,
            'EUR': 0.13,
            'GBP': 0.11,
            'SGD': 0.19,
            'AUD': 0.21,
            'JPY': 21.0,
            'KRW': 188.0,
            'THB': 5.0,
            'MYR': 0.66
        };
        const currencySymbols = {
            'CNY': '¥',
            'HKD': 'HK$',
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'SGD': 'S$',
            'AUD': 'A$',
            'JPY': '¥',
            'KRW': '₩',
            'THB': '฿',
            'MYR': 'RM'
        };

        function formatPrice(price) {
            const rate = exchangeRates[currentCurrency] || 1;
            const symbol = currencySymbols[currentCurrency] || '¥';
            const converted = price * rate;
            
            // JPY and KRW usually don't show decimals
            if (currentCurrency === 'JPY' || currentCurrency === 'KRW') {
                return `${symbol}${Math.round(converted).toLocaleString()}`;
            }
            return `${symbol}${converted.toFixed(2)}`;
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
                            ${room.available < 5 ? `<span class="room-badge badge-limited">${t('only_left', { count: room.available })}</span>` : ''}
                        </div>
                        <button class="room-favorite" onclick="toggleFavorite(this, '${room.id}')">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    <div class="room-content">
                        <div class="room-type">${room.type === 'standard' ? t('room_type_standard') : room.type === 'deluxe' ? t('room_type_deluxe') : t('room_type_suite')}</div>
                        <h3 class="room-name">${room.name}</h3>
                        <div class="room-features">
                            <span><i class="fas fa-ruler-combined"></i> ${room.size}</span>
                            <span><i class="fas fa-bed"></i> ${room.bed}</span>
                            <span><i class="fas fa-user"></i> ${t('up_to_guests', { count: room.guests })}</span>
                        </div>
                        <div class="room-footer">
                            <div class="room-price">
                                <span class="price-original">${formatPrice(room.originalPrice)}</span>
                                <span class="price-current">${formatPrice(room.price)}</span>
                                <span class="price-unit">${t('per_night')}</span>
                            </div>
                            <button class="btn btn-primary" onclick="viewRoomDetail('${room.id}')">
                                ${t('view_detail')}
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
                showToast(t('toast_select_dates'), 'error');
                return;
            }
            
            if (new Date(checkIn) >= new Date(checkOut)) {
                showToast(t('toast_checkout_after'), 'error');
                return;
            }
            
            selectedDates = { checkIn, checkOut };
            
            showToast(t('toast_searching'), 'info');
            setTimeout(() => {
                filterRooms();
                showToast(t('toast_found_rooms', { count: roomsData.length }), 'success');
            }, 500);
        }

        function refreshRooms() {
            showToast(t('toast_refresh_success'), 'success');
            renderRooms();
        }

        function toggleFavorite(btn, roomId) {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showToast(t('toast_fav_added'), 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showToast(t('toast_fav_removed'), 'info');
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
                    <span><i class="fas fa-user"></i> ${t('up_to_guests', { count: currentRoom.guests })}</span>
                </div>
            </div>
            <div class="room-price">
                <span class="price-original">¥${currentRoom.originalPrice}</span>
                <div>
                    <span class="price-current" style="font-size: 2rem;">¥${currentRoom.price}</span>
                    <span class="price-unit">${t('per_night')}</span>
                </div>
            </div>
        </div>
        
        <p style="color: var(--gray-600); line-height: 1.6; margin-bottom: 1rem;">
            ${currentRoom.description}
        </p>
        
        <h4 style="margin-bottom: 0.75rem;">${t('amenities_title')}</h4>
        <div class="amenities-list">
            ${currentRoom.amenities.map(a => `<span class="amenity-tag"><i class="fas fa-check"></i> ${a}</span>`).join('')}
        </div>
        
        <div class="policy-box">
            <h4><i class="fas fa-info-circle"></i> ${t('booking_policy_title')}</h4>
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
            <span>${t('fee_room')}</span>
            <span>${currentRoom.name}</span>
        </div>
        <div class="fee-row">
            <span>${t('fee_checkin')}</span>
            <span>${checkIn}</span>
        </div>
        <div class="fee-row">
            <span>${t('fee_checkout')}</span>
            <span>${checkOut}</span>
        </div>
        <div class="fee-row">
            <span>${t('fee_price')}</span>
            <span>¥${currentRoom.price} ${t('per_night')}</span>
        </div>
        <div class="fee-row">
            <span>${t('fee_nights')}</span>
            <span>${t('nights', { count: nights })}</span>
        </div>
        <div class="fee-row">
            <span>${t('fee_total')}</span>
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
    showToast(t('toast_booking_success'), 'success');
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
        showToast(t('toast_enter_lookup'), 'error');
        return;
    }
    showToast(t('toast_lookup_loading'), 'info');
    setTimeout(() => {
        showToast(t('toast_lookup_not_found'), 'error');
    }, 1000);
}

function closeCancellationModal() {
    document.getElementById('cancellationModal').classList.remove('active');
}

function confirmCancellation() {
    showToast(t('toast_booking_cancelled'), 'success');
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
            <td>${formatPrice(b.totalAmount)}</td>
            <td><span class="status-badge status-${b.status}">${b.status === 'confirmed' ? t('status_confirmed') : b.status === 'completed' ? t('status_completed') : b.status === 'cancelled' ? t('status_cancelled') : b.status}</span></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="showToast(t('toast_not_implemented'), 'info')">${t('cancel')}</button>
            </td>
        </tr>
    `).join('');
}

function filterMyBookings() {
    const status = document.getElementById('bookingStatusFilter').value;
    // Simplified
    renderMyBookings();
}

// User Authentication & Dropdown Logic
document.addEventListener('DOMContentLoaded', () => {
    // --- Lang Logic ---
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const closeLangBtn = document.getElementById('closeLangBtn');
    
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            langDropdown.style.display = langDropdown.style.display === 'flex' ? 'none' : 'flex';
            if (userDropdown) userDropdown.style.display = 'none';
            if (currencyDropdown) currencyDropdown.style.display = 'none';
        });
        
        if (closeLangBtn) {
            closeLangBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.style.display = 'none';
            });
        }
        
        langDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        const langItems = document.querySelectorAll('.lang-item');
        langItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const nextLang = e.currentTarget.getAttribute('data-lang');
                if (nextLang === 'zh' || nextLang === 'en') {
                    // Update active state
                    langItems.forEach(i => i.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    
                    // Switch lang
                    currentLang = nextLang;
                    localStorage.setItem('lang', currentLang);
                    document.documentElement.setAttribute('lang', currentLang === 'zh' ? 'zh-CN' : 'en');
                    document.documentElement.setAttribute('data-lang', currentLang);
                    applyI18n();
                    
                    // Update text node while keeping chevron
                    const span = langBtn.querySelector('span');
                    if(span) span.textContent = currentLang === 'zh' ? '简体中文' : 'English - UK';
                    
                    langDropdown.style.display = 'none';
                } else {
                    showToast('暂不支持此语言', 'info');
                }
            });
        });
    }

    // --- Currency Logic ---
    const currencyBtn = document.getElementById('currencyBtn');
    const currencyDropdown = document.getElementById('currencyDropdown');
    const closeCurrencyBtn = document.getElementById('closeCurrencyBtn');
    
    if (currencyBtn && currencyDropdown) {
        currencyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currencyDropdown.style.display = currencyDropdown.style.display === 'flex' ? 'none' : 'flex';
            if (userDropdown) userDropdown.style.display = 'none'; // Close user dropdown if open
            if (langDropdown) langDropdown.style.display = 'none';
        });
        
        if (closeCurrencyBtn) {
            closeCurrencyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currencyDropdown.style.display = 'none';
            });
        }
        
        currencyDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Handle currency selection
        const currencyItems = document.querySelectorAll('.currency-item');
        currencyItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                // Update active state
                currencyItems.forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Update current currency
                currentCurrency = e.currentTarget.getAttribute('data-currency');
                
                // Update button text
                const currencyName = e.currentTarget.getAttribute('data-i18n') ? 
                    t(e.currentTarget.getAttribute('data-i18n')) : 
                    e.currentTarget.textContent;
                
                // Replace text node but keep the icon
                const span = currencyBtn.querySelector('span');
                if(span) span.textContent = currencyName;
                
                // Close dropdown
                currencyDropdown.style.display = 'none';
                
                // Optional: Update prices across the site based on rate
                renderRooms(); // Re-render rooms to update prices
                renderMyBookings(); // Re-render bookings to update prices
                
                showToast(`已切换至 ${currencyName}`, 'success');
            });
        });
    }

    // --- User Logic ---
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const loggedInContainer = document.getElementById('loggedInContainer');
    const closeLoginBtn = document.getElementById('closeLoginBtn');
    const dropdownLoginBtn = document.getElementById('dropdownLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    function checkLoginState() {
        const username = sessionStorage.getItem('username');
        if (username) {
            loginFormContainer.style.display = 'none';
            loggedInContainer.style.display = 'block';
        } else {
            loginFormContainer.style.display = 'block';
            loggedInContainer.style.display = 'none';
        }
    }
    
    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        checkLoginState();
        userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
        if (currencyDropdown) currencyDropdown.style.display = 'none'; // Close currency dropdown if open
        if (langDropdown) langDropdown.style.display = 'none';
    });
    
    closeLoginBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.style.display = 'none';
    });
    
    document.addEventListener('click', (e) => {
        if (userBtn && userDropdown && !userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.style.display = 'none';
        }
        if (currencyBtn && currencyDropdown && !currencyBtn.contains(e.target) && !currencyDropdown.contains(e.target)) {
            currencyDropdown.style.display = 'none';
        }
        if (langBtn && langDropdown && !langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.style.display = 'none';
        }
    });
    
    userDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    dropdownLoginBtn.addEventListener('click', () => {
        const usernameInput = document.getElementById('dropdownUsername').value;
        const passwordInput = document.getElementById('dropdownPassword').value;
        
        if (usernameInput && passwordInput) {
            sessionStorage.setItem('username', usernameInput);
            showToast('登录成功', 'success');
            checkLoginState();
            setTimeout(() => {
                userDropdown.style.display = 'none';
            }, 1000);
        } else {
            showToast('请输入用户名和密码', 'error');
        }
    });
    
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        showToast('已登出', 'success');
        checkLoginState();
        setTimeout(() => {
            userDropdown.style.display = 'none';
        }, 1000);
    });
});
