import { Message } from "discord.js";
import { getHeroesList } from "./HeroService";
import { HeroSummary } from "./model/heroSummary";
import config from "../../config.json";
import HeroListMenu from "../menus/HeroListMenu";

async function getHeroes(): Promise<HeroSummary[]> {
  return await getHeroesList();
}

async function displayHeroes(message: Message) {
  const menu = new HeroListMenu(message.channel, message.author.id);
  menu.start();
}

export { getHeroes, displayHeroes };
