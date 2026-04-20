const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

const ADMIN_ID = '7149506332';
const WEBSITE_URL = 'https://jesee.store/';
const WA_1 = 'https://wa.me/905342572606';
const WA_2 = 'https://wa.me/963993777353';

bot.start((ctx) => {
    const firstName = ctx.from.first_name || "User";
    const username = ctx.from.username || "No_Username";

    // تنبيه للأدمن - بصيغة نصية بسيطة جداً
    bot.telegram.sendMessage(ADMIN_ID, "New User: " + firstName + " | User: " + username).catch(e => console.log("Error Admin"));

    // طلب مشاركة الرقم
    ctx.reply("WELCOME TO JESEE.STORE 🌟\n\nPlease share your contact to continue:", 
        Markup.keyboard([[Markup.button.contactRequest('📱 Share Phone Number')]]).oneTime().resize()
    );

    // أزرار الخدمات
    ctx.reply("Options:", Markup.inlineKeyboard([
        [Markup.button.url('🌐 Website', WEBSITE_URL)],
        [Markup.button.url('💬 WhatsApp 1', WA_1)],
        [Markup.button.url('💬 WhatsApp 2', WA_2)],
        [Markup.button.callback('💳 Payments', 'pay')]
    ]));
});

bot.on('contact', (ctx) => {
    const phoneNumber = ctx.contact.phone_number;
    bot.telegram.sendMessage(ADMIN_ID, "New Phone Received: " + phoneNumber).catch(e => console.log("Error Admin"));
    ctx.reply("Done!", Markup.removeKeyboard());
});

bot.action('pay', (ctx) => {
    ctx.reply("💳 Payment Methods:\n\n- Zain Cash\n- Click\n- Zekeriya Alvi\n- Sham Cash\n- USDT\n- Vodafone Cash\n- Bank Muscat\n- Bank Al-Maghrib\n- Bank of Palestine");
});

bot.launch();

// سطر الأمان لـ Render
http.createServer((req, res) => {
    res.write('OK');
    res.end();
}).listen(process.env.PORT || 8080);

console.log("BOT IS LIVE");
