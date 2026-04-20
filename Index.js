const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// Updated Bot Token
const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

// Admin IDs
const ADMINS = ['7149506332', '8549868909'];

// Function to notify admins
const sendToAdmins = (text) => {
    ADMINS.forEach(id => {
        bot.telegram.sendMessage(id, text).catch(e => console.log("Admin Notification Failed"));
    });
};

bot.telegram.deleteWebhook().then(() => {

    // Main Menu
    bot.start((ctx) => {
        const welcomeText = "Welcome to jesee.store 🌟\nPlease select a service:";
        ctx.reply(welcomeText, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 Games Top-up', 'menu_games')],
                [Markup.button.callback('📺 TV Apps', 'menu_tv')],
                [Markup.button.callback('💰 Salary Withdrawal', 'menu_salary')],
                [Markup.button.callback('📞 Telecom Services', 'menu_telecom')],
                [Markup.button.callback('🌐 Social Media', 'menu_social')],
                [Markup.button.callback('🪙 Crypto', 'menu_crypto')],
                [Markup.button.callback('💻 Software', 'menu_soft'), Markup.button.callback('✨ Others', 'menu_misc')],
                [Markup.button.url('🔗 Official Website', 'https://jesee.store/')]
            ])
        );
    });

    // Salary Menu
    bot.action('menu_salary', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("💰 Withdrawal Methods:", Markup.inlineKeyboard([
            [Markup.button.callback('Wish Money 🧧', 'req_wish')],
            [Markup.button.callback('Sham Cash 💳', 'req_sham')],
            [Markup.button.callback('Perfect Money 💎', 'req_perfect')],
            [Markup.button.callback('⬅️ Back to Home', 'go_home')]
        ]));
    });

    // Request Logic
    bot.action(/^req_/, (ctx) => {
        const method = ctx.callbackQuery.data.replace('req_', '').toUpperCase();
        const adminMsg = 📥 *New Order*\n\n👤 User: ${ctx.from.first_name}\n🆔 ID: \${ctx.from.id}\\n🛠 Service: ${method};
        
        sendToAdmins(adminMsg);
        ctx.answerCbQuery();
        ctx.reply("✅ Your request has been sent! Our team will contact you soon.");
    });

    // Home Navigation
    bot.action('go_home', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        bot.handleUpdate(ctx.update);
    });

    bot.launch();
    console.log("Jesee Store Bot is running with the new token...");
});

// Port binding for Render
http.createServer((req, res) => {
    res.write('Bot is Live and Active');
    res.end();
}).listen(process.env.PORT || 8080);
