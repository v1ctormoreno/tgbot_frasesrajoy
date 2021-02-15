const TelegramBot = require("node-telegram-bot-api");
const GoogleImages = require("google-images");
/*const googleImages = new GoogleImages(
  "",
  ""
);*/
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
console.log(process.env.BOT_TOKEN);
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
console.log("Mire ushté, el bot se ha iniciado.");
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
/*
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});
*/
/*
const welcomemsg =
  "*Bienvenido al bot de Frases de Rajoy*  \n *Frases disponibles* \n `/rajoy` Devuelve una foto de rajoy`\n/vecino` Devuelve una frase de rajoy donde dice... son los vecinos los que eligen...";
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, welcomemsg, { parse_mode: "markdown" });
});
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, welcomemsg, { parse_mode: "markdown" });
});
*/
bot.onText(/\/rajoy/, (msg) => {
    bot.sendPhoto(
    msg.chat.id,
    "https://cronicaglobal.elespanol.com/uploads/s1/90/63/35/7/mariano-rajoy-deporte.png"
  );
    const results =  googleImages.search("Mariano Rajoy")
    .then();
    const reply = !results.length ?
      "No results" :
      new Attachment(results[Math.floor(Math.random() * results.length)].url);
     console.log(reply);

});

bot.onText(/\/vecino/, (msg) => {
  const frasePath = path.join(__dirname, "../frases/rajoyvecinoalcalde.ogg");
  console.log(frasePath);
  const properties = {
    caption:
      "Es el vecino el que elige al alcalde y es el alcalde el que quiere que sean los vecinos el alcalde",
  };
  const buffer = fs.readFileSync(frasePath);
  bot.sendAudio(msg.chat.id, buffer, properties);
});

bot.onText(/\/chuches/, (msg) => {
  const frasePath = path.join(__dirname, "../frases/loschuches.ogg");
  console.log(frasePath);
  const properties = {
    caption: "Va a subir el IVA de los chuches!",
  };
  const buffer = fs.readFileSync(frasePath);
  bot.sendAudio(msg.chat.id, buffer, properties);
});
bot.onText(/\/catalanes/, (msg) => {
  const frasePath = path.join(__dirname, "../frases/catalanes.ogg");
  console.log(frasePath);
  const properties = {
    caption: "Me gusta cataluña, me gustan sus gentes...",
  };
  const buffer = fs.readFileSync(frasePath);
  bot.sendAudio(msg.chat.id, buffer, properties);
});
bot.on("polling_error", (error) => {
  console.log(error.code); // => 'EFATAL'
});
