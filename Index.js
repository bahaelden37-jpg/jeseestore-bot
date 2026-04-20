const { Telegraf, Markup } = require('telegraf');

// التوكن الخاص بك
const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM');

// معرف حسابك للتنبيهات
const ADMIN_ID = '7149506332';
const WEBSITE_URL = 'https://jesee.store/';
const WHATSAPP_URL = 'https://wa.me/905432572606';

bot.start((ctx) => {
    const userName = ctx.from.first_name || "عميل";
    // تصحيح السطر الذي كان يسبب الخطأ
    const userUsername = ctx.from.username ? @${ctx.from.username} : "بدون يوزر";

    // تنبيه للأدمن
    bot.telegram.sendMessage(ADMIN_ID, 
        🔔 *تنبيه: عميل جديد!*\n\n👤 الاسم: ${userName}\n🆔 اليوزر: ${userUsername}\n🔢 ID: \${ctx.from.id}\``, 
        { parse_mode: 'Markdown' }
    ).catch(err => console.log("خطأ في تنبيه الأدمن: ", err));

    // رسالة الترحيب
    ctx.replyWithMarkdown(
        أهلاً بك في متجر *jesee.store* 🌟\n\nنحن هنا لخدمتك، يمكنك اختيار ما يناسبك من الأزرار أدناه:,
        Markup.inlineKeyboard([
            [Markup.button.url('🌐 زيارة موقعنا الإلكتروني', WEBSITE_URL)],
            [Markup.button.url('💬 تواصل عبر واتساب', WHATSAPP_URL)],
            [Markup.button.callback('💳 طرق الدفع المتاحة', 'payment_methods')]
        ])
    );
});

bot.action('payment_methods', (ctx) => {
    ctx.replyWithMarkdown(
        💰 *أبرز طرق الدفع المتوفرة:*\n• زين كاش العراق\n• بنك تركيا وكليك الأردن\n• USDT (العملات الرقمية)\n• فودافون كاش مصر
    );
});

bot.launch()
    .then(() => console.log("✅ يعمل بنجاح"))
    .catch((err) => console.error("❌ فشل التشغيل: ", err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
