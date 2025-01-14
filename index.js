const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

// token fetched using @boatfather to create a bot

const TOKEN = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, { polling: true });
bot.on("message", (msg) => {
  const text = msg.text;
  console.log("message received", text);
  bot.sendMessage(msg.chat.id, "you said" + text);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to the bot");
});
bot.onText(/\/joke/, async (msg) => {
  const joke = await axios.get(
    "https://official-joke-api.appspot.com/random_joke"
  );
  const setup = joke.data.setup;
  const punchline = joke.data.punchline;

  bot.sendMessage(msg.chat.id, setup + " " + punchline);
});
