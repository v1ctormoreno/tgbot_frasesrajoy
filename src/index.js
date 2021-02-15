const { Telegraf } = require("telegraf");
const bot = new Telegraf("1573558765:AAFfcNyhCqpokMFDjME4MzFiCZHKMO90j7M");
console.log("Bot is running");
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();
