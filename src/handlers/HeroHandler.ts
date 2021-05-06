import { Message, MessageEmbed } from "discord.js";
import { SummaryMenu } from "../menus/SummaryMenu";
import { getHeroesList, getHeroById } from "../hero/HeroService";
import { HeroSummary } from "../hero/model/heroSummary";
import findId from "../utility/IdentifiedFinder";
import { Hero } from "../hero/model/Hero";
import HeroMenu from "../menus/HeroMenu";
import HeroAliases from "../../resources/unitAliases.json";

async function displayHeroes(message: Message, args: string[]) {
  let heroes: HeroSummary[] = [];
  try {
    heroes = await getHeroesList();
  } catch (e) {
    console.log(e);
    heroes = [];
  }
  if (heroes.length > 0) {
    const menu = new SummaryMenu(
      message.channel,
      message.author.id,
      heroes,
      "Hero list"
    );
    menu.start(args);
  } else {
    message.reply(
      "An error occured while getting the list of available heroes"
    );
  }
}

async function displayHero(message: Message, args: string[]): Promise<any> {
  let heroes: HeroSummary[] = [];
  const heroName = args.join(" ");
  try {
    heroes = await getHeroesList();
  } catch (e) {
    console.log(e);
    message.reply(`Could not find hero with name '${heroName}'`);
    return;
  }

  const heroId = findId(heroName, heroes, HeroAliases.aliases);

  if (heroId.length === 0) {
    console.log("No result for search request '" + heroName + "'");
    message.reply(`Could not find hero with name '${heroName}'`);
    return;
  }

  let hero: Hero;
  try {
    process.stdout.write(`Looking for hero with id '${heroId}'\n`);
    hero = await getHeroById(heroId);
  } catch (e) {
    console.log(e);
    console.log("No result for search request '" + heroName + "'");
    message.reply(`Could not find hero with name '${heroName}'`);
    return;
  }

  if (hero === undefined) {
    console.log("No result for search request '" + heroName + "'");
    message.reply(`Could not find hero with name '${heroName}'`);
    return;
  }

  const menu = new HeroMenu(message.channel, message.author.id, hero);
  menu.start();
}

export { displayHeroes, displayHero };
