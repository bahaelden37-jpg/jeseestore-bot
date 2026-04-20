const TelegramBot = require('node-telegram-bot-api');

// توكن البوت الخاص بك
const token = '8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM';

// رابط الخدمة الجديد من واقع صورتك الأخيرة
const URL = 'https://jeseestore-bot-5.onrender.com';

const bot = new TelegramBot(token, {
  polling: true
});

// رسالة ترحيب عند تشغيل البوت
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "أهلاً بك في متجر الجيسي ستور! كيف يمكنني مساعدتك اليوم؟");
});

// الرد على أي رسالة
bot.on('message', (msg) => {
  if (msg.text !== '/start') {
    bot.sendMessage(msg.chat.id, "تم استلام رسالتك في متجر الجيسي، سنرد عليك في أقرب وقت ممكن.");
  }
});

console.log("الخدمة تعمل الآن بنجاح...");
