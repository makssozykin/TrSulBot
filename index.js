const { Telegraf, Markup } = require("telegraf");

const API_key = "7032003348:AAEIPg4FLZG3SI0X6vRmAL2OtUUzi-HA5qE";

const bot = new Telegraf(API_key);

bot.command("start", (ctx) => {
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
      ["Електроенергія", "Газ", "Квартал СТ Троянда"],
    ]).resize(),
  });
});

bot.hears("Електроенергія", (ctx) => {
  ctx.reply(
    "Тариф за 1кВт:\n день 07:00-23:00 - 4,84 грн,\n нічь 23:00-07:00 - 2,69 грн. \nРеквізити для сплати: \nОдержувач: ГО СТ Троянда \nIBAN: UA293226690000026003300432129 \nЄДРПОУ: 25656049", // \n - перенести на нову строку
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

bot.launch();
