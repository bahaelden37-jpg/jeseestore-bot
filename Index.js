const TelegramBot = require('node-telegram-bot-api');

// Your Token and Admin ID
const token = '8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM';
const myChatId = '7149506332'; 

const bot = new TelegramBot(token, { 
  polling: { params: { offset: -1 } } 
});

const whatsappNumber = "905342572605";
const websiteUrl = "https://jesee.store/"; 

// Admin Notification Function (English for stability)
function notifyAdmin(action, user) {
  const adminLog = Admin Alert:\nUser: ${user.first_name}\nID: ${user.id}\nAction: ${action};
  bot.sendMessage(myChatId, adminLog);
}

bot.onText(/\/start/, (msg) => {
  const user = msg.from;
  notifyAdmin("Started the Bot (New User)", user);

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '💳 طرق الدفع وسحب الرواتب', callback_data: 'pay_methods' }],
        [{ text: '🌐 زيارة موقعنا الإلكتروني', url: websiteUrl }],
        [{ text: '💬 تواصل عبر الواتساب', url: 'https://wa.me/' + whatsappNumber }]
      ]
    }
  };
  
  const welcomeText = "أهلاً بك في متجر الجيسي ستور! 🏪🌍\n\nيرجى اختيار القسم المطلوب من الأزرار أدناه:";
  bot.sendMessage(msg.chat.id, welcomeText, options);
});

bot.on('callback_query', (query) => {
  const user = query.from;

  if (query.data === 'pay_methods') {
    notifyAdmin("Interested in Payment Methods", user);
    
    bot.answerCallbackQuery(query.id, { text: "Loading..." });
    
    const paymentInfo = "💰 قائمة طرق الدفع وسحب الرواتب المتاحة:\n\n" +
                        "• العراق: زين كاش\n" +
                        "• سوريا: شام كاش، حوالات\n" +
                        "• تركيا: بنك تركيا\n" +
                        "• العملات الرقمية: USDT\n\n" +
                        "📞 للتفاصيل، تواصل معنا عبر الواتساب.";
                        
    bot.sendMessage(query.message.chat.id, paymentInfo, { parse_mode: 'Markdown' });
  }
});

console.log("Bot is running successfully with stable encoding...");
