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
    const modules = [this.generateHeroModule(), this.generateArtifactModule()];
    modules.forEach((module, index) =>
      module.content.setFooter(`${index + 1}/${modules.length}`)
    );
    return modules;
  }

  private generateHeroModule(): Module {
    const heroesDescription = new Description(
      "heroes",
      "Lists available heroes. "
    );
    const heroDescription = new Description(
      "h|hero <hero name>",
      "Displays hero data. You can navigate to a hero's skills from there."
    );

    const commands = [heroesDescription, heroDescription];
    const content = new MessageEmbed()
      .setTitle("Louis XVII Bot - Commands - Hero Module")
      .setDescription(this.buildHelpContent(commands));

    const reactions = {
      "⏮": "first",
      "⏪": "previous",
      "⏩": "next",
      "⏭": "last",
    };
    return new Module("hero", content, reactions);
  }

  private generateArtifactModule(): Module {
    const artifactsDescription = new Description(
      "artifacts",
      "Lists available artifacts"
    );

    const artifactDescription = new Description(
      "a|artifact",
      "Displays artifact data. You can navigate through the artefact's enhancements."
    );

    const commands = [artifactsDescription, artifactDescription];
    const content = new MessageEmbed()
      .setTitle("Louis XVII Bot - Commands - Artifact Module")
      .setDescription(this.buildHelpContent(commands));

    const reactions = {
      "⏮": "first",
      "⏪": "previous",
      "⏩": "next",
      "⏭": "last",
    };

    return new Module("artifact", content, reactions);
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

class Module {
  name: string;
  content: MessageEmbed;
  reactions: any;
  constructor(name: string, content: MessageEmbed, reactions: any) {
    this.name = name;
    this.content = content;
    this.reactions = reactions;
  }
}

export default HelpMenu;
