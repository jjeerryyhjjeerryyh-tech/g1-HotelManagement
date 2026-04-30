/**
 * notifications/lang.js - 统一语言系统
 *
 * Book.html 和 notifications.html 共用此文件，实现语言同步。
 * 所有语言切换通过 dispatchEvent('langChanged') 广播给所有页面。
 */

(function () {
    'use strict';

    // ==========================================
    // 翻译字典
    // ==========================================

    // 页面 UI 文本
    var UI = {
        zh: {
            hotel_name: '91酒店',
            page_title: '消息提醒',
            notifications: 'Notifications',
            mark_all_read: '全部标为已读',
            clear_all: '清空消息',
            total: '总消息数',
            unread: '未读消息',
            all: '全部',
            login_notif: '登录通知',
            booking_notif: '预订通知',
            profile_notif: '信息更新',
            empty_title: '暂无消息',
            empty_desc: '您目前没有任何通知消息',
            loading: '正在加载消息...',
            modal_detail: '消息详情',
            confirm_clear: '确认清空',
            confirm_clear_msg: '确定要清空所有消息吗？此操作不可撤销。',
            mark_all_confirm_msg: '确定要将所有消息标为已读吗？',
            delete_confirm: '确定要删除这条消息吗？',
            logout_confirm: '确定要退出登录吗？',
            cancel: '取消',
            ok: '确定',
            mark_read: '标为已读',
            delete: '删除消息',
            login_success_title: '登录成功',
            booking_success_title: '预订成功',
            booking_cancelled_title: '预订已取消',
            profile_update_title: '信息更新',
            unread_tag: '未读',
            read_tag: '已读',
            lang_title: '语言',
            lang_display: '中文',
            tab_book: '房型预订',
            tab_mybookings: '我的预订',
            currency: '港币',
            account_login: '帐号登入',
            login: '登入',
            forgot_password: '忘记密码？',
            no_account_desc: '还没有帐号？建立帐号，储存您的订单历史记录，享受更快速的结帐体验。',
            create_account: '建立一个帐户',
            update_profile: '更新个人资料',
            logout_login: '登出登入',
            back: '返回',
            unsubscribe_btn: '取消订阅',
            newsletter_subscription_title: '订阅成功',
            toast_unsubscribed: '已取消订阅',
            just_now: '刚刚',
        },
        en: {
            hotel_name: '91 Hotel',
            page_title: 'Notifications',
            notifications: 'Notifications',
            mark_all_read: 'Mark All as Read',
            clear_all: 'Clear All',
            total: 'Total',
            unread: 'Unread',
            all: 'All',
            login_notif: 'Login Notification',
            booking_notif: 'Booking Notification',
            profile_notif: 'Profile Update',
            empty_title: 'No Messages',
            empty_desc: 'You have no notification messages at the moment.',
            loading: 'Loading messages...',
            modal_detail: 'Message Details',
            confirm_clear: 'Confirm Clear',
            confirm_clear_msg: 'Are you sure you want to clear all messages? This cannot be undone.',
            mark_all_confirm_msg: 'Are you sure you want to mark all messages as read?',
            delete_confirm: 'Are you sure you want to delete this message?',
            logout_confirm: 'Are you sure you want to log out?',
            cancel: 'Cancel',
            ok: 'Confirm',
            mark_read: 'Mark as Read',
            delete: 'Delete Message',
            login_success_title: 'Login Successful',
            booking_success_title: 'Booking Confirmed',
            booking_cancelled_title: 'Booking Cancelled',
            profile_update_title: 'Profile Updated',
            unread_tag: 'Unread',
            read_tag: 'Read',
            lang_title: 'Language',
            lang_display: 'English',
            tab_book: 'Book a Room',
            tab_mybookings: 'My Bookings',
            currency: 'HKD',
            account_login: 'Account Login',
            login: 'Log In',
            forgot_password: 'Forgot Password?',
            no_account_desc: "Don't have an account? Create one to save your order history and enjoy faster checkout.",
            create_account: 'Create an Account',
            update_profile: 'Update Profile',
            logout_login: 'Log Out',
            back: 'Back',
            unsubscribe_btn: 'Unsubscribe',
            newsletter_subscription_title: 'Subscription Successful',
            toast_unsubscribed: 'Unsubscribed',
            just_now: 'Just now',
        },
        fr: {
            hotel_name: '91 Hôtel',
            page_title: 'Notifications',
            notifications: 'Notifications',
            mark_all_read: 'Tout marquer comme lu',
            clear_all: 'Effacer tout',
            total: 'Total',
            unread: 'Non lu',
            all: 'Tout',
            login_notif: 'Notification de connexion',
            booking_notif: 'Notification de réservation',
            profile_notif: 'Mise à jour du profil',
            empty_title: 'Aucun message',
            empty_desc: 'Vous n\'avez aucun message de notification pour le moment.',
            loading: 'Chargement des messages...',
            modal_detail: 'Détails du message',
            confirm_clear: 'Confirmer l\'effacement',
            confirm_clear_msg: 'Êtes-vous sûr de vouloir effacer tous les messages ?',
            mark_all_confirm_msg: 'Tout marquer comme lu ?',
            delete_confirm: 'Supprimer ce message ?',
            logout_confirm: 'Se déconnecter ?',
            cancel: 'Annuler',
            ok: 'Confirmer',
            mark_read: 'Marquer comme lu',
            delete: 'Supprimer',
            login_success_title: 'Connexion réussie',
            booking_success_title: 'Réservation confirmée',
            profile_update_title: 'Profil mis à jour',
            unread_tag: 'Non lu',
            read_tag: 'Lu',
            lang_title: 'Langue',
            lang_display: 'Français',
            tab_book: 'Réserver',
            tab_mybookings: 'Mes réservations',
            currency: 'HKD',
            account_login: 'Connexion',
            login: 'Connexion',
            forgot_password: 'Mot de passe oublié ?',
            no_account_desc: "Pas de compte ?",
            create_account: 'Créer un compte',
            update_profile: 'Mettre à jour le profil',
            logout_login: 'Déconnexion',
            back: 'Retour',
            unsubscribe_btn: 'Se désabonner',
            newsletter_subscription_title: 'Abonnement réussi',
            toast_unsubscribed: 'Désabonné',
            just_now: 'À l\'instant',
        },
        ja: {
            hotel_name: '91ホテル',
            page_title: 'お知らせ',
            notifications: 'お知らせ',
            mark_all_read: 'すべて既読にする',
            clear_all: 'すべて削除',
            total: '総メッセージ数',
            unread: '未読',
            all: 'すべて',
            login_notif: 'ログイン通知',
            booking_notif: '予約通知',
            profile_notif: 'プロフィール更新',
            empty_title: 'メッセージはありません',
            empty_desc: '現在、通知メッセージはありません。',
            loading: '読み込み中...',
            modal_detail: 'メッセージ詳細',
            confirm_clear: '削除の確認',
            confirm_clear_msg: 'すべてのメッセージを削除してもよろしいですか？',
            mark_all_confirm_msg: 'すべてのメッセージを既読にしますか？',
            delete_confirm: 'このメッセージを削除しますか？',
            logout_confirm: 'ログアウトしますか？',
            cancel: 'キャンセル',
            ok: '確定',
            mark_read: '既読にする',
            delete: '削除',
            login_success_title: 'ログイン成功',
            booking_success_title: '予約完了',
            profile_update_title: 'プロフィール更新',
            unread_tag: '未読',
            read_tag: '既読',
            lang_title: '言語',
            lang_display: '日本語',
            tab_book: '客室予約',
            tab_mybookings: 'マイ予約',
            currency: '香港ドル',
            account_login: 'ログイン',
            login: 'ログイン',
            forgot_password: 'パスワードを忘れた場合',
            no_account_desc: "アカウントをお持ちでない場合",
            create_account: 'アカウント作成',
            update_profile: 'プロフィール更新',
            logout_login: 'ログアウト',
            back: '戻る',
            unsubscribe_btn: '購読解除',
            newsletter_subscription_title: '購読成功',
            toast_unsubscribed: '購読を解除しました',
            just_now: 'たった今',
        }
    };

    // 通知消息模板
    var NOTIF_TEMPLATES = {
        zh: {
            login_success_body:  '{name}，欢迎回来！',
            booking_success_body: '您已成功预订 {roomType}，入住：{checkIn}，退房：{checkOut}。',
            booking_success_body2: '您的预订已确认！{roomType}，{checkIn} 至 {checkOut}。祝您住宿愉快！',
            booking_cancelled_body: '您已取消预订 {roomType}（{checkIn} 至 {checkOut}）。退款将在3-5个工作日内原路返回。',
            profile_update_body: '您的个人资料已成功更新。',
            newsletter_subscription_body: '您已成功订阅酒店新闻简报。我们将定期为您发送专属优惠。',
            general_body: '{content}',
        },
        en: {
            login_success_body:  'Welcome back, {name}!',
            booking_success_body: 'You have successfully booked {roomType}. Check-in: {checkIn}, Check-out: {checkOut}.',
            booking_success_body2: 'Your reservation is confirmed! {roomType}, {checkIn} to {checkOut}. Enjoy your stay!',
            booking_cancelled_body: 'Your booking for {roomType} ({checkIn} to {checkOut}) has been cancelled. Refund will be processed within 3-5 business days.',
            profile_update_body: 'Your profile has been updated successfully.',
            newsletter_subscription_body: 'You have successfully subscribed to the hotel newsletter. We will send you exclusive offers regularly.',
            general_body: '{content}',
        },
        fr: {
            login_success_body:  'Bon retour, {name} !',
            booking_success_body: 'Réservation réussie pour {roomType}. Arrivée : {checkIn}, Départ : {checkOut}.',
            booking_success_body2: 'Votre réservation est confirmée ! {roomType}, du {checkIn} au {checkOut}. Bon séjour !',
            profile_update_body: 'Votre profil a été mis à jour avec succès.',
            newsletter_subscription_body: 'Vous vous êtes abonné avec succès à la newsletter de l\'hôtel. Nous vous enverrons régulièrement des offres exclusives.',
            general_body: '{content}',
        },
        ja: {
            login_success_body:  '{name}さん、おかえりなさい！',
            booking_success_body: '{roomType}の予約が完了しました。チェックイン：{checkIn}、チェックアウト：{checkOut}。',
            booking_success_body2: '予約が確定しました！{roomType}、{checkIn}から{checkOut}まで。素敵なご滞在を！',
            profile_update_body: 'プロフィールの更新が完了しました。',
            newsletter_subscription_body: 'ホテルのメールマガジンに登録されました。お得な情報を定期的にお届けします。',
            general_body: '{content}',
        }
    };

    // ==========================================
    // 核心函数
    // ==========================================

    function getLang() {
        return localStorage.getItem('lang') || 'zh';
    }

    function t(key) {
        var lang = getLang();
        return UI[lang][key] || UI['zh'][key] || key;
    }

    function renderNotif(templateKey, params) {
        var lang = getLang();
        var tmpl = NOTIF_TEMPLATES[lang][templateKey] || NOTIF_TEMPLATES['zh'][templateKey] || templateKey;
        if (!params) return tmpl;
        for (var k in params) {
            tmpl = tmpl.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
        }
        return tmpl;
    }

    function setLang(lang) {
        localStorage.setItem('lang', lang);
        window.dispatchEvent(new CustomEvent('notifLangChanged', {
            detail: { lang: lang }
        }));
    }

    window.__notifLang = {
        getLang:     getLang,
        t:           t,
        renderNotif: renderNotif,
        setLang:     setLang,
        UI:          UI,
        NOTIF_TEMPLATES: NOTIF_TEMPLATES
    };

    window.t = t;
    window.setNotifLang = setLang;

    console.log('[i18n] lang.js loaded, lang:', getLang());
})();
