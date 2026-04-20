const TelegramBot = require('node-telegram-bot-api');

// توكن البوت الخاص بك
const token = '8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM';

const bot = new TelegramBot(token, {
  polling: true
});

// رقم الواتساب الأساسي
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

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'payment_list') {
    const paymentText = 💰 **قائمة طرق الدفع وسحب الرواتب:**\n\n +
                        🇮🇶 العراق: زين كاش (إدارة: 05342572606)\n +
                        🇯🇴 الأردن: كليك بنك، أورانج مني\n +
                        🇸🇾 سوريا: شام كاش، حوالات (Muhammed Allavi)\n +
                        🇹🇷 تركيا: بنك تركيا (Zekeriya Alvi)، وش مني\n +
                        🇪🇬 مصر: فودافون كاش\n +
                        🇲🇦 المغرب: بنك المغرب (Soumia Aissaoui)\n +
                        🇴🇲 عمان: بنك مسقط (Ahli Islamic)\n\n +
                        🌐 عملات رقمية: USDT (TRC20 / BEP20)\n +
                        📲 سحب رواتب: سول ستار، بوتا، زينا، ياهو، جونكو.\n\n +
                        📞 للتفاصيل، تواصل معنا عبر الواتساب.;

    bot.sendMessage(chatId, paymentText, { parse_mode: 'Markdown' });
  }

  if (data === 'send_location') {
    bot.sendLocation(chatId, 33.5138, 36.2765);
  }

  bot.answerCallbackQuery(query.id);
});

console.log("البوت يعمل الآن بنجاح...");
