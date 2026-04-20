const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWRWLXjEulM');
const ADMINS = ['7149506332', '8549868909'];

// دالة إرسال التنبيهات للإدارة
const sendToAdmins = (msg) => {
    ADMINS.forEach(id => {
        bot.telegram.sendMessage(id, msg, { parse_mode: 'Markdown' }).catch(e => console.log("Notify Error"));
    });
};

bot.telegram.deleteWebhook().then(() => {

    // القائمة الرئيسية عند البداية
    bot.start((ctx) => {
        ctx.reply(أهلاً بك في متجر jesee.store 🌟\nالرجاء اختيار القسم المطلوب:, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
                [Markup.button.callback('📺 تطبيقات التلفزيون', 'tv_apps')],
                [Markup.button.callback('💰 سحب رواتب', 'salary_menu')],
                [Markup.button.callback('📞 الاتصالات', 'telecom_menu')],
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
            [Markup.button.callback('⬅️ رجوع', 'main_menu')]
        ]));
    });

    // --- معالجة طلبات الأزرار (Prefix: req_) ---
    bot.action(/^req_/, (ctx) => {
        const service = ctx.callbackQuery.data.replace('req_', '').replace(/_/g, ' ');
        sendToAdmins(📥 *طلب جديد:*\n👤 العميل: ${ctx.from.first_name}\n🆔 ID: \${ctx.from.id}\\n🛠 الخدمة: ${service.toUpperCase()});
        ctx.answerCbQuery();
        ctx.reply("✅ تم استلام طلبك بنجاح. سيتواصل معك الدعم قريباً.");
    });

    // --- العودة للقائمة الرئيسية ---
    bot.action('main_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        ctx.reply(قائمة المتجر الرئيسية:, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
                [Markup.button.callback('📺 تطبيقات التلفزيون', 'tv_apps')],
                [Markup.button.callback('💰 سحب رواتب', 'salary_menu')],
                [Markup.button.callback('⬅️ عرض الكل', 'restart')]
            ])
        );
    });

    bot.action('restart', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        bot.handleUpdate(ctx.update);
    });

    bot.launch();
});

// إنشاء السيرفر لـ Render
http.createServer((req, res) => {
    res.write('Jesee Store Bot is Online');
    res.end();
}).listen(process.env.PORT || 8080);
