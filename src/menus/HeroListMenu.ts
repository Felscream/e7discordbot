import { Channel, MessageEmbed } from "discord.js";
import { Menu } from "discord.js-menu";
import { getHeroesList } from "../hero/HeroService";
import { Attribute, Role } from "../hero/model/characteristics";
import config from "../../config.json";
import * as resources from "../../resources/resources.json";

class HeroListMenu {
  private channel: Channel;
  private author: string;
  private menu: Menu;

  constructor(channel: Channel, author: string) {
    this.channel = channel;
    this.author = author;
  }

  async start() {
    const pages = await this.generatePages();
    if (pages.length > 0) {
      this.menu = new Menu(
        this.channel,
        this.author,
        pages,
        config.menuReactionWaitTime
      );
      this.menu.start();
    }
  }

  private static async getSortedHeroes(): Promise<HeroPreview[]> {
    const heroes = await getHeroesList();
    return heroes
      .map(
        (value) =>
          new HeroPreview(value.name, value.attribute, value.rarity, value.role)
      )
      .sort((a, b) => HeroListMenu.sortAlphabetically(a, b));
  }

  private async generatePages(): Promise<any[]> {
    let sortedHeroes: HeroPreview[] = [];
    try {
      sortedHeroes = await HeroListMenu.getSortedHeroes();
    } catch (e) {
      return [];
    }
    const pagesNb = Math.ceil(sortedHeroes.length / config.heroesPerPage);
    let pages: any[] = [];
    for (let i = 0; i < pagesNb; i++) {
      const startIndex = i * config.heroesPerPage;
      const endIndex = Math.min(
        startIndex + config.heroesPerPage,
        sortedHeroes.length
      );
      const content = new MessageEmbed()
        .setTitle("Hero list")
        .setDescription(
          HeroListMenu.generatePageContent(
            sortedHeroes.slice(startIndex, endIndex),
            startIndex + 1
          )
        )
        .setFooter(
          HeroListMenu.buildFooter(i + 1, pagesNb, sortedHeroes.length)
        );
      const page = {
        name: `${i}`,
        content: content,
        reactions: {
          "⏮": "first",
          "⏪": "previous",
          "⏩": "next",
          "⏭": "last",
        },
      };
      pages.push(page);
    }
    return pages;
  }

  private static generatePageContent(
    heroes: HeroPreview[],
    startIndex: number
  ): string {
    return heroes
      .map((hero, index) => {
        let display = `**${startIndex + index}.** [`;
        for (let i = 0; i < hero.rarity; i++) {
          display += "\u2605";
        }
        display += "]" + resources.roleEmoji[hero.role] + hero.name;

        return display;
      })
      .join("\n");
  }

  private static buildFooter(
    pageNumber: number,
    totalPages: number,
    results: number
  ): string {
    return `Page ${pageNumber}/${totalPages} | Results: ${results}`;
  }

  private static sortAlphabetically(a: HeroPreview, b: HeroPreview): number {
    if (a.name > b.name) {
      return 1;
    }

    if (a.name < b.name) {
      return -1;
    }

    return 0;
  }
}

class HeroPreview {
  name: string;
  attribute: Attribute;
  rarity: number;
  role: Role;
  constructor(name: string, attribute: Attribute, rarity: number, role: Role) {
    this.name = name;
    this.attribute = attribute;
    this.rarity = rarity;
    this.role = role;
  }
}

export default HeroListMenu;
