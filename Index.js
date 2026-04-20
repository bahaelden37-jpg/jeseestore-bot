const TelegramBot = require('node-telegram-bot-api');

// توكن البوت الخاص بك
const token = '8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM';

// رابط الخدمة على ريندر (تأكد أنه الرابط الصحيح)
const URL = 'https://jeseestore-bot-4.onrender.com';

const bot = new TelegramBot(token, {
  webHook: {
    port: process.env.PORT || 10000
  }
});

// هذه هي الخطوة التي كان فيها الخطأ (تم تصحيح الأقواس هنا)
bot.setWebHook(${URL}/secret-path);

// رد البوت عند كتابة /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "أهلاً بك في متجر الجيسي ستور لخدمات الشحن وسحب الرواتب!");
});

// رد البوت على أي رسالة أخرى
bot.on('message', (msg) => {
  if (msg.text
