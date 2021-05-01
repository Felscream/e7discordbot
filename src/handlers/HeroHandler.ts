import { Message, MessageEmbed } from "discord.js";
import createHeroEmbed from "../embeds/HeroEmbed";
import { HeroListMenu } from "../menus/HeroListMenu";
import { getHeroesList, getHeroById } from "../hero/HeroService";
import { HeroSummary } from "../hero/model/heroSummary";
import findHeroId from "../hero/HeroFinder";
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
    process.stdout.write(`Looking for hero with id '${heroId}'\n`);
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

export { displayHeroes, displayHero };
