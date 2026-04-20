const TelegramBot = require('node-telegram-bot-api');

// توكن البوت الخاص بك
const token = '8692737754:AAGW7-qFJSSKDR87K2n52InE6pRWLXjEulM';
// الآيدي الرقمي الخاص بك لاستلام التنبيهات
const myChatId = '7149506332'; 

const bot = new TelegramBot(token, { 
  polling: { params: { offset: -1 } } 
});

const whatsappNumber = "905342572605";
const websiteUrl = "https://jesee.store/"; 

// دالة لإرسال تنبيه لك (لصاحب المتجر)
function notifyOwner(action, user) {
  const adminMessage = 🚨 **تنبيه جديد من البوت:**\n\n +
                       👤 **العميل:** ${user.first_name} ${user.last_name || ''}\n +
                       🆔 **الآيدي:** ${user.id}\n +
                       🔗 **اليوزر:** @${user.username || 'لا يوجد'}\n +
         الإجراء:  ⚡ **الإجراء:** ${action};
  bot.sendMessage(myChatId, adminMessage);
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const user = msg.from;

  // إرسال تنبيه لك عند دخول عميل جديد
  notifyOwner("بدأ المحادثة الآن (Start) 🆕", user);

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '💳 طرق الدفع وسحب الرواتب', callback_data: 'payment_list' }],
        [{ text: '🌐 زيارة موقعنا الإلكتروني', url: websiteUrl }],
        [{ text: '💬 تواصل عبر الواتساب', url: 'https://wa.me/' + whatsappNumber }],
        [{ text: '📍 موقعنا الجغرافي', callback_data: 'send_location' }]
      ]
    }
  };

  const welcomeMessage = "أهلاً بك في متجر الجيسي ستور! 🏪🌍\n\n" +
                         "نحن نوفر خدمات الشحن، البطاقات الإلكترونية، وسحب الرواتب في كافة أنحاء الوطن العربي.\n\n" +
                         "يرجى اختيار القسم المطلوب من الأزرار أدناه:";

  bot.sendMessage(chatId, welcomeMessage, options);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const user = query.from;

  if (query.data === 'payment_list') {
    // إرسال تنبيه لك بأن العميل ضغط على زر الدفع
    notifyOwner("يريد معرفة (طرق الدفع وسحب الرواتب)
