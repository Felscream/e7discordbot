import * as Config from "../config.json";
import CommandHandler from "./CommandHandler";
import Discord from "discord.js";

const bot = new Discord.Client();

const commandHandler = new CommandHandler(Config.prefix);

bot.on("ready", () => {
  console.log("bot is ready");
  bot.user.setPresence({ status: "online" });
  bot.user.setActivity(`${Config.prefix}help to view commands`, {
    type: "WATCHING",
  });
});

bot.on("message", (message) => {
  if (message.author.id !== bot.user.id) {
    commandHandler.handleMessage(message);
  }
});

bot.login(Config.token);
