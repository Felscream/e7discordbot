import { Message, MessageEmbed } from "discord.js";
import levensthein from "../utility/Levensthein";
import createHeroEmbed from "../embeds/HeroEmbed";
import { HeroListMenu } from "../menus/HeroListMenu";
import { getHeroesList, getHeroById } from "./HeroService";
import { HeroSummary } from "./model/heroSummary";
import Config from "../../config.json";

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
  let requestedHero: HeroSummary = findHeroWithName(heroName, heroes);
  if (requestedHero === undefined) {
    console.log("No result for search request '" + args.join(" ") + "'");
    return null;
  }

  const hero = await getHeroById(requestedHero.id);
  if (hero !== null) {
    return createHeroEmbed(hero);
  }

  return null;
}

function findHeroWithName(input: string, heroes: HeroSummary[]): HeroSummary {
  let score = Number.MAX_VALUE;
  let hero: HeroSummary = undefined;
  for (let i = 0; i < heroes.length; i++) {
    let heroScore = levensthein(input, heroes[i].name, true);
    if (heroScore == 0) {
      return heroes[i];
    }
    if (heroScore <= Config.typoTolerance && heroScore < score) {
      score = heroScore;
      hero = heroes[i];
    }
  }

  return hero;
}

export { displayHeroes, displayHero };
