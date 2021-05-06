import { Message, TextChannel, MessageEmbed } from "discord.js";
import config from "../../config.json";
import displayHelp from "./HelpHandler";
import { displayHeroes, displayHero } from "./HeroHandler";
import { displayArtifacts } from "./ArtifactHandler";
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
    const originalParameters = this.buildOriginalParameters(message);

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
        } else {
          message.reply(
            `Could not find hero with name '${originalParameters}'`
          );
        }
        break;
      case "help":
        displayHelp(message, args);
        break;
      case "report":
        if (config.environement == "dev") {
          handleReport(message, args);
        }
        break;
      case "artifacts":
        displayArtifacts(message, args);
        break;
      case "d":
        if (config.environement == "dev") {
          const exampleEmbed = new MessageEmbed()
            .setTitle("Some title")
            .attachFiles(["resources/art5_5_fu.png"])
            .setImage(
              "https://assets.epicsevendb.com/_source/item_arti/art5_5_fu.png"
            );

          message.channel.send({ embed: exampleEmbed });
        }
        break;
      default:
        console.log("Unrecognized command");
        break;
    }
  }

  isCommand(message: string) {
    return message.startsWith(this.prefix);
  }

  buildOriginalParameters(message: Message) {
    let originalParameters = message.content
      .slice(this.prefix.length)
      .trim()
      .split(" ");
    originalParameters.shift();
    return originalParameters.join(" ");
  }
}

export default CommandHandler;
