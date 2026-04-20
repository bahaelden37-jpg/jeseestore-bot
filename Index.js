const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// توكن البوت
const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

const ADMINS = ['7149506332', '8549868909'];

const sendToAdmins = (msg) => {
    ADMINS.forEach(id => bot.telegram.sendMessage(id, msg, { parse_mode: 'Markdown' }).catch(e => {}));
};

bot.telegram.deleteWebhook().then(() => {

    bot.start((ctx) => {
        ctx.reply(أهلاً بك في متجر jesee.store 🌟\nالرجاء اختيار القسم:, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
                [Markup.button.callback('📺 تطبيقات التلفزيون', 'tv_apps')],
                [Markup.button.callback('💰 سحب رواتب', 'salary_menu')],
                [Markup.button.callback('🌐 سوشيال ميديا', 'social_menu')],
                [Markup.button.callback('📞 الاتصالات', 'telecom_menu')],
                [Markup.button.callback('💻 سوفتوير', 'software_menu'), Markup.button.callback('✨ خدمات متنوعة', 'misc_services')],
                [Markup.button.url('🔗 زيارة الموقع', 'https://jesee.store/')]
            ])
        );
    });

    // --- قسم سحب الرواتب ---
    bot.action('salary_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("💰 اختر وسيلة استلام الراتب:", Markup.inlineKeyboard([
            [Markup.button.callback('تسليم رواتب عبر ويش مني', 'sal_wish')],
            [Markup.button.callback('تسليم رواتب عبر شام كاش', 'sal_sham')],
            [Markup.button.callback('تسليم رواتب عبر perfect money', 'sal_perfect')],
            [Markup.button.callback('⬅️ رجوع', 'main_menu')]
        ]));
    });

    // --- قسم شحن الألعاب (من الصورة 1) ---
    bot.action('games_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("🎮 اختر اللعبة المطلوبة:", Markup.inlineKeyboard([
            [Markup.button.callback('PUBG Mobile', 'game_pubg'), Markup.button.callback('Free Fire', 'game_ff')],
            [Markup.button.callback('Honor of Kings', 'game_hok'), Markup.button.callback('Clash of Clans', 'game_coc')],
            [Markup.button.callback('8 Ball Pool', 'game_8ball'), Markup.button.callback('FC Mobile', 'game_fc')],
            [Markup.button.callback('⬅️ رجوع', 'main_menu')]
        ]));
    });

    // --- قسم الاتصالات (من الصورة 8) ---
    bot.action('telecom_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("📞 شركات الاتصالات المتاحة:", Markup.inlineKeyboard([
            [Markup.button.callback('Syriatel', 'tel_syriatel'), Markup.button.callback('MTN', 'tel_mtn')],
            [Markup.button.callback('Asiacell', 'tel_asia'), Markup.button.callback('Zain', 'tel_zain')],
            [Markup.button.callback('⬅️ رجوع', 'main_menu')]
        ]));
    });

    // معالجة جميع الطلبات وإرسالها للإدارة
    bot.action(/^(sal_|game_|tel_)/, (ctx) => {
        const action = ctx.callbackQuery.data;
        sendToAdmins(📥 *طلب جديد:*\n👤 العميل: ${ctx.from.first_name}\n🔑 الكود: \${action}\``);
        ctx.answerCbQuery();
        ctx.reply("تم استلام طلبك، سيقوم الدعم بالتواصل معك قريباً.");
    });

    bot.action('main_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage();
        // إعادة إظهار قائمة البداية
        bot.handleUpdate(ctx.update);
    });

    bot.launch();
});

// السيرفر لضمان بقاء البوت حياً
http.createServer((req, res) => { res.write('Jesee Store Running'); res.end(); }).listen(process.env.PORT || 8080);
