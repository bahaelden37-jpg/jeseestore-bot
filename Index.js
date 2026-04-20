const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// Bot Token
const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

// Admin IDs
const ADMINS = ['7149506332', '8549868909'];

// Notification function
const sendToAdmins = (text) => {
    ADMINS.forEach(id => {
        bot.telegram.sendMessage(id, text).catch(e => console.log("Notify Error"));
    });
};

bot.telegram.deleteWebhook().then(() => {

    // Main Menu
    bot.start((ctx) => {
        ctx.reply("Welcome to jesee.store 🌟\nSelect a category:", 
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
            [Markup.button.callback('Wish Money', 'req_wish')],
            [Markup.button.callback('Sham Cash', 'req_sham')],
            [Markup.button.callback('Perfect Money', 'req_perfect')],
            [Markup.button.callback('⬅️ Back to Home', 'go_home')]
        ]));
    });

    // Request Handling
    bot.action(/^req_/, (ctx) => {
        const method = ctx.callbackQuery.data.replace('req_', '').toUpperCase();
        const userName = ctx.from.first_name || "User";
        const userId = ctx.from.id;
        
        // Simple string joining to avoid Syntax Errors on line 50
        const adminMsg = "📥 New Order\n\nUser: " + userName + "\nID: " + userId + "\nService: " + method;
        
        sendToAdmins(adminMsg);
        ctx.answerCbQuery();
        ctx.reply("✅ Your request has been sent! We will contact you soon.");
    });

    // Navigation
    bot.action('go_home', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        bot.handleUpdate(ctx.update);
    });

    bot.launch();
    console.log("Bot status: Running");
});

// Port binding for Render
http.createServer((req, res) => {
    res.write('Bot is Active');
    res.end();
}).listen(process.env.PORT || 8080);
