import { Message, TextChannel, MessageEmbed } from "discord.js";
import { displayHeroes, displayHero } from "./hero/HeroHandler";

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

    const args = message.content
      .slice(this.prefix.length)
      .trim()
      .toLowerCase()
      .split(" ");
    const command = args.shift();

    console.log("command: ", command);
    console.log(args);

    switch (command) {
      case "heroes":
        displayHeroes(message, args);
        break;
      case "h":
      case "hero":
        const embed = await displayHero(args);
        if (embed !== null) {
          message.channel.send(embed);
        }
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
