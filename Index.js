const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

const ADMIN_ID = '7149506332';
const WEBSITE_URL = 'https://jesee.store/';
const WA_1 = 'https://wa.me/905342572606';
const WA_2 = 'https://wa.me/963993777353';

bot.start((ctx) => {
    const firstName = ctx.from.first_name || "User";
    const username = ctx.from.username ? @${ctx.from.username} : "No Username";

    bot.telegram.sendMessage(ADMIN_ID, 🔔 *New User*\n👤 Name: ${firstName}\n🔗 User: ${username}, { parse_mode: 'Markdown' })
    .catch(e => console.log("Admin Alert Error"));

    ctx.replyWithMarkdown(
        *WELCOME TO JESEE.STORE* 🌟\n\nPlease share your contact to continue:,
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
    const phoneNumber = ctx.contact.phone_number;
    bot.telegram.sendMessage(ADMIN_ID, ✅ *New Phone*\n📞 Phone: \${phoneNumber}\``, { parse_mode: 'Markdown' });
    ctx.reply("Done!", Markup.removeKeyboard());
});

bot.action('pay', (ctx) => {
    ctx.replyWithMarkdown(💳 *jesee.store:*\n\n🇮🇶 Zain Cash\n🇯🇴 Click\n🇹🇷 Zekeriya Alvi\n🇸🇾 Sham Cash\n💰 USDT\n🇪🇬 Vodafone Cash\n🇴🇲 Bank Muscat\n🇲🇦 Bank Al-Maghrib\n🇵🇸 Bank of Palestine);
});

bot.launch();

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bot is Live');
}).listen(process.env.PORT || 8080);

console.log("✅ LIVE");
