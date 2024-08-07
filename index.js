const { Telegraf, Markup } = require("telegraf");

const bot_token = "7032003348:AAEIPg4FLZG3SI0X6vRmAL2OtUUzi-HA5qE";

const bot = new Telegraf(bot_token);

bot.start((ctx) => {
  ctx.reply("Вибіріть, що Вас цікавить!", {
    reply_markup: Markup.keyboard([
      ["Cплатити", "Послуги"],
      ["Транспорт", "Об'яви"],
    ]).resize(),
  });
});

bot.hears("Cплатити", (ctx) => {
  ctx.reply("Сплатити за ", {
    reply_markup: Markup.keyboard([
      ["Електроенергія", "Газ"],
      ["Квартал СТ Троянда", "Повернутися до головне меню"],
    ]).resize(),
  });
});
bot.hears("Повернутися до головне меню", (ctx) => {
  ctx.reply("Вибіріть, що Вас цікавить!", {
    reply_markup: Markup.keyboard([
      ["Cплатити", "Послуги"],
      ["Транспорт", "Об'яви"],
    ]).resize(),
  });
});

bot.hears("Електроенергія", (ctx) => {
  ctx.reply(
    "Тариф за 1кВт:\n день 07:00-23:00 - 4,84 грн,\n нічь 23:00-07:00 - 2,69 грн. \nРеквізити для сплати: \nОдержувач: ГО СТ Троянда \nIBAN: UA293226690000026003300432129 \nЄДРПОУ: 25656049", // \n - перенести на нову строку, \n\n - перенести на 2 строки вниз
    {
      reply_markup: Markup.keyboard([
        ["Повернутися до попереднього вибору"],
      ]).resize(),
    }
  );
  ctx.replyWithPhoto({ source: "./image/payment_details.jpg" });
});

bot.hears("Повернутися до попереднього вибору", (ctx) => {
  ctx.reply("Сплатити за ", {
    reply_markup: Markup.keyboard([
      ["Електроенергія", "Газ", "Квартал СТ Троянда"],
      ["Повернутися в меню"],
    ]).resize(),
  });
});

bot.hears("Повернутися в меню", (ctx) => {
  ctx.reply("Вибіріть, що Вас цікавить!", {
    reply_markup: Markup.keyboard([
      ["Cплатити", "Послуги"],
      ["Транспорт", "Об'яви"],
    ]).resize(),
  });
});

bot.launch().then(() => {
  console.log("Бот стартував!");
});

bot.hears("Послуги", (ctx) => {
  ctx.reply("Виберіть послугу...", {
    reply_markup: Markup.keyboard([
      ["Ремонт холодильників", "Ремонт насосної станції"],
      ["Ремонт газових котлів", "Викачка вигрібної ями"],
      ["Повернутися в меню"],
    ]).resize(),
  });
});

//* Відправка номера телефона як посилання з можливістю визову через телефон
bot.hears("Ремонт холодильників", async (ctx) => {
  await ctx.reply(
    `Анатолій Григорович: <a href="tel:+380976967409">+380976967409</a>`,
    {
      parse_mode: "HTML",
    }
  );
  await ctx.replyWithPhoto({ source: "./image/repairing_refrigerators.jpg" });
});

bot.hears("Ремонт насосної станції", async (ctx) => {
  await ctx.reply(
    `Ігор: <a href="tel:+380962393354">+380962393354</a>` +
      "\n" +
      `Володимир: <a href="tel:+380677772705">+380677772705</a>`,
    {
      parse_mode: "HTML",
    }
  );
});

bot.hears("Ремонт газових котлів", async (ctx) => {
  await ctx.reply(
    "ЧП І.Т.А.В сервісний центр" +
      "\n" +
      `Ірина директор: <a href="tel:+380676829537" rel="bookmark">+380676829537</a>` +
      "\n" +
      `Олександр майстер: <a href="tel:+380687782460">+380687782460</a>`,
    {
      parse_mode: "HTML",
    }
  );
});

// bot.hears("Викачка вигрібної ями", async (ctx) => {
//   const textAsLink = "+380969452082";
//   const textAsLink1 = "+380950721305";
//   const link = `https://t.me/your_bot?start=${encodeURIComponent(textAsLink)}`;
//   const link1 = `https://t.me/your_bot?start=${encodeURIComponent(
//     textAsLink1
//   )}`;

//   await ctx.replyWithHTML(
//     `Сергій <a href="tel:${link}">${textAsLink}</a>/n<a href="tel:${link1}">${textAsLink1}</a>`,
//     {
//       parse_mode: "HTML",
//     }
//   );
// });

bot.hears("Викачка вигрібної ями", async (ctx) => {
  // Вариант 2: Отправка ссылки в тексте (менее надежно)
  await ctx.reply(
    "3,6 куба: " +
      "\n" +
      `Сергій: <a href="tel:+380969452082">+380969452082</a> або <a href="tel:+380950721305">+380950721305</a>` +
      "\n" +
      "5+ кубів: " +
      "\n" +
      `Геворг: <a href="tel:+380688697303">+380688697303</a>`,
    {
      parse_mode: "HTML",
    }
  );
});

// bot.hears("Викачка вигрібної ями", async (ctx) => {
//   const phoneNumber = "+380969452082"; // Замените на нужный номер

//   // Вариант 1: Кнопка "Позвонить"
//   const keyboard = [[{ text: "Позвонить", url: `tel:${phoneNumber}` }]];
//   await ctx.reply("Позвоните мне:", {
//     reply_markup: { inline_keyboard: keyboard },
//   });

//   // Вариант 2: Отправка ссылки в тексте (менее надежно)
//   // await ctx.reply(`Позвоните по номеру: <a href="tel:${phoneNumber}">${phoneNumber}</a>`, { parse_mode: 'HTML' });
// });
