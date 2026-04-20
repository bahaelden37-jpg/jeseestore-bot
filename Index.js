const TelegramBot = require('node-telegram-bot-api');

// توكن البوت الخاص بك
const token = '8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM';

const bot = new TelegramBot(token, {
  polling: true
});

// رقم الواتساب الأساسي للتواصل
const whatsappNumber = "905342572605";

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  const welcomeMessage = أهلاً بك في متجر الجيسي ستور! 🏪🌍\n\n +
                         نحن نوفر خدمات الشحن، البطاقات الإلكترونية، وسحب الرواتب في كافة أنحاء الوطن العربي.\n\n +
                         يرجى اختيار القسم المطلوب من الأزرار أدناه:;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '💳 طرق الدفع وسحب الرواتب', callback_data: 'payment_list' }],
        [{ text: '💬 تواصل عبر الواتساب', url: https://wa.me/${whatsappNumber} }],
        [{ text: '📍 موقعنا الجغرافي', callback_data: 'send_location' }]
      ]
    }
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

// معالجة الضغط على الأزرار
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'payment_list') {
    const paymentText = 💰 **قائمة طرق الدفع وسحب الرواتب:**\n\n +
                        🇮🇶 **العراق:** زين كاش (تواصل مع الإدارة 05342572606)\n +
                        🇯🇴 **الأردن:** كليك بنك، أورانج مني\n +
                        🇸🇾 **سوريا:** شام كاش (ليرة ودولار)، قسم الحوالات (Muhammed Allavi)\n +
             تركيا: 🇹🇷 **تركيا:** بنك تركيا (Zekeriya Alvi)، وش مني\n +
             مصر:   🇪🇬 **مصر:** فودافون كاش\n +
             فلسطين:🇵🇸 **فلسطين:** بنك فلسطين\n +
             المغرب:🇲🇦 **المغرب:** بنك المغرب (Soumia Aissaoui)\n +
             عمان:  🇴🇲 **عمان:** بنك مسقط (Ahli Islamic Bank)\n +
                        🇩🇿 **الجزائر:** متوفر التواصل مع الدعم\n\n +
                        🌐 **العملات الرقمية:** USDT (TRC20 / BEP20)\n +
                        📲 **سحب رواتب التطبيقات:** (سول ستار، بوتا لايف، زينا لايف، ياهو شات، جونكو)\n\n +
                        📞 للاستفسار عن أي وسيلة أخرى أو طلب تفاصيل الحسابات، تواصل معنا مباشرة.;

    bot.sendMessage(chatId, paymentText, { parse_mode: 'Markdown' });
  }

  if (data === 'send_location') {
    // إحداثيات الموقع
    bot.sendLocation(chatId, 33.5138, 36.2765);
  }

  bot.answerCallbackQuery(query.id);
});

console.log("الخدمة تعمل الآن بنجاح لخدمة الوطن العربي...");
