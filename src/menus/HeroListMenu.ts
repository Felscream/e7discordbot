import { Channel, MessageEmbed } from "discord.js";
import { Menu } from "discord.js-menu";
import { getHeroesList } from "../hero/HeroService";
import { Attribute, Role } from "../hero/model/characteristics";
import config from "../../config.json";
import * as resources from "../../resources/embedResources.json";
import HeroSorter from "../hero/HeroSorter";

class HeroListMenu {
  private channel: Channel;
  private author: string;
  private menu: Menu;

  constructor(channel: Channel, author: string) {
    this.channel = channel;
    this.author = author;
  }

  async start(args: string[]) {
    const pages = await this.generatePages(args);
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

  private async generatePages(args: string[]): Promise<any[]> {
    let heroes: HeroPreview[] = [];
    try {
      heroes = await getHeroesList();
    } catch (e) {
      return [];
    }
    const sortedHeroes = HeroSorter.sortHeroes(heroes, args);
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

export { HeroListMenu, HeroPreview };
