const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

const ADMIN_ID = '7149506332';
const WEBSITE_URL = 'https://jesee.store/';
const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=+271686779846713@lid';

// البوت
bot.start((ctx) => {
    bot.telegram.sendMessage(ADMIN_ID, "New User").catch(e => console.log("E"));
    ctx.reply("jesee.store 🌟", Markup.inlineKeyboard([
        [Markup.button.url('🌐 Website', WEBSITE_URL)],
        [Markup.button.url('💬 WhatsApp', WHATSAPP_URL)],
        [Markup.button.callback('💳 Payments', 'pay')]
    ]));
});

bot.action('pay', (ctx) => {
    ctx.reply("💳 jesee.store:\n\n🇮🇶 Zain Cash\n🇯🇴 Click / Orange\n🇹🇷 Zekeriya Alvi\n🇸🇾 Sham Cash\n💰 USDT\n🇪🇬 Vodafone Cash\n🇴🇲 Bank Muscat\n🇲🇦 Bank Al-Maghrib\n🇵🇸 Bank of Palestine");
});

bot.launch();

// هذا الجزء ضروري جداً لـ Render لكي لا يغلق البوت
http.createServer((req, res) => {
    res.write('Bot is Running');
    res.end();
}).listen(process.env.PORT || 8080);

console.log("✅ LIVE");
