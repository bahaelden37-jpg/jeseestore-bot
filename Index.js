const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// Your Bot Token
const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2|N52InE6pRWRWLXjEulM');

// Admin IDs
const ADMINS = ['7149506332', '8549868909'];

// Function to notify admins
const sendToAdmins = (msg) => {
    ADMINS.forEach(id => {
        bot.telegram.sendMessage(id, msg, { parse_mode: 'Markdown' }).catch(e => console.log("Admin Notify Error"));
    });
};

bot.telegram.deleteWebhook().then(() => {

    // 1. Main Menu (Start Command)
    bot.start((ctx) => {
        const welcomeMsg = "Welcome to jesee.store 🌟\nPlease choose a category from the menu below:";
        ctx.reply(welcomeMsg, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 Game Top-up', 'games_menu')],
                [Markup.button.callback('📺 TV Applications', 'tv_apps')],
                [Markup.button.callback('💰 Salary Withdrawal', 'salary_menu')],
                [Markup.button.callback('📞 Telecommunications', 'telecom_menu')],
                [Markup.button.callback('🌐 Social Media Services', 'social_menu')],
                [Markup.button.callback('🪙 Cryptocurrency', 'crypto_menu')],
                [Markup.button.callback('💻 Software', 'software_menu'), Markup.button.callback('✨ Misc Services', 'misc_services')],
                [Markup.button.url('🔗 Official Website', 'https://jesee.store/')]
            ])
        );
    });

    // 2. Salary Withdrawal Menu
    bot.action('salary_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("💰 Salary Withdrawal Services:\nPlease select your preferred delivery method:", Markup.inlineKeyboard([
            [Markup.button.callback('Wish Money 🧧', 'req_wish')],
            [Markup.button.callback('Sham Cash 💳', 'req_sham')],
            [Markup.button.callback('Perfect Money 💎', 'req_perfect')],
            [Markup.button.callback('⬅️ Back to Main Menu', 'main_menu')]
        ]));
    });

    // 3. Handling Service Requests (Prefix: req_)
    bot.action(/^req_/, (ctx) => {
        const service = ctx.callbackQuery.data.replace('req_', '');
        sendToAdmins(📥 *New Request Received:*\n👤 Customer: ${ctx.from.first_name}\n🆔 ID: \${ctx.from.id}\\n🛠 Service: ${service.toUpperCase()});
        ctx.answerCbQuery();
        ctx.reply("✅ Your request has been received successfully. Our support team will contact you shortly.");
    });

    // 4. Return to Main Menu
    bot.action('main_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        ctx.reply("jesee.store Main Menu:", 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 Game Top-up', 'games_menu')],
                [Markup.button.callback('📺 TV Applications', 'tv_apps')],
                [Markup.button.callback('💰 Salary Withdrawal', 'salary_menu')],
                [Markup.button.callback('⬅️ Show All Categories', 'restart_bot')]
            ])
        );
    });

    // 5. Restart Bot Menu
    bot.action('restart_bot', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        bot.handleUpdate(ctx.update);
    });

    bot.launch();
});

// HTTP Server for Render Port Binding
http.createServer((req, res) => {
    res.write('Jesee Store Bot is Online');
    res.end();
}).listen(process.env.PORT || 8080);
