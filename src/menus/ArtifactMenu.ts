import { DMChannel, NewsChannel, TextChannel } from "discord.js";
import { Menu } from "discord.js-menu";
import createArtifactEmbed from "../embeds/ArtifactEmbed";
import Artifact from "../artifact/model/Artifact";
import config from "../../config.json";

class ArtifactMenu {
  private channel: TextChannel | DMChannel | NewsChannel;
  private author: string;
  private menu: Menu;
  private artifact: Artifact;

  constructor(
    channel: TextChannel | DMChannel | NewsChannel,
    author: string,
    artifact: Artifact
  ) {
    this.channel = channel;
    this.author = author;
    this.artifact = artifact;
  }

  start() {
    this.menu = new Menu(
      this.channel,
      this.author,
      this.createPages(),
      config.menuReactionWaitTime
    );
    this.menu.start();
  }

  private createPages(): any[] {
    const pages: any[] = [];
    this.artifact.enhancements.forEach((enhancement, index) =>
      pages.push(this.createPage(index))
    );
    return pages;
  }

  private createPage(level: number): any {
    const name = level.toString();
    const content = createArtifactEmbed(this.artifact, level);
    const reactions = {
      "⏮": "first",
      "⏪": "previous",
      "⏸️": `${Math.floor(this.artifact.enhancements.length / 2)}`,
      "⏩": "next",
      "⏭": "last",
    };
    return { name, content, reactions };
  }
}

export default ArtifactMenu;
