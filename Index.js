const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

const ADMIN_ID = '7149506332';
const WEBSITE_URL = 'https://jesee.store/';
// رابط الواتساب المباشر الجديد
const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=+271686779846713@lid';

const paymentText = 
💳 *jesee.store:*

🇮🇶 : Zain Cash
🇯🇴 : Click / Orange 
🇹🇷 : Zekeriya Alvi (TR85...7550 01)
🇸🇾 : Sham Cash (USD / SYP)
💰 : 
- USDT TRC20 (TEWch...GPrmP)
- USDT BEP20 (0xe25...f38b)
🇪🇬 : Vodafone Cash
🇴🇲 : Bank Muscat
🇲🇦 : Bank Al-Maghrib
🇵🇸 : Bank of Palestine
;

bot.start((ctx) => {
    const name = ctx.from.first_name || "User";
    const user = ctx.from.username || "No Username";

    // Admin Notification
    bot.telegram.sendMessage(ADMIN_ID, "🔔 New User: " + name + "\n🆔 ID: " + user)
    .catch(err => console.log("Error"));

    // Welcome Interface
    ctx.replyWithMarkdown(
        *jesee.store* 🌟,
        Markup.inlineKeyboard([
            [Markup.button.url('🌐 Website', WEBSITE_URL)],
            [Markup.button.url('💬 WhatsApp', WHATSAPP_URL)],
            [Markup.button.callback('💳 Payments', 'show_payments')]
        ])
    );
});

bot.action('show_payments', (ctx) => {
    ctx.replyWithMarkdown(paymentText);
});

bot.launch()
    .then(() => console.log("✅ Live"))
    .catch((err) => console.log("❌ Error"));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
