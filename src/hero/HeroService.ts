import HeroListCache from "./HeroListCache";
import { getHeroes, getHero } from "../Epicsevendb";
import { HeroSummary } from "./model/heroSummary";
import { Entry } from "../utility/Cache";
import config from "../../config.json";
import { differenceInDays } from "date-fns";
import { Hero } from "./model/Hero";
import HeroCache from "./HeroCache";

import fs from "fs";

const heroListCacheKey = "H";
const heroListCache = new HeroListCache();
const heroCache = new HeroCache();

async function getHeroesList(): Promise<HeroSummary[]> {
  let heroes = heroListCache.get(heroListCacheKey);

  if (heroes === undefined) {
    console.log("cache is empty");
    heroes = await getHeroes();
    if (heroes !== undefined && heroes.length > 0) {
      heroListCache.put(heroListCacheKey, heroes, new Date());
    }
  } else {
    console.log("cache is not empty");
  }

  return heroes;
}

async function getHeroById(heroId: string) {
  let hero = heroCache.get(heroId);
  if (hero === undefined) {
    hero = await getHero(heroId);
    if (hero !== undefined) {
      heroCache.put(heroId, hero, new Date());
    }
  } else {
    console.log("Getting hero " + heroId + " from cache");
  }
  return hero;
}

export { getHeroesList, getHeroById };
