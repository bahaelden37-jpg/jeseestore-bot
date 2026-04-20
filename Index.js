const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// توكن البوت الخاص بك
const bot = new Telegraf('8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWRWLXjEulM');

// معرفات الإدارة لتلقي التنبيهات
const ADMINS = ['7149506332', '8549868909'];

// دالة لإرسال الإشعارات للإدارة
const sendToAdmins = (msg) => {
    ADMINS.forEach(id => {
        bot.telegram.sendMessage(id, msg, { parse_mode: 'Markdown' }).catch(e => console.log("خطأ في إرسال تنبيه للإدارة"));
    });
};

// معالجة الأخطاء وتنظيف الـ Webhook عند التشغيل
bot.telegram.deleteWebhook().then(() => {

    // القائمة الرئيسية (عند كتابة /start)
    bot.start((ctx) => {
        ctx.reply(أهلاً بك في متجر jesee.store 🌟\nالرجاء اختيار القسم المطلوب من القائمة أدناه:, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
                [Markup.button.callback('📺 تطبيقات التلفزيون', 'tv_apps')],
                [Markup.button.callback('💰 سحب رواتب', 'salary_menu')],
                [Markup.button.callback('📞 الاتصالات', 'telecom_menu')],
                [Markup.button.callback('🌐 سوشيال ميديا', 'social_menu')],
                [Markup.button.callback('🪙 العملات الرقمية', 'crypto_menu')],
                [Markup.button.callback('💻 سوفتوير', 'software_menu'), Markup.button.callback('✨ خدمات متنوعة', 'misc_services')],
                [Markup.button.url('🔗 الموقع الرسمي', 'https://jesee.store/')]
            ])
        );
    });

    // --- قسم سحب الرواتب ---
    bot.action('salary_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply("💰 خدمات سحب الرواتب المتاحة:\nيرجى اختيار وسيلة التسليم:", Markup.inlineKeyboard([
            [Markup.button.callback('تسليم عبر ويش مني 🧧', 'req_salary_wish')],
            [Markup.button.callback('تسليم عبر شام كاش 💳', 'req_salary_sham')],
            [Markup.button.callback('تسليم عبر Perfect Money 💎', 'req_salary_perfect')],
            [Markup.button.callback('⬅️ رجوع للقائمة الرئيسية', 'main_menu')]
        ]));
    });

    // --- معالجة طلبات الخدمات (Prefix: req_) ---
    bot.action(/^req_/, (ctx) => {
        const serviceName = ctx.callbackQuery.data.replace('req_', '').replace(/_/g, ' ');
        sendToAdmins(📥 *طلب جديد مستلم:*\n👤 العميل: ${ctx.from.first_name}\n🆔 المعرف: \${ctx.from.id}\\n🛠 الخدمة: ${serviceName.toUpperCase()});
        ctx.answerCbQuery();
        ctx.reply("✅ تم استلام طلبك بنجاح. سيقوم فريق الدعم بالتواصل معك لإكمال الإجراءات قريباً.");
    });

    // --- العودة للقائمة الرئيسية ---
    bot.action('main_menu', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        // إعادة إرسال القائمة الأساسية
        ctx.reply(قائمة متجر jesee.store الرئيسية:, 
            Markup.inlineKeyboard([
                [Markup.button.callback('🎮 شحن الألعاب', 'games_menu')],
                [Markup.button.callback('📺 تطبيقات التلفزيون', 'tv_apps')],
                [Markup.button.callback('💰 سحب رواتب', 'salary_menu')],
                [Markup.button.callback('⬅️ عرض كافة الأقسام', 'restart_bot')]
            ])
        );
    });

    // زر إعادة تشغيل القائمة بالكامل
    bot.action('restart_bot', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage().catch(() => {});
        bot.handleUpdate(ctx.update);
    });

    // تشغيل البوت
    bot.launch().then(() => console.log("Bot is running..."));

}).catch(err => console.error("Webhook Error: ", err));

// إنشاء سيرفر بسيط لضمان عمل البوت على استضافة Render دون توقف
http.createServer((req, res) => {
    res.write('Jesee Store Bot Status: Online');
    res.end();
}).listen(process.env.PORT || 8080);
