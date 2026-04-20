const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

const ADMINS = ['7149506332', '8549868909'];
const WEBSITE_URL = 'https://jesee.store/';

const sendToAdmins = (message) => {
    ADMINS.forEach(id => bot.telegram.sendMessage(id, message, { parse_mode: 'Markdown' }).catch(e => {}));
};

bot.telegram.deleteWebhook().then(() => {

    bot.start((ctx) => {
        const name = ctx.from.first_name || "عميل";
        sendToAdmins(🔔 دخول مستخدم جديد: ${name});

        ctx.reply(أهلاً بك في متجر jesee.store 🌟\nاختر القسم المطلوب:, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
                [Markup.button.callback('📱 شحن التطبيقات', 'apps_menu')],
                [Markup.button.callback('💰 سحب رواتب', 'salary_menu')], // الزر الجديد
                [Markup.button.callback('📞 الاتصالات', 'telecom_menu'), Markup.button.callback('💳 بطاقات', 'cards_menu')],
                [Markup.button.callback('💻 سوفتوير', 'software_menu'), Markup.button.callback('📺 تطبيقات التلفاز', 'tv_apps')],
                [Markup.button.callback('✨ خدمات متنوعة', 'misc_services')],
                [Markup.button.url('🌐 زيارة الموقع', WEBSITE_URL)]
            ])
        );
    });

    // --- قسم سحب الرواتب ---
    bot.action('salary_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("💰 اختر وسيلة تسليم الرواتب:", Markup.inlineKeyboard([
            [Markup.button.callback('تسليم رواتب عبر ويش مني 🧧', 'sal_wish')],
            [Markup.button.callback('تسليم رواتب عبر شام كاش 💳', 'sal_sham')],
            [Markup.button.callback('تسليم رواتب عبر Perfect Money 💎', 'sal_perfect')],
            [Markup.button.callback('⬅️ العودة للقائمة الرئيسية', 'main_menu')]
        ]));
    });

    // معالجة طلبات الرواتب
    bot.action(/^sal_/, (ctx) => {
        const methodMap = {
            'wish': 'ويش مني (Wish Money)',
            'sham': 'شام كاش (Sham Cash)',
            'perfect': 'بيرفكت مني (Perfect Money)'
        };
        const methodKey = ctx.callbackQuery.data.replace('sal_', '');
        const methodName = methodMap[methodKey];

        sendToAdmins(💸 *طلب سحب راتب:*\n👤 العميل: ${ctx.from.first_name}\n🆔 ID: \${ctx.from.id}\\n🏦 الوسيلة: ${methodName});
        
        ctx.answerCbQuery();
        ctx.reply(لقد اخترت تسليم الرواتب عبر ${methodName}. يرجى إرسال تفاصيل الحساب أو المبلغ المطلوب وسيقوم الدعم بالتواصل معك.);
    });

    // --- القائمة الرئيسية للعودة ---
    bot.action('main_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("القائمة الرئيسية لخدماتنا:", Markup.inlineKeyboard([
            [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
            [Markup.button.callback('📱 شحن التطبيقات', 'apps_menu')],
            [Markup.button.callback('💰 سحب رواتب', 'salary_menu')],
            [Markup.button.callback('📞 الاتصالات', 'telecom_menu'), Markup.button.callback('💳 بطاقات', 'cards_menu')],
            [Markup.button.callback('💻 سوفتوير', 'software_menu'), Markup.button.callback('📺 تطبيقات التلفاز', 'tv_apps')]
        ]));
    });

    bot.launch();
});

// تشغيل السيرفر لضمان بقاء البوت متصلاً
http.createServer((req, res) => { res.write('Jesee Store Bot Active'); res.end(); }).listen(process.env.PORT || 8080);
