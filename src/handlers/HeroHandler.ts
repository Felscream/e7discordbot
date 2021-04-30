import { Message, MessageEmbed } from "discord.js";
import levensthein from "../utility/Levensthein";
import createHeroEmbed from "../embeds/HeroEmbed";
import { HeroListMenu } from "../menus/HeroListMenu";
import { getHeroesList, getHeroById } from "../hero/HeroService";
import { HeroSummary } from "../hero/model/heroSummary";
import Config from "../../config.json";
import HeroAliases from "../../resources/unitAliases.json";
import { Hero } from "../hero/model/Hero";

async function displayHeroes(message: Message, args: string[]) {
  const menu = new HeroListMenu(message.channel, message.author.id);
  menu.start(args);
}

async function displayHero(args: string[]): Promise<MessageEmbed> {
  let heroes: HeroSummary[] = [];
  try {
    heroes = await getHeroesList();
  } catch (e) {
    return;
  }
  const heroName = args.join(" ");

  let heroId = findHeroId(heroName, heroes);

  if (heroId.length === 0) {
    console.log("No result for search request '" + args.join(" ") + "'");
    return null;
  }

  let hero: Hero;
  try {
    process.stdout.write(`Looking for hero with id '${heroId}'`);
    hero = await getHeroById(heroId);
  } catch (e) {
    console.log("No result for search request '" + args.join(" ") + "'");
    return null;
  }

  if (hero === null) {
    console.log("No result for search request '" + args.join(" ") + "'");
    return null;
  }

  return createHeroEmbed(hero);
}

function findHeroIdWithName(input: string, heroes: HeroSummary[]): string {
  if (input.length > Config.levenstheinMaxLength) {
    return "";
  }

  let score = Number.MAX_VALUE;
  let heroId: string = "";
  for (let i = 0; i < heroes.length; i++) {
    let heroScore = levensthein(input, heroes[i].name, true);
    if (heroScore == 0) {
      return heroes[i].id;
    }
    if (heroScore <= Config.typoTolerance && heroScore < score) {
      score = heroScore;
      heroId = heroes[i].id;
    }
  }

  return heroId;
}

function findHeroId(heroName: string, heroes: HeroSummary[]): string {
  let heroId = findHeroWithAlias(heroName);

  if (heroId.length === 0) {
    heroId = findHeroIdWithName(heroName, heroes);
  }

  return heroId.trim();
}

function findHeroWithAlias(alias: string): string {
  const aliases = HeroAliases.aliases;
  for (let entry in HeroAliases.aliases) {
    if (aliases[entry].alias.includes(alias)) {
      return aliases[entry].id;
    }
  }
  return "";
}

export { displayHeroes, displayHero };
