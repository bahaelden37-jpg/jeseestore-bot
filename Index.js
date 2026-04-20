const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// توكن البوت الخاص بك
const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

const ADMIN_ID = '7149506332';
const WEBSITE_URL = 'https://jesee.store/';
const WA_1 = 'https://wa.me/905342572606';
const WA_2 = 'https://wa.me/963993777353';

// منع التعارض عن طريق حذف الـ Webhook القديم قبل التشغيل
bot.telegram.deleteWebhook().then(() => {
    bot.start((ctx) => {
        const firstName = ctx.from.first_name || "User";
        bot.telegram.sendMessage(ADMIN_ID, "New User: " + firstName).catch(e => console.log("E"));

        ctx.reply("WELCOME TO JESEE.STORE 🌟\n\nPlease share your contact:", 
            Markup.keyboard([[Markup.button.contactRequest('📱 Share Phone Number')]]).oneTime().resize()
        );

        ctx.reply("Options:", Markup.inlineKeyboard([
            [Markup.button.url('🌐 Website', WEBSITE_URL)],
            [Markup.button.url('💬 WhatsApp 1', WA_1)],
            [Markup.button.url('💬 WhatsApp 2', WA_2)],
            [Markup.button.callback('💳 Payments', 'pay')]
        ]));
    });

    bot.on('contact', (ctx) => {
        bot.telegram.sendMessage(ADMIN_ID, "Phone: " + ctx.contact.phone_number);
        ctx.reply("Done!", Markup.removeKeyboard());
    });

    bot.action('pay', (ctx) => {
        ctx.reply("💳 Payments:\n- Zain Cash\n- Click\n- Zekeriya Alvi\n- USDT");
    });

    bot.launch();
    console.log("✅ BOT IS LIVE");
});

// سطر الأمان لمنصة Render
http.createServer((req, res) => { res.write('OK'); res.end(); }).listen(process.env.PORT || 8080);
