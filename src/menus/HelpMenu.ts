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
    const content = new MessageEmbed().setTitle("Louis XVII Bot - Commands")
      .setDescription(`**${config.prefix}heroes**\nLists available heroes\n\n
      **${config.prefix}hero [hero name]**\nDisplays hero data`);

    return [{ name: "help", content: content, reactions: {} }];
  }
}

export default HelpMenu;
