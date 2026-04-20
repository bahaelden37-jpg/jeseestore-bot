const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// توكن البوت الخاص بك
const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWRWLXjEulM');

// معرفات الإدارة
const ADMINS = ['7149506332', '8549868909'];

// دالة إرسال التنبيهات للإدارة
const sendToAdmins = (msg) => {
    ADMINS.forEach(id => {
        bot.telegram.sendMessage(id, msg, { parse_mode: 'Markdown' }).catch(e => console.log("خطأ في التنبيه"));
    });
};

// تنظيف الـ Webhook عند التشغيل لحل مشكلة الـ Conflict
bot.telegram.deleteWebhook().then(() => {

    // القائمة الرئيسية (Start)
    bot.start((ctx) => {
        ctx.reply(أهلاً بك في متجر jesee.store 🌟\nالرجاء اختيار القسم المطلوب:, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
                [Markup.button.callback('📺 تطبيقات التلفزيون', 'tv_apps')],
                [Markup.button.callback('💰 سحب رواتب', 'salary_menu')],
                [Markup.button.callback('🌐 سوشيال ميديا', 'social_menu')],
                [Markup.button.callback('🪙 العملات الرقمية', 'crypto_menu')],
                [Markup.button.callback('💻 سوفتوير', 'software_menu'), Markup.button.callback('✨ خدمات متنوعة', 'misc_services')],
                [Markup.button.url('🔗 الموقع الرسمي', 'https://jesee.store/')]
            ])
        );
    });

    // --- قسم سحب الرواتب ---
    bot.action('salary_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("💰 خدمات سحب الرواتب:\nاختر وسيلة التسليم:", Markup.inlineKeyboard([
            [Markup.button.callback('تسليم عبر ويش مني', 'req_salary_wish')],
            [Markup.button.callback('تسليم عبر شام كاش', 'req_salary_sham')],
            [Markup.button.callback('تسليم عبر Perfect Money', 'req_salary_perfect')],
            [Markup.button.callback('⬅️ رجوع للقائمة الرئيسية', 'main_menu')]
        ]));
    });

    // --- معالجة طلبات الخدمات (Prefix: req_) ---
    bot.action(/^req_/, (ctx) => {
        const service = ctx.callbackQuery.data.replace('req_', '').replace(/_/g, ' ');
        sendToAdmins(📥 *طلب جديد مستلم:*\n👤 العميل: ${ctx.from.first_name}\n🆔 ID: \${ctx.from.id}\\n🛠 الخدمة: ${service.toUpperCase()});
        ctx.answerCbQuery();
        ctx.reply("✅ تم استلام طلبك بنجاح. سيتواصل معك الدعم قريباً.");
    });

    // --- العودة للقائمة الرئيسية ---
    bot.action('main_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        // إعادة إظهار القائمة الأساسية
        ctx.reply(قائمة متجر jesee.store الرئيسية:, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
                [Markup.button.callback('📺 تطبيقات التلفزيون', 'tv_apps')],
                [Markup.button.callback('💰 سحب رواتب', 'salary_menu')],
                [Markup.button.callback('⬅️ عرض كافة الأقسام', 'restart_bot')]
            ])
        );
    });

    // زر إعادة التشغيل
    bot.action('restart_bot', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        bot.handleUpdate(ctx.update);
    });

    // تشغيل البوت
    bot.launch();

}).catch(err => console.error("Webhook Error: ", err));

// إنشاء سيرفر بسيط لضمان عمل البوت على Render
http.createServer((req, res) => {
    res.write('Jesee Store Bot Status: Online');
    res.end();
}).listen(process.env.PORT || 8080);
