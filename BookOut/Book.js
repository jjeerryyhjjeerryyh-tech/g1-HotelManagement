        // ============================================
        // Mock Data
        // ============================================
        const roomsData = [
            {
                id: 'R001',
                type: 'standard',
                name: {
                    zh: '舒适标准间',
                    en: 'Comfort Standard Room',
                    fr: 'Chambre Standard Confort',
                    ja: 'コンフォート標準客室'
                },
                description: {
                    zh: '温馨舒适的标准客房，配备高品质床品和现代化设施，是商务出行和休闲旅行的理想选择。',
                    en: 'Warm and comfortable standard guest room, equipped with high-quality bedding and modern facilities, an ideal choice for business and leisure travel.',
                    fr: 'Chambre standard chaleureuse et confortable, équipée d\'une literie de haute qualité et d\'installations modernes, un choix idéal pour les voyages d\'affaires et de loisirs.',
                    ja: '温かみのある快適な標準客室。高品質な寝具と最新設備を備え、ビジネスやレジャーに最適です。'
                },
                price: 588,
                originalPrice: 688,
                size: '28㎡',
                bed: {
                    zh: '大床/双床',
                    en: 'King / Twin Bed',
                    fr: 'Grand Lit / Lits Jumeaux',
                    ja: 'キング / ツインベッド'
                },
                guests: 2,
                image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'
                ],
                amenities: {
                    zh: ['免费WiFi', '空调', '液晶电视', '迷你吧', '保险箱', '24小时热水'],
                    en: ['Free WiFi', 'AC', 'LCD TV', 'Minibar', 'Safe', '24h Hot Water'],
                    fr: ['WiFi Gratuit', 'Climatisation', 'TV LCD', 'Minibar', 'Coffre-fort', 'Eau chaude 24h/24'],
                    ja: ['無料WiFi', 'エアコン', '液晶テレビ', 'ミニバー', '金庫', '24時間お湯']
                },
                policy: {
                    zh: '入住前48小时可免费取消',
                    en: 'Free cancellation up to 48 hours before check-in',
                    fr: 'Annulation gratuite jusqu\'à 48h avant l\'arrivée',
                    ja: 'チェックインの48時間前までキャンセル無料'
                },
                available: 8
            },
            {
                id: 'R002',
                type: 'deluxe',
                name: {
                    zh: '豪华海景房',
                    en: 'Deluxe Ocean View Room',
                    fr: 'Chambre Deluxe Vue Mer',
                    ja: 'デラックスオーシャンビュールーム'
                },
                description: {
                    zh: '宽敞明亮的豪华客房，拥有绝佳海景视野，配备高端家具和豪华浴室设施。',
                    en: 'Spacious and bright deluxe guest room with excellent ocean views, equipped with high-end furniture and luxury bathroom facilities.',
                    fr: 'Chambre deluxe spacieuse et lumineuse avec une vue imprenable sur l\'océan, équipée de meubles haut de gamme et d\'installations de salle de bain de luxe.',
                    ja: '広々として明るいデラックスルーム。絶好のオーシャンビューを楽しめ、高級家具と豪華なバスルームを備えています。'
                },
                price: 988,
                originalPrice: 1288,
                size: '45㎡',
                bed: {
                    zh: '特大床',
                    en: 'Super King Bed',
                    fr: 'Lit Super King',
                    ja: 'スーパーキングベッド'
                },
                guests: 2,
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
                ],
                amenities: {
                    zh: ['免费WiFi', '海景阳台', '浴缸', 'Nespresso咖啡机', '浴袍拖鞋', '行政礼遇'],
                    en: ['Free WiFi', 'Sea View Balcony', 'Bathtub', 'Nespresso', 'Bathrobes', 'Executive Perks'],
                    fr: ['WiFi Gratuit', 'Balcon Vue Mer', 'Baignoire', 'Nespresso', 'Peignoirs', 'Privilèges Exécutifs'],
                    ja: ['無料WiFi', 'オーシャンビューバルコニー', '浴槽', 'ネスプレッソ', 'バスローブ', 'エグゼクティブ特典']
                },
                policy: {
                    zh: '入住前72小时可免费取消',
                    en: 'Free cancellation up to 72 hours before check-in',
                    fr: 'Annulation gratuite jusqu\'à 72h avant l\'arrivée',
                    ja: 'チェックインの72時間前までキャンセル無料'
                },
                available: 5
            },
            {
                id: 'R003',
                type: 'suite',
                name: {
                    zh: '行政套房',
                    en: 'Executive Suite',
                    fr: 'Suite Exécutive',
                    ja: 'エグゼクティブスイート'
                },
                description: {
                    zh: '奢华宽敞的行政套房，独立客厅和卧室设计，尊享行政酒廊待遇和专属管家服务。',
                    en: 'Luxurious and spacious executive suite, independent living room and bedroom design, exclusive executive lounge treatment and butler service.',
                    fr: 'Suite exécutive luxueuse et spacieuse, conception de salon et chambre indépendants, traitement exclusif au salon exécutif et service de majordome.',
                    ja: '豪華で広々としたエグゼクティブスイート。独立したリビングと寝室、エグゼクティブラウンジ特典和専属バトラーサービスをご利用いただけます。'
                },
                price: 1888,
                originalPrice: 2388,
                size: '75㎡',
                bed: {
                    zh: '特大床',
                    en: 'Super King Bed',
                    fr: 'Lit Super King',
                    ja: 'スーパーキングベッド'
                },
                guests: 3,
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
                ],
                amenities: {
                    zh: ['全景落地窗', '独立客厅', '按摩浴缸', '厨房设施', '专属管家', '行政酒廊'],
                    en: ['Floor-to-ceiling Windows', 'Living Room', 'Jacuzzi', 'Kitchen', 'Butler Service', 'Executive Lounge'],
                    fr: ['Baies vitrées', 'Salon indépendant', 'Jacuzzi', 'Cuisine', 'Majordome', 'Salon Exécutif'],
                    ja: ['床から天井までの窓', '独立したリビング', 'ジャグジー', 'キッチン', 'バトラーサービス', 'エグゼクティブラウンジ']
                },
                policy: {
                    zh: '入住前72小时可免费取消',
                    en: 'Free cancellation up to 72 hours before check-in',
                    fr: 'Annulation gratuite jusqu\'à 72h avant l\'arrivée',
                    ja: 'チェックインの72時間前までキャンセル無料'
                },
                available: 3
            },
            {
                id: 'R004',
                type: 'standard',
                name: {
                    zh: '商务双床房',
                    en: 'Business Twin Room',
                    fr: 'Chambre Affaires à Deux Lits',
                    ja: 'ビジネスツインルーム'
                },
                description: {
                    zh: '专为商务人士设计，配备宽敞工作区域和高速网络，让工作效率倍增。',
                    en: 'Designed for business professionals, equipped with a spacious work area and high-speed network to increase work efficiency.',
                    fr: 'Conçu pour les professionnels des affaires, équipé d\'un espace de travail spacieux et d\'un réseau haut débit pour accroître l\'efficacité du travail.',
                    ja: 'ビジネスプロフェッショナル向けに設計され、広々としたワークエリアと高速ネットワークを備え、業務効率を高めます。'
                },
                price: 628,
                originalPrice: 728,
                size: '32㎡',
                bed: {
                    zh: '双床',
                    en: 'Twin Bed',
                    fr: 'Lits Jumeaux',
                    ja: 'ツインベッド'
                },
                guests: 2,
                image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
                ],
                amenities: {
                    zh: ['免费WiFi', '办公桌', '人体工学椅', '打印机', '咖啡机', '熨烫设施'],
                    en: ['Free WiFi', 'Work Desk', 'Ergonomic Chair', 'Printer', 'Coffee Maker', 'Ironing'],
                    fr: ['WiFi Gratuit', 'Bureau', 'Chaise Ergonomique', 'Imprimante', 'Cafetière', 'Repassage'],
                    ja: ['無料WiFi', 'デスク', '人間工学椅子', 'プリンター', 'コーヒーメーカー', 'アイロン設備']
                },
                policy: {
                    zh: '入住前48小时可免费取消',
                    en: 'Free cancellation up to 48 hours before check-in',
                    fr: 'Annulation gratuite jusqu\'à 48h avant l\'arrivée',
                    ja: 'チェックインの48時間前までキャンセル無料'
                },
                available: 12
            },
            {
                id: 'R005',
                type: 'suite',
                name: {
                    zh: '总统套房',
                    en: 'Presidential Suite',
                    fr: 'Suite Présidentielle',
                    ja: 'ロイヤルスイートルーム'
                },
                description: {
                    zh: '酒店最顶级的住宿体验，360度城市全景，私人电梯直达，尽享尊贵奢华。',
                    en: 'The hotel\'s top-tier accommodation experience, 360-degree city panorama, private elevator direct access, enjoying noble luxury.',
                    fr: 'L\'expérience d\'hébergement haut de gamme de l\'hôtel, panorama urbain à 360 degrés, accès direct par ascenseur privé, profitant d\'un luxe noble.',
                    ja: 'ホテルの最高級宿泊体験。360度のパノラマビュー、専用エレベーター直通、至高のラグジュアリーをお楽しみください。'
                },
                price: 8888,
                originalPrice: 12888,
                size: '200㎡',
                bed: {
                    zh: '特大床',
                    en: 'Super King Bed',
                    fr: 'Lit Super King',
                    ja: 'スーパーキングベッド'
                },
                guests: 4,
                image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
                ],
                amenities: {
                    zh: ['私人电梯', '私人管家', '会议室', '厨房', '私人SPA', '直升机接送'],
                    en: ['Private Elevator', 'Butler', 'Meeting Room', 'Kitchen', 'Private SPA', 'Helicopter'],
                    fr: ['Ascenseur Privé', 'Majordome', 'Salle de réunion', 'Cuisine', 'SPA Privé', 'Hélicoptère'],
                    ja: ['専用エレベーター', '専用バトラー', '会議室', 'キッチン', '専用SPA', 'ヘリコプター送迎']
                },
                policy: {
                    zh: '入住前7天可免费取消',
                    en: 'Free cancellation up to 7 days before check-in',
                    fr: 'Annulation gratuite jusqu\'à 7 jours avant l\'arrivée',
                    ja: 'チェックインの7日前までキャンセル無料'
                },
                available: 1
            },
            {
                id: 'R006',
                type: 'deluxe',
                name: {
                    zh: '花园景观房',
                    en: 'Garden View Room',
                    fr: 'Chambre Vue Jardin',
                    ja: 'ガーデンビュールーム'
                },
                description: {
                    zh: '静谧优雅的花园景观客房，远离城市喧嚣，享受自然清新的居住环境。',
                    en: 'Quiet and elegant garden view guest room, away from the hustle and bustle of the city, enjoying a natural and fresh living environment.',
                    fr: 'Chambre vue jardin calme et élégante, loin de l\'agitation de la ville, profitant d\'un environnement de vie naturel et frais.',
                    ja: '静かで優雅なガーデンビュールーム。都会の喧騒から離れ、自然豊かで爽やかな居住環境をお楽しみいただけます。'
                },
                price: 788,
                originalPrice: 988,
                size: '38㎡',
                bed: {
                    zh: '大床',
                    en: 'King Bed',
                    fr: 'Grand Lit',
                    ja: 'キングベッド'
                },
                guests: 2,
                image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
                gallery: [
                    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
                ],
                amenities: {
                    zh: ['花园景观', '私人阳台', '户外座椅', '茶具套装', '瑜伽垫', '浴盐'],
                    en: ['Garden View', 'Balcony', 'Outdoor Seating', 'Tea Set', 'Yoga Mat', 'Bath Salt'],
                    fr: ['Vue Jardin', 'Balcon Privé', 'Sièges extérieurs', 'Service à thé', 'Tapis de Yoga', 'Sels de bain'],
                    ja: ['ガーデンビュー', '専用バルコニー', '屋外席', 'ティーセット', 'ヨガマット', 'バスソルト']
                },
                policy: {
                    zh: '入住前48小时可免费取消',
                    en: 'Free cancellation up to 48 hours before check-in',
                    fr: 'Annulation gratuite jusqu\'à 48h avant l\'arrivée',
                    ja: 'チェックインの48時間前までキャンセル無料'
                },
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
                tab_mybookings: '我的订单',
                hotel_name: '91酒店',
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
                mybookings_title: '我的订单',
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
                stat_booked: '我的订单',
                stat_saved: '收藏客房',
                help_title: '需要帮助吗？',
                help_text: '我们将竭诚为您提供预订协助与咨询服务。',
                perks_title: '专属礼遇',
                perk_late_checkout: '延迟退房',
                perk_wifi: '高速 Wi‑Fi',
                perk_breakfast: '早餐礼遇',
                room_detail_title: '客房详情',
                reviews_title: '住客评价',
                no_reviews: '暂无评价',
                no_description: '暂无详细描述。',
                load_reviews_failed: '加载评价失败',
                loading: '加载中...',
                count_reviews: '{count}条评价',
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
                toast_lookup_not_found: '未找到订单',
                toast_booking_cancelled: '订单已取消',
                toast_not_implemented: '功能暂未实现',
                toast_currency_changed: '已切换至 {name}',
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
                lang_title: '语言',
                nav_notifications: '消息提醒',
                section_connect: '畅享沟通',
                connect_desc: '订阅酒店电子报，第一时间获取专属优惠、旅行灵感以及精彩活动资讯。',
                subscribe_placeholder: '输入您的邮箱地址',
                subscribe_btn: '注册',
                subscribe_success: '已订阅: {email}',
                subscribe_thanks: '感谢您的订阅！',
                subscribe_success_msg: '您将第一时间收到我们的最新资讯和专属优惠。',
                footer_guest_center: '环球宾客中心',
                footer_guest_booking: '客房预订与咨询',
                footer_guest_membership: '会员权益说明',
                footer_guest_transport: '交通与周边',
                footer_group: 'XX酒店集团',
                footer_about: '关于我们',
                footer_services: '住宿服务',
                footer_food: '餐饮美食',
                footer_contact: '联系我们',
                footer_media: '媒体',
                footer_newsroom: '新闻中心',
                footer_media_contact: '媒体联系人',
                footer_brand_assets: '品牌资料',
                footer_corporate: '企业',
                footer_meetings: '会议与宴会',
                footer_sustainability: '可持续发展',
                footer_careers: '招聘与工作',
                footer_suppliers: '供应商合作',
                footer_copyright: '© 2026 XX酒店',
                footer_privacy: '隐私政策',
                footer_terms: '条款与条件',
                footer_cookie: 'Cookie 设置',
                footer_lang: '语言',
                lang_link_zh: '中文',
                lang_link_en: 'English'
            },
            en: {
                brand: 'HotelBook Booking',
                tab_search: 'Search',
                tab_rooms: 'Rooms',
                tab_mybookings: 'My Bookings',
                hotel_name: '91 Hotel',
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
                reviews_title: 'Guest Reviews',
                no_reviews: 'No reviews yet',
                no_description: 'No description available.',
                load_reviews_failed: 'Failed to load reviews',
                loading: 'Loading...',
                count_reviews: '{count} reviews',
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
                toast_currency_changed: 'Switched to {name}',
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
                lang_title: 'Language',
                nav_notifications: 'Notifications',
                section_connect: 'Stay Connected',
                connect_desc: 'Subscribe to our newsletter for exclusive offers, travel inspiration, and event highlights.',
                subscribe_placeholder: 'Enter your email address',
                subscribe_btn: 'Subscribe',
                subscribe_success: 'Subscribed: {email}',
                subscribe_thanks: 'Thank You for Subscribing!',
                subscribe_success_msg: 'You will be the first to receive our latest updates and exclusive offers.',
                footer_guest_center: 'Global Guest Center',
                footer_guest_booking: 'Room Reservations',
                footer_guest_membership: 'Membership Benefits',
                footer_guest_transport: 'Transport & Surrounding',
                footer_group: 'XX Hotel Group',
                footer_about: 'About Us',
                footer_services: 'Stay Services',
                footer_food: 'Dining',
                footer_contact: 'Contact Us',
                footer_media: 'Media',
                footer_newsroom: 'Newsroom',
                footer_media_contact: 'Media Contacts',
                footer_brand_assets: 'Brand Assets',
                footer_corporate: 'Corporate',
                footer_meetings: 'Meetings & Events',
                footer_sustainability: 'Sustainability',
                footer_careers: 'Careers',
                footer_suppliers: 'Suppliers',
                footer_copyright: '© 2026 XX Hotel',
                footer_privacy: 'Privacy Policy',
                footer_terms: 'Terms & Conditions',
                footer_cookie: 'Cookie Settings',
                footer_lang: 'Language',
                lang_link_zh: 'Chinese',
                lang_link_en: 'English'
            },
            fr: {
                brand: 'Réservation HotelBook',
                tab_search: 'Recherche',
                tab_rooms: 'Chambres',
                tab_mybookings: 'Mes Réservations',
                hotel_name: '91 Hôtel',
                lang: 'Langue',
                hero_copy: 'Sélectionnez vos dates pour profiter de privilèges exclusifs.',
                checkin: 'Arrivée',
                checkout: 'Départ',
                guests: 'Clients',
                guests_1: '1 adulte',
                guests_2: '2 adultes',
                guests_3: '3 adultes',
                guests_4: '4 adultes',
                room_type: 'Type de chambre',
                room_type_all: 'Tous',
                room_type_standard: 'Standard',
                room_type_deluxe: 'Luxe',
                room_type_suite: 'Suite',
                search_available: 'Chercher',
                rooms_title: 'Chambres Disponibles',
                price_all: 'Tous les prix',
                price_0_500: 'Moins de ¥500',
                price_500_1000: '¥500-1000',
                price_1000_plus: 'Plus de ¥1000',
                sort_default: 'Par défaut',
                sort_price_asc: 'Prix: Croissant',
                sort_price_desc: 'Prix: Décroissant',
                refresh: 'Actualiser',
                mybookings_title: 'Mes Réservations',
                status_all: 'Tous les statuts',
                status_confirmed: 'Confirmé',
                status_completed: 'Terminé',
                status_cancelled: 'Annulé',
                lookup_other: 'Chercher une réservation',
                th_booking_id: 'ID Réservation',
                th_room: 'Chambre',
                th_checkin: 'Arrivée',
                th_checkout: 'Départ',
                th_total: 'Total',
                th_status: 'Statut',
                th_action: 'Action',
                help_title: 'Besoin d\'aide ?',
                help_text: 'Nous sommes là pour vous aider.',
                perks_title: 'Privilèges',
                perk_late_checkout: 'Départ tardif',
                perk_wifi: 'Wi‑Fi haut débit',
                perk_breakfast: 'Petit-déjeuner',
                room_detail_title: 'Détails de la chambre',
                reviews_title: 'Avis des clients',
                no_reviews: 'Pas encore d\'avis',
                loading: 'Chargement...',
                count_reviews: '{count} avis',
                close: 'Fermer',
                book_now: 'Réserver maintenant',
                booking_form_title: 'Détails de la réservation',
                guest_name: 'Nom du client',
                guest_name_ph: 'Entrez votre nom',
                guest_phone: 'Téléphone',
                guest_email: 'E-mail',
                arrival_time: 'Heure d\'arrivée',
                select: 'Sélectionner',
                special_requests: 'Demandes spéciales',
                back: 'Retour',
                confirm_booking: 'Confirmer',
                view_detail: 'Voir',
                only_left: 'Plus que {count}',
                up_to_guests: 'Jusqu\'à {count} personnes',
                per_night: '/nuit',
                fee_room: 'Chambre',
                fee_checkin: 'Arrivée',
                fee_checkout: 'Départ',
                fee_price: 'Prix',
                fee_nights: 'Nuits',
                fee_total: 'Total',
                nights: '{count} nuits',
                cancel: 'Annuler',
                toast_select_dates: 'Veuillez sélectionner les dates',
                toast_checkout_after: 'Le départ doit être après l\'arrivée',
                toast_searching: 'Recherche en cours...',
                toast_found_rooms: '{count} chambres trouvées',
                toast_refresh_success: 'Actualisé',
                toast_booking_success: 'Réservation réussie !',
                toast_currency_changed: 'Changé en {name}',
                lang_display: 'Français',
                lang_title: 'Langue',
                section_connect: 'Restez Connecté',
                subscribe_placeholder: 'Votre adresse e-mail',
                subscribe_btn: 'S\'abonner',
                subscribe_thanks: 'Merci pour votre abonnement !',
                footer_copyright: '© 2026 91 Hôtel',
                back: 'Retour',
                footer_guest_center: 'Centre de services',
                footer_guest_booking: 'Réservations et demandes',
                footer_guest_membership: 'Avantages membres',
                footer_guest_transport: 'Transport et environs',
                footer_group: 'Groupe 91 Hôtel',
                footer_about: 'À propos de nous',
                footer_services: 'Services d\'hébergement',
                footer_food: 'Gastronomie',
                footer_contact: 'Contactez-nous',
                footer_media: 'Médias',
                footer_newsroom: 'Salle de presse',
                footer_media_contact: 'Contact média',
                footer_brand_assets: 'Ressources de marque',
                footer_corporate: 'Entreprise',
                footer_meetings: 'Réunions et banquets',
                footer_sustainability: 'Développement durable',
                footer_careers: 'Carrières',
                footer_suppliers: 'Fournisseurs',
                footer_privacy: 'Politique de confidentialité',
                footer_terms: 'Conditions générales',
                footer_cookie: 'Paramètres des cookies',
                footer_lang: 'Langue',
                section_connect: 'Restez Connecté',
                connect_desc: 'Inscrivez-vous à notre newsletter pour recevoir des offres exclusives et des inspirations de voyage.',
                subscribe_thanks: 'Merci pour votre abonnement !',
                subscribe_success_msg: 'Vous recevrez bientôt nos dernières nouvelles.',
                nav_notifications: 'Notifications',
                currency_title: 'Devise',
                currency_popular: 'DEVISES POPULAIRES',
                currency_hkd: 'HKD',
                currency_cny: 'CNY',
                currency_usd: 'USD',
                currency_eur: 'EUR',
                currency_gbp: 'GBP',
                currency_sgd: 'SGD',
                currency_aud: 'AUD',
                currency_all: 'TOUTES LES DEVISES',
                currency_filter: 'Filtrer',
                currency_jpy: 'JPY',
                currency_krw: 'KRW',
                currency_thb: 'THB',
                currency_myr: 'MYR'
            },
            ja: {
                brand: 'HotelBook 予約システム',
                tab_search: '予約検索',
                tab_rooms: '客室予約',
                tab_mybookings: 'マイ予約',
                hotel_name: '91ホテル',
                lang: '言語',
                hero_copy: 'チェックインとチェックアウトの日付を選択して、限定特典をお楽しみください。',
                checkin: 'チェックイン',
                checkout: 'チェックアウト',
                guests: '宿泊人数',
                guests_1: '大人1名',
                guests_2: '大人2名',
                guests_3: '大人3名',
                guests_4: '大人4名',
                room_type: '部屋タイプ',
                room_type_all: 'すべてのタイプ',
                room_type_standard: '標準客室',
                room_type_deluxe: 'デラックスルーム',
                room_type_suite: 'スイートルーム',
                search_available: '空室検索',
                rooms_title: '予約可能な客室',
                price_all: 'すべての価格',
                price_0_500: '¥500以下',
                price_500_1000: '¥500-1000',
                price_1000_plus: '¥1000以上',
                sort_default: 'デフォルト',
                sort_price_asc: '価格の安い順',
                sort_price_desc: '価格の高い順',
                refresh: '更新',
                mybookings_title: 'マイ予約',
                status_all: 'すべてのステータス',
                status_confirmed: '確認済み',
                status_completed: '完了',
                status_cancelled: 'キャンセル済み',
                lookup_other: '他の予約を検索',
                th_booking_id: '予約番号',
                th_room: '客室情報',
                th_checkin: 'チェックイン',
                th_checkout: 'チェックアウト',
                th_total: '合計',
                th_status: '状態',
                th_action: '操作',
                help_title: 'お困りですか？',
                help_text: '予約やお問い合わせをサポートいたします。',
                perks_title: '限定特典',
                perk_late_checkout: 'レイトチェックアウト',
                perk_wifi: '高速 Wi‑Fi',
                perk_breakfast: '朝食特典',
                room_detail_title: '客室詳細',
                reviews_title: '宿泊者の評価',
                no_reviews: '評価はまだありません',
                loading: '読み込み中...',
                count_reviews: '{count}件の評価',
                close: '閉じる',
                book_now: '今すぐ予約',
                booking_form_title: '予約情報の入力',
                guest_name: '宿泊者氏名',
                guest_name_ph: '氏名を入力してください',
                guest_phone: '電話番号',
                guest_email: 'メールアドレス',
                arrival_time: '到着予定時刻',
                select: '選択してください',
                special_requests: '特別リクエスト',
                back: '戻る',
                confirm_booking: '予約を確定',
                view_detail: '詳細を見る',
                only_left: '残り{count}室',
                up_to_guests: '最大{count}名',
                per_night: '/泊',
                fee_room: '部屋タイプ',
                fee_checkin: 'チェックイン',
                fee_checkout: 'チェックアウト',
                fee_price: '単価',
                fee_nights: '宿泊数',
                fee_total: '合計',
                nights: '{count}泊',
                cancel: 'キャンセル',
                toast_select_dates: 'チェックインとチェックアウトの日付を選択してください',
                toast_checkout_after: 'チェックアウト日はチェックイン日より後にしてください',
                toast_searching: '空室を検索中...',
                toast_found_rooms: '{count}室の空室が見つかりました',
                toast_refresh_success: '更新に成功しました',
                toast_booking_success: '予約が完了しました！',
                toast_currency_changed: '{name} に切り替えました',
                lang_display: '日本語',
                lang_title: '言語',
                section_connect: 'お問い合わせ',
                subscribe_placeholder: 'メールアドレスを入力してください',
                subscribe_btn: '登録',
                subscribe_thanks: 'ご登録ありがとうございます！',
                footer_copyright: '© 2026 91ホテル',
                back: '戻る',
                footer_guest_center: 'ゲストセンター',
                footer_guest_booking: '宿泊予約・お問い合わせ',
                footer_guest_membership: '会員特典について',
                footer_guest_transport: 'アクセス・周辺情報',
                footer_group: '91ホテルグループ',
                footer_about: '私たちについて',
                footer_services: '宿泊サービス',
                footer_food: 'お食事・レストラン',
                footer_contact: 'お問い合わせ',
                footer_media: 'メディア',
                footer_newsroom: 'ニュースルーム',
                footer_media_contact: 'プレスリリース',
                footer_brand_assets: 'ブランド资料',
                footer_corporate: '法人のお客様',
                footer_meetings: '会議・宴会',
                footer_sustainability: 'サステナビリティ',
                footer_careers: '採用情報',
                footer_suppliers: 'パートナーシップ',
                footer_privacy: 'プライバシーポリシー',
                footer_terms: '利用規約',
                footer_cookie: 'クッキー設定',
                footer_lang: '言語',
                connect_desc: 'ニュースレターに登録して、限定オファーや最新情報をいち早く受け取りましょう。',
                subscribe_success_msg: '最新ニュースやお得な情報をメールでお届けします。',
                nav_notifications: 'お知らせ',
                currency_title: '通貨',
                currency_popular: '人気の通貨',
                currency_hkd: 'HKD',
                currency_cny: 'CNY',
                currency_usd: 'USD',
                currency_eur: 'EUR',
                currency_gbp: 'GBP',
                currency_sgd: 'SGD',
                currency_aud: 'AUD',
                currency_all: 'すべての通貨',
                currency_filter: '検索',
                currency_jpy: 'JPY',
                currency_krw: 'KRW',
                currency_thb: 'THB',
                currency_myr: 'MYR'
            }
        };

        let currentLang = localStorage.getItem('lang') || 'zh';

        function t(key, params = {}) {
            const dict = i18n[currentLang] || i18n.zh;
            const raw = dict[key] ?? i18n.zh[key] ?? key;
            return String(raw).replace(/\{(\w+)\}/g, (_, k) => (params[k] ?? `{${k}}`));
        }

        function applyI18n(lang) {
            const supportedLangs = ['zh', 'en', 'fr', 'ja'];
            currentLang = supportedLangs.includes(lang) ? lang : 'zh';
            localStorage.setItem('lang', currentLang);
            document.documentElement.setAttribute('data-lang', currentLang);
            
            const htmlLangs = { zh: 'zh-CN', en: 'en', fr: 'fr', ja: 'ja' };
            document.documentElement.lang = htmlLangs[currentLang] || 'zh-CN';

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const k = el.getAttribute('data-i18n');
                if (k) el.textContent = t(k);
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const k = el.getAttribute('data-i18n-placeholder');
                if (k) el.setAttribute('placeholder', t(k));
            });

            // 更新货币按钮文本
            const currencyBtn = document.getElementById('currencyBtn');
            if (currencyBtn) {
                const activeCurrencyItem = document.querySelector('.currency-item.active');
                if (activeCurrencyItem) {
                    const k = activeCurrencyItem.getAttribute('data-i18n');
                    const span = currencyBtn.querySelector('span');
                    if (span && k) span.textContent = t(k);
                }
            }

            renderRooms();
            renderMyBookings();

            // 广播给 notifications 等其他页面
            window.dispatchEvent(new CustomEvent('notifLangChanged', { detail: { lang: currentLang } }));
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

            // 从后端加载房型
            fetch('http://43.132.210.15:3000/api/roomtypes')
                .then(r => r.json())
                .then(data => {
                    if (data.roomTypes && data.roomTypes.length) {
                        // 备份本地的多语言配置
                        const localI18nMap = {};
                        roomsData.forEach(r => {
                            localI18nMap[r.id] = {
                                name: r.name,
                                description: r.description,
                                bed: r.bed,
                                amenities: r.amenities,
                                policy: r.policy
                            };
                        });

                        roomsData.length = 0;
                        data.roomTypes.forEach(r => {
                            // 如果本地有该房间的多语言配置，则进行合并（Hydration）
                            if (localI18nMap[r.id]) {
                                Object.assign(r, localI18nMap[r.id]);
                            }
                            roomsData.push(r);
                        });
                    }
                    return loadAllRatings();
                })
                .then(() => {
                    renderRooms();
                    updateStats();
                })
                .catch(() => {
                    loadAllRatings().then(() => {
                        renderRooms();
                        updateStats();
                    });
                });

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

        let currentCurrency = localStorage.getItem('currency') || 'CNY';
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

        // 评分缓存 { roomId: { avg: '4.5', count: 3 } }
        let roomRatings = {};

        async function loadAllRatings() {
            try {
                const res = await fetch('http://43.132.210.15:3000/api/reviews');
                const data = await res.json();
                const map = {};
                (data.reviews || []).forEach(r => {
                    if (!map[r.roomId]) map[r.roomId] = { sum: 0, count: 0 };
                    map[r.roomId].sum   += r.rating;
                    map[r.roomId].count += 1;
                });
                roomRatings = {};
                Object.keys(map).forEach(id => {
                    roomRatings[id] = {
                        avg:   (map[id].sum / map[id].count).toFixed(1),
                        count: map[id].count
                    };
                });
            } catch (e) { roomRatings = {}; }
        }

        function renderStarHtml(avg) {
            const full  = Math.floor(avg);
            const half  = (avg - full) >= 0.5 ? 1 : 0;
            const empty = 5 - full - half;
            return '<i class="fas fa-star" style="color:#f59e0b;font-size:0.8rem"></i>'.repeat(full)
                 + (half ? '<i class="fas fa-star-half-alt" style="color:#f59e0b;font-size:0.8rem"></i>' : '')
                 + '<i class="far fa-star" style="color:#f59e0b;font-size:0.8rem"></i>'.repeat(empty);
        }

        function renderRooms() {
            filterRooms();
        }

        function createRoomCard(room) {
            const discount = Math.round((1 - room.price / room.originalPrice) * 100);
            
            const roomName = typeof room.name === 'object' 
                ? (room.name[currentLang] || room.name.zh || '-') 
                : (room.name || '-');
            
            const roomBed = typeof room.bed === 'object' 
                ? (room.bed[currentLang] || room.bed.zh || '-') 
                : (room.bed || '-');
            
            return `
                <div class="room-card">
                    <div class="room-image">
                        <img src="${room.image}" alt="${roomName}">
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
                        <h3 class="room-name">${roomName}</h3>
                        <div class="room-features">
                            <span><i class="fas fa-ruler-combined"></i> ${room.size}</span>
                            <span><i class="fas fa-bed"></i> ${roomBed}</span>
                            <span><i class="fas fa-user"></i> ${t('up_to_guests', { count: room.guests })}</span>
                        </div>
                        <div style="margin:6px 0 4px;font-size:0.82rem;display:flex;align-items:center;gap:4px;">
                            ${roomRatings[room.id]
                                ? `${renderStarHtml(parseFloat(roomRatings[room.id].avg))}
                                   <span style="color:#374151;font-weight:600;">${roomRatings[room.id].avg}</span>
                                   <span style="color:#9ca3af;">(${t('count_reviews', { count: roomRatings[room.id].count })})</span>`
                                : `<span style="color:#9ca3af;">${t('no_reviews')}</span>`}
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
            const guestFilter = parseInt(document.getElementById('guestCount').value) || 0;
            const sortType = document.getElementById('sortFilter').value;
            
            let filtered = roomsData.filter(room => {
                // Type filter
                if (typeFilter !== 'all' && room.type !== typeFilter) return false;
                
                // Price filter
                if (priceFilter !== 'all') {
                    if (priceFilter === '0-500' && room.price >= 500) return false;
                    if (priceFilter === '500-1000' && (room.price < 500 || room.price >= 1000)) return false;
                    if (priceFilter === '1000+' && room.price < 1000) return false;
                }

                // Guest filter
                if (room.guests < guestFilter) return false;
                
                return true;
            });

            // Apply sorting
            if (sortType === 'price-asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortType === 'price-desc') {
                filtered.sort((a, b) => b.price - a.price);
            }
            
            const grid = document.getElementById('roomGrid');
            grid.innerHTML = filtered.map(room => createRoomCard(room)).join('');
            
            return filtered.length;
        }

        function sortRooms() {
            filterRooms();
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
                const count = filterRooms();
                showToast(t('toast_found_rooms', { count: count }), 'success');
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
    
    if (!modal || !title || !body) return;

    const roomName = typeof currentRoom.name === 'object' ? (currentRoom.name[currentLang] || currentRoom.name.zh) : currentRoom.name;
    title.textContent = roomName;
    
    // 处理可能缺失的 gallery
    const gallery = currentRoom.gallery || [currentRoom.image];
    const description = typeof currentRoom.description === 'object' ? (currentRoom.description[currentLang] || currentRoom.description.zh) : (currentRoom.description || t('no_description'));

    body.innerHTML = `
        <div class="gallery-grid">
            <div class="gallery-main">
                <img src="${gallery[0]}" alt="${roomName}">
            </div>
            ${gallery.length > 1 ? `
            <div class="gallery-thumbs">
                ${gallery.slice(1, 3).map((img, i) => `
                    <div class="gallery-thumb ${i === 1 && gallery.length > 3 ? 'more' : ''}">
                        <img src="${img}" alt="">
                    </div>
                `).join('')}
            </div>` : ''}
        </div>
        
        <div class="room-detail-header">
            <div class="room-detail-info">
                <div class="room-detail-spec">
                    <span><i class="fas fa-ruler-combined"></i> ${currentRoom.size}m²</span>
                    <span><i class="fas fa-bed"></i> ${typeof currentRoom.bed === 'object' ? (currentRoom.bed[currentLang] || currentRoom.bed.zh) : currentRoom.bed}</span>
                    <span><i class="fas fa-user"></i> ${t('up_to_guests', { count: currentRoom.guests })}</span>
                </div>
            </div>
            <div class="room-detail-price">
                ${currentRoom.originalPrice ? `<span class="price-original">${formatPrice(currentRoom.originalPrice)}</span>` : ''}
                <div class="price-main">
                    <span class="price-current">${formatPrice(currentRoom.price)}</span>
                    <span class="price-unit">${t('per_night')}</span>
                </div>
            </div>
        </div>
        
        <div class="room-detail-desc">
            <p>${description}</p>
        </div>
        
        <div class="room-detail-amenities">
            <h4>${t('amenities_title')}</h4>
            <div class="amenities-list">
                ${(typeof currentRoom.amenities === 'object' && !Array.isArray(currentRoom.amenities) 
                    ? (currentRoom.amenities[currentLang] || currentRoom.amenities.zh || []) 
                    : (currentRoom.amenities || [])).map(a => `<span class="amenity-tag"><i class="fas fa-check"></i> ${a}</span>`).join('')}
            </div>
        </div>
        
        <div class="policy-box">
            <h4><i class="fas fa-info-circle"></i> ${t('booking_policy_title')}</h4>
            <p>${typeof currentRoom.policy === 'object' ? (currentRoom.policy[currentLang] || currentRoom.policy.zh) : (currentRoom.policy || t('no_description'))}</p>
        </div>

        <div id="reviewSection" class="room-detail-reviews">
            <h4>${t('reviews_title')}</h4>
            <div id="reviewList"><p style="color:#9ca3af;font-size:0.875rem;">${t('loading')}</p></div>
            <div id="reviewFormArea"></div>
        </div>
    `;

    modal.classList.add('active');
    loadRoomReviews(currentRoom.id);
}

function closeRoomModal() {
    document.getElementById('roomModal').classList.remove('active');
}

// ============================================
// Review Functions
// ============================================
async function loadRoomReviews(roomId) {
    const listEl = document.getElementById('reviewList');
    const formEl = document.getElementById('reviewFormArea');
    if (!listEl || !formEl) return;

    try {
        const res  = await fetch('http://43.132.210.15:3000/api/reviews?roomId=' + roomId);
        const data = await res.json();
        const reviews = data.reviews || [];

        // 渲染评论列表
        if (reviews.length === 0) {
            listEl.innerHTML = `<p style="color:#9ca3af;font-size:0.875rem;">${t('no_reviews')}</p>`;
        } else {
            listEl.innerHTML = reviews.map(r => `
                <div style="border:1px solid #e5e7eb;border-radius:8px;padding:12px;margin-bottom:10px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                        <span style="font-weight:600;font-size:0.875rem;">${r.username}</span>
                        <span style="font-size:0.75rem;color:#9ca3af;">${new Date(r.createdAt).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'zh-CN')}</span>
                    </div>
                    <div style="margin-bottom:6px;">${renderStarHtml(r.rating)} <span style="font-size:0.8rem;color:#6b7280;">${r.rating}.0</span></div>
                    <p style="font-size:0.875rem;color:#374151;margin:0;">${r.comment}</p>
                </div>
            `).join('');
        }

        // 不显示提交表单，评价入口在"我的预订"页面
        formEl.innerHTML = '';

        // 刷新卡片评分
        await loadAllRatings();
        renderRooms();
    } catch (e) {
        if (listEl) listEl.innerHTML = `<p style="color:#ef4444;font-size:0.875rem;">${t('load_reviews_failed')}</p>`;
    }
}

function proceedToBook() {
    if (!currentRoom) return;

    // 未登录则跳转登录页
    if (!sessionStorage.getItem('isLoggedIn')) {
        showToast(currentLang === 'en' ? 'Please login first to book a room' : '请先登录才能预订房间', 'error');
        setTimeout(() => { window.location.href = '../login/login.html'; }, 1200);
        return;
    }

    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    const guests = document.getElementById('guestCount')?.value || '2';

    if (!checkIn || !checkOut) {
        showToast(t('toast_select_dates'), 'error');
        return;
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
        showToast(t('toast_checkout_after'), 'error');
        return;
    }

    sessionStorage.setItem('checkout_room', JSON.stringify(currentRoom));
    sessionStorage.setItem('checkout_params', JSON.stringify({ checkIn, checkOut, guests }));
    // 同步当前货币到 sessionStorage，确保 checkout 页面读取一致
    if (!localStorage.getItem('currency')) localStorage.setItem('currency', currentCurrency);
    closeRoomModal();
    window.location.href = 'checkout.html';
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('active');
}

function submitBooking(event) {
    event.preventDefault();

    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalAmount = currentRoom.price * nights;
    const username = sessionStorage.getItem('username') || 'guest';

    const newBooking = {
        id: 'GB' + Date.now(),
        username,
        roomType: currentRoom.name,
        checkIn,
        checkOut,
        guests: document.getElementById('guestCount') ? document.getElementById('guestCount').value : 1,
        totalAmount,
        status: 'confirmed'
    };

    // 发送到后端
    fetch('http://43.132.210.15:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
    }).then(res => res.json()).then(() => {
        showToast(t('toast_booking_success'), 'success');
        closeBookingModal();
        myBookings.unshift(newBooking);
        updateStats();
        renderMyBookings();
    }).catch(() => {
        // 后端不可用时仍然本地显示
        showToast(t('toast_booking_success'), 'success');
        closeBookingModal();
        myBookings.unshift(newBooking);
        updateStats();
        renderMyBookings();
    });
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
            <td data-label="${t('th_booking_id')}">${b.id}</td>
            <td data-label="${t('th_room')}">${b.roomName}</td>
            <td data-label="${t('th_checkin')}">${b.checkIn}</td>
            <td data-label="${t('th_checkout')}">${b.checkOut}</td>
            <td data-label="${t('th_total')}">${formatPrice(b.totalAmount)}</td>
            <td data-label="${t('th_status')}"><span class="status-badge status-${b.status}">${b.status === 'confirmed' ? t('status_confirmed') : b.status === 'completed' ? t('status_completed') : b.status === 'cancelled' ? t('status_cancelled') : b.status}</span></td>
            <td data-label="${t('th_action')}">
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
    // 页面加载时应用已保存的语言
    applyI18n(currentLang);

    // --- Lang Logic ---
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const closeLangBtn = document.getElementById('closeLangBtn');
    
    // --- Newsletter Logic ---
    const subscribeForm = document.getElementById('hpSubscribeForm');
    const subscribeSuccess = document.getElementById('hpSubscribeSuccess');

    function triggerConfetti() {
        const colors = ['#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#e74c3c'];
        const container = document.getElementById('connect');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            container.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 10 + Math.random() * 20;
            const tx = Math.cos(angle) * 200 * Math.random();
            const ty = Math.sin(angle) * 200 * Math.random();
            
            confetti.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`, opacity: 1, offset: 0.7 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty + 50}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => confetti.remove();
        }
    }

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailEl = document.getElementById('hpSubscribeEmail');
            const submitBtn = subscribeForm.querySelector('button[type="submit"]');
            const email = emailEl ? emailEl.value.trim() : '';
            if (!email) return;

            const username = sessionStorage.getItem('username');

            // 进入加载状态
            submitBtn.classList.add('loading');

            try {
                // 使用绝对路径确保在不同环境下都能访问到 API
                let success = false;
                try {
                    const response = await fetch('http://43.132.210.15:3000/api/newsletter/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, username })
                    });
                    if (response.ok) success = true;
                } catch (e) {
                    console.warn('Backend connection failed, using demo mode success.');
                    success = true; // Demo mode fallback for static site
                }

                if (success) {
                    // 隐藏表单，显示成功信息
                    subscribeForm.style.display = 'none';
                    subscribeSuccess.classList.add('active');
                    
                    // 触发撒花特效
                    triggerConfetti();
                    
                    if (username && window.notificationSystem) {
                        window.notificationSystem.notifyNewsletterSubscription(username);
                    }
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    console.error('Subscription failed:', errorData);
                    showToast(errorData.message || t('toast_not_implemented') || '订阅失败', 'error');
                }
            } catch (error) {
                console.error('Subscription error:', error);
                showToast(t('toast_not_implemented') || '订阅失败', 'error');
            } finally {
                submitBtn.classList.remove('loading');
            }
        });

        // 取消订阅逻辑
        const btnUnsubscribe = document.getElementById('btnUnsubscribe');
        if (btnUnsubscribe) {
            btnUnsubscribe.addEventListener('click', () => {
                const form = document.getElementById('hpSubscribeForm');
                const successDiv = document.getElementById('hpSubscribeSuccess');
                successDiv.classList.remove('active');
                form.style.display = 'flex';
                document.getElementById('hpSubscribeEmail').value = '';
                showToast(t('toast_unsubscribed') || '已取消订阅', 'info');
            });
        }
    }

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
                if (nextLang === 'zh' || nextLang === 'en' || nextLang === 'fr' || nextLang === 'ja') {
                    // Update active state
                    langItems.forEach(i => i.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    
                    // Switch lang
                    applyI18n(nextLang);
                    
                    // Update text node while keeping chevron
                    const span = langBtn.querySelector('span');
                    if(span) span.textContent = t('lang_display');
                    
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
                
                // 保存到 localStorage，让 checkout.html 也能读取
                localStorage.setItem('currency', currentCurrency);
                
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
                
                showToast(t('toast_currency_changed', { name: currencyName }), 'success');
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
            sessionStorage.setItem('isLoggedIn', 'true'); // 添加登录状态标志
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
        sessionStorage.removeItem('isLoggedIn'); // 移除登录状态标志
        showToast('已登出', 'success');
        checkLoginState();
        setTimeout(() => {
            userDropdown.style.display = 'none';
        }, 1000);
    });
    
    // 加载通知系统
    loadScript('../notifications/notificationSystem.js', function() {
        console.log('通知系统已加载');
        if (window.notificationSystem) {
            window.notificationSystem.updateNotificationBadge();
        }
    });
});

// 动态加载脚本函数
function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}