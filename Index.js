const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// Replace with your real bot token
const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWRWLXjEulM');

// Admin IDs
const ADMINS = ['7149506332', '8549868909'];

// Function to notify admins
const sendToAdmins = (text) => {
    ADMINS.forEach(id => {
        bot.telegram.sendMessage(id, text).catch(e => console.log("Error notifying admin"));
    });
};

bot.telegram.deleteWebhook().then(() => {

    // Main Menu
    bot.start((ctx) => {
        ctx.reply("Welcome to jesee.store 🌟\nSelect a category:", 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 Games', 'menu_games')],
                [Markup.button.callback('📺 TV Apps', 'menu_tv')],
                [Markup.button.callback('💰 Salary', 'menu_salary')],
                [Markup.button.callback('📞 Telecom', 'menu_telecom')],
                [Markup.button.callback('🌐 Social Media', 'menu_social')],
                [Markup.button.callback('🪙 Crypto', 'menu_crypto')],
                [Markup.button.callback('💻 Software', 'menu_soft'), Markup.button.callback('✨ Misc', 'menu_misc')],
                [Markup.button.url('🔗 Website', 'https://jesee.store/')]
            ])
        );
    });

    // Salary Menu
    bot.action('menu_salary', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("Choose payment method:", Markup.inlineKeyboard([
            [Markup.button.callback('Wish Money', 'req_wish')],
            [Markup.button.callback('Sham Cash', 'req_sham')],
            [Markup.button.callback('Perfect Money', 'req_perfect')],
            [Markup.button.callback('⬅️ Back', 'main_home')]
        ]));
    });

    // Request Handling
    bot.action(/^req_/, (ctx) => {
        const type = ctx.callbackQuery.data.replace('req_', '');
        const user = ctx.from.first_name || "User";
        const msg = "New Order: " + type + "\nFrom: " + user + "\nID: " + ctx.from.id;
        
        sendToAdmins(msg);
        ctx.answerCbQuery();
        ctx.reply("✅ Order received! We will contact you soon.");
    });

    // Back to Main
    bot.action('main_home', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        bot.handleUpdate(ctx.update);
    });

    bot.launch();
    console.log("Bot is running...");
});

// Basic server for Render
http.createServer((req, res) => {
    res.write('Bot is Online');
    res.end();
}).listen(process.env.PORT || 8080);
