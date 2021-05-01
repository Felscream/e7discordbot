import { Channel, MessageEmbed } from "discord.js";
import { Menu } from "discord.js-menu";
import config from "../../config.json";

class HelpMenu {
  private channel: Channel;
  private author: string;
  private menu: Menu;

  constructor(channel: Channel, author: string) {
    this.channel = channel;
    this.author = author;
  }

  start(args: string[]) {
    this.menu = new Menu(
      this.channel,
      this.author,
      this.generateHelpMenu(),
      config.menuReactionWaitTime
    );
    this.menu.start();
  }

  private generateHelpMenu(): any[] {
    const heroesDescription = new Description(
      "heroes",
      "Lists available heroes"
    );
    const heroDescription = new Description(
      "h|hero <hero name>",
      "Displays hero data"
    );
    const reportDescription = new Description(
      "report <speed>|<ally1>,<ally2>,<ally3>,<team cp>|<enemy1>,<enemy2>,<enemy3>, <enemy cp>|<match result>",
      "Reports a guild war match results\n*speed* your fastest unit speed\n*Match result accepted values* : \n*VICTORY* -> w, v, win, victory, victoire\n*DRAW* -> e, draw, egalite\n*LOSS* -> l, loss, lose, defeat, defaite"
    );

    const commands = [heroesDescription, heroDescription, reportDescription];
    const content = new MessageEmbed()
      .setTitle("Louis XVII Bot - Commands")
      .setDescription(this.buildHelpContent(commands));

    return [{ name: "help", content: content, reactions: {} }];
  }

  private buildHelpContent(descriptions: Description[]) {
    let helpContent = "";
    descriptions.forEach((description) => {
      helpContent += `**${config.prefix}${description.command}**\n${description.description}\n\n`;
    });
    return helpContent;
  }
}

class Description {
  command: string;
  description: string;
  constructor(command: string, description: string) {
    this.command = command;
    this.description = description;
  }
}

export default HelpMenu;
