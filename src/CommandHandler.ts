import { Message, TextChannel, MessageEmbed } from "discord.js";
import { displayHeroes, getHeroes } from "./hero/HeroHandler";

class CommandHandler {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  async handleMessage(message: Message) {
    if (!this.isCommand(message.content)) {
      console.log("Not a command");
      return;
    }

    const args = message.content.slice(this.prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    console.log("command: ", command);
    console.log(args);

    switch (command) {
      case "ego":
        message.react("😀");
        message.reply("wow, what a great post");
        break;
      case "clear":
        let num = 2;

        if (args[0]) {
          num = parseInt(args[0]) + 1;
        }

        const channel = <TextChannel>message.channel;
        channel.bulkDelete(num);
        message.channel.send(`deleted  ${num - 1} posts for you`);
        break;
      case "embed":
        const embed = new MessageEmbed()
          .setColor("#efe117")
          .setTitle("Embed testing")
          .setThumbnail(
            "https://assets.epicsevendb.com/_source/face/c1100_s.png"
          );
        message.channel.send(embed);
        break;
      case "hero":
        displayHeroes(message);
        break;
      default:
        console.log("Unrecognized command");
    }
  }

  isCommand(message: string) {
    return message.startsWith(this.prefix);
  }
}

export default CommandHandler;
