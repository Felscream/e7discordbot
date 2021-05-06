import { Channel, MessageEmbed } from "discord.js";
import { Menu } from "discord.js-menu";
import { getHeroesList } from "../hero/HeroService";
import { Attribute, Role } from "../hero/model/characteristics";
import config from "../../config.json";
import * as resources from "../../resources/embedResources.json";
import HeroSorter from "../hero/HeroSorter";
import { HeroSummary } from "../hero/model/heroSummary";
import Summary from "../utility/Summary";

class SummaryMenu {
  private channel: Channel;
  private author: string;
  private menu: Menu;
  private summary: Summary[];
  private title: string;

  constructor(
    channel: Channel,
    author: string,
    summary: Summary[],
    title: string
  ) {
    this.channel = channel;
    this.author = author;
    this.summary = summary;
    this.title = title;
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
    const sortedSummary = HeroSorter.sortHeroes(this.summary, args);
    const pagesNb = Math.ceil(sortedSummary.length / config.heroesPerPage);
    let pages: any[] = [];
    for (let i = 0; i < pagesNb; i++) {
      const startIndex = i * config.heroesPerPage;
      const endIndex = Math.min(
        startIndex + config.heroesPerPage,
        sortedSummary.length
      );
      const content = new MessageEmbed()
        .setTitle(this.title)
        .setDescription(
          SummaryMenu.generatePageContent(
            sortedSummary.slice(startIndex, endIndex),
            startIndex + 1
          )
        )
        .setFooter(
          SummaryMenu.buildFooter(i + 1, pagesNb, sortedSummary.length)
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
    summaries: Summary[],
    startIndex: number
  ): string {
    return summaries
      .map((summary, index) => {
        let display = `**${startIndex + index}.** [`;
        for (let i = 0; i < summary.getRarity(); i++) {
          display += "\u2605";
        }
        display +=
          "]" + resources.roleEmoji[summary.getRole()] + summary.getName();

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

export { SummaryMenu };
