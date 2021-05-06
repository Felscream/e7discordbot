import { DMChannel, NewsChannel, TextChannel } from "discord.js";
import { Menu } from "discord.js-menu";
import createHeroEmbed from "../embeds/HeroEmbed";
import { Hero } from "../hero/model/Hero";
import config from "../../config.json";
import createSkillEmbed from "../embeds/SkillEmbed";

class HeroMenu {
  private channel: TextChannel | DMChannel | NewsChannel;
  private author: string;
  private menu: Menu;
  private hero: Hero;

  constructor(
    channel: TextChannel | DMChannel | NewsChannel,
    author: string,
    hero: Hero
  ) {
    this.channel = channel;
    this.author = author;
    this.hero = hero;
  }

  async start() {
    this.menu = new Menu(
      this.channel,
      this.author,
      this.createPage(),
      config.menuReactionWaitTime
    );
    this.menu.start();
  }

  private createPage(): any[] {
    const name = this.hero.name;
    const content = createHeroEmbed(this.hero);
    content.setFooter("Select a number below to view skill details");
    const reactions = {
      "1️⃣": () => this.channel.send(createSkillEmbed(this.hero, 0)),
      "2️⃣": () => this.channel.send(createSkillEmbed(this.hero, 1)),
      "3️⃣": () => this.channel.send(createSkillEmbed(this.hero, 2)),
    };
    return [{ name, content, reactions }];
  }
}

export default HeroMenu;
