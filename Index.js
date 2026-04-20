const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

const ADMIN_ID = '7149506332';
const WEBSITE_URL = 'https://jesee.store/';
const WHATSAPP_URL = 'https://wa.me/905432572606';

bot.start((ctx) => {
    const name = ctx.from.first_name || "عميل";
    const user = ctx.from.username || "بدون يوزر";

    // تنبيه بسيط للأدمن
    bot.telegram.sendMessage(ADMIN_ID, "تنبيه: عميل جديد\nالاسم: " + name + "\nاليوزر: " + user)
    .catch(err => console.log("خطأ في التنبيه"));

    // رسالة الترحيب
    ctx.reply("أهلاً بك في متجر jesee.store 🌟", Markup.inlineKeyboard([
        [Markup.button.url('🌐 زيارة موقعنا الإلكتروني', WEBSITE_URL)],
        [Markup.button.url('💬 تواصل عبر واتساب', WHATSAPP_URL)]
    ]));
});

bot.launch()
    .then(() => console.log("✅ يعمل بنجاح"))
    .catch((err) => console.log("❌ فشل التشغيل"));
