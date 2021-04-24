const BotConfig = require("./config/config");
const CommandHandler = require("./commandHandler");
const Discord = require("discord.js");
const bot = new Discord.Client();

const commandHandler = new CommandHandler(BotConfig.config.prefix);

bot.on("ready", () => {
  console.log("bot is ready");
});

bot.on("message", (message) => {
  commandHandler.handleMessage(message);
});

bot.login(BotConfig.config.token);
