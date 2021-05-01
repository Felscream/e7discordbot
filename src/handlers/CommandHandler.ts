import { Message, TextChannel, MessageEmbed } from "discord.js";
import displayHelp from "./HelpHandler";
import { displayHeroes, displayHero } from "./HeroHandler";
import handleReport from "./ReportHandler";

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
      .split(" ")
      .filter((arg) => arg.length > 0);
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
      case "help":
        displayHelp(message, args);
        break;
      case "report":
        handleReport(message, args);
        break;
      default:
        console.log("Unrecognized command");
        break;
    }
  }

  isCommand(message: string) {
    return message.startsWith(this.prefix);
  }
}

export default CommandHandler;
