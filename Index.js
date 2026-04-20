const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// توكن البوت
const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWRWLXjEulM');

const ADMINS = ['7149506332', '8549868909'];

// دالة إرسال التنبيهات للإدارة
const sendToAdmins = (msg) => {
    ADMINS.forEach(id => {
        bot.telegram.sendMessage(id, msg, { parse_mode: 'Markdown' }).catch(e => console.log("Admin Notify Error"));
    });
};

bot.telegram.deleteWebhook().then(() => {

    // القائمة الرئيسية
    bot.start((ctx) => {
        ctx.reply(أهلاً بك في jesee.store 🌟\nالرجاء اختيار القسم المطلوب:, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
                [Markup.button.callback('📺 تطبيقات التلفزيون', 'tv_apps')],
                [Markup.button.callback('💰 سحب رواتب', 'salary_menu')],
                [Markup.button.callback('📞 الاتصالات', 'telecom_menu')],
                [Markup.button.callback('🪙 العملات الرقمية', 'crypto_menu')],
                [Markup.button.callback('💻 سوفتوير', 'software_menu'), Markup.button.callback('✨ خدمات متنوعة', 'misc_services')],
                [Markup.button.url('🔗 الموقع الرسمي', 'https://jesee.store/')]
            ])
        );
    });

    // قسم سحب الرواتب
    bot.action('salary_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("💰 اختر وسيلة استلام الراتب:", Markup.inlineKeyboard([
            [Markup.button.callback('ويش مني', 'req_wish'), Markup.button.callback('شام كاش', 'req_sham')],
            [Markup.button.callback('Perfect Money', 'req_perfect')],
            [Markup.button.callback('⬅️ رجوع', 'main_menu')]
        ]));
    });

    // قسم شحن الألعاب
    bot.action('games_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("🎮 اختر اللعبة:", Markup.inlineKeyboard([
            [Markup.button.callback('PUBG Mobile', 'req_pubg'), Markup.button.callback('Free Fire', 'req_ff')],
            [Markup.button.callback('FC Mobile', 'req_fc'), Markup.button.callback('Clash of Clans', 'req_coc')],
            [Markup.button.callback('⬅️ رجوع', 'main_menu')]
        ]));
    });

    // قسم العملات الرقمية (من الصورة 11)
    bot.action('crypto_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("🪙 اختر العملة أو المنصة:", Markup.inlineKeyboard([
            [Markup.button.callback('Bitget USDT', 'req_bitget'), Markup.button.callback('Payoneer', 'req_payoneer')],
            [Markup.button.callback('Tron TRC20', 'req_tron'), Markup.button.callback('Payeer', 'req_payeer')],
            [Markup.button.callback('⬅️ رجوع', 'main_menu')]
        ]));
    });

    // معالجة طلبات الأزرار (Prefix: req_)
    bot.action(/^req_/, (ctx) => {
        const service = ctx.callbackQuery.data.replace('req_', '');
        sendToAdmins(📥 *طلب جديد:*\n👤 العميل: ${ctx.from.first_name}\n🆔 المعرف: ${ctx.from.id}\n🛠 الخدمة: ${service});
        ctx.answerCbQuery();
        ctx.reply("✅ تم استلام طلبك. سيتواصل معك فريق الدعم قريباً.");
    });

    // العودة للقائمة الرئيسية
    bot.action('main_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage();
        ctx.reply(القائمة الرئيسية:, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
                [Markup.button.callback('📺 تطبيقات التلفزيون', 'tv_apps')],
                [Markup.button.callback('💰 سحب رواتب', 'salary_menu')],
                [Markup.button.callback('⬅️ عرض الكل', 'main_menu')]
            ])
        );
    });

    bot.launch();
});

// تشغيل السيرفر لتجاوز إغلاق Render
http.createServer((req, res) => {
    res.write('Jesee Store Bot is Online');
    res.end();
}).listen(process.env.PORT || 8080);
