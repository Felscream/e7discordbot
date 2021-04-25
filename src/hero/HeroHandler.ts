import { Message, MessageEmbed } from "discord.js";
import createHeroEmbed from "../embeds/HeroEmbed";
import HeroListMenu from "../menus/HeroListMenu";
import { getHeroesList, getHeroById } from "./HeroService";
import { HeroSummary } from "./model/heroSummary";

async function displayHeroes(message: Message) {
  const menu = new HeroListMenu(message.channel, message.author.id);
  menu.start();
}

async function displayHero(args: string[]): Promise<MessageEmbed> {
  let heroes: HeroSummary[] = [];
  try {
    heroes = await getHeroesList();
  } catch (e) {
    return;
  }
  const heroName = args.join(" ");
  const requestedHero: HeroSummary = heroes.find(
    (hero) =>
      hero.name
        .toLowerCase()
        .localeCompare(heroName.toLowerCase(), "en", { sensitivity: "base" }) ==
      0
  );
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

export { displayHeroes, displayHero };
