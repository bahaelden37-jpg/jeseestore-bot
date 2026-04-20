const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

const ADMIN_ID = '7149506332';
const WEBSITE_URL = 'https://jesee.store/';
const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=+271686779846713@lid';

const paymentText = "💳 jesee.store:\n\n🇮🇶 Zain Cash\n🇯🇴 Click / Orange\n🇹🇷 Zekeriya Alvi\n🇸🇾 Sham Cash\n💰 USDT TRC20 / BEP20\n🇪🇬 Vodafone Cash\n🇴🇲 Bank Muscat\n🇲🇦 Bank Al-Maghrib\n🇵🇸 Bank of Palestine";

bot.start((ctx) => {
    // إرسال تنبيه للأدمن
    bot.telegram.sendMessage(ADMIN_ID, "New User Notification").catch(e => console.log("Error"));

    // رسالة الترحيب
    ctx.reply("jesee.store 🌟", Markup.inlineKeyboard([
        [Markup.button.url('🌐 Website', WEBSITE_URL)],
        [Markup.button.url('💬 WhatsApp', WHATSAPP_URL)],
        [Markup.button.callback('💳 Payments', 'pay')]
    ]));
});

bot.action('pay', (ctx) => {
    ctx.reply(paymentText);
});

bot.launch().then(() => console.log("Live")).catch(() => console.log("Error"));
