import Config from "../../config.json";
import { HeroSummary } from "./model/heroSummary";
import levensthein from "../utility/Levensthein";
import HeroAliases from "../../resources/unitAliases.json";

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

export default findHeroId;
