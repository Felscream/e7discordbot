import HeroListCache from "./HeroListCache";
import { getHeroes } from "../Epicsevendb";
import { HeroSummary } from "./model/heroSummary";
import { Entry } from "../utility/Cache";
import config from "../../config.json";
import { differenceInDays } from "date-fns";

const cacheKey = "H";
const cache = new HeroListCache();

async function getHeroesList(): Promise<HeroSummary[]> {
  let cachedValue = cache.get(cacheKey);

  let heroes: HeroSummary[] = [];
  if (isCacheValid(cachedValue)) {
    if (isCacheExpired(cachedValue)) {
      console.log("cache expired");
    }
    console.log("cache is empty");
    heroes = await getHeroes();
    console.log(heroes.length);
    cache.put(cacheKey, heroes, new Date());
  } else {
    console.log("cache is not empty");
    heroes = cachedValue.value;
    console.log(heroes.length);
  }
  return heroes;
}

function isCacheValid(cachedValue: Entry<HeroSummary[]>) {
  return cachedValue === undefined || isCacheExpired(cachedValue);
}

function isCacheExpired(entry: Entry<HeroSummary[]>): boolean {
  if (entry === undefined) {
    return true;
  }
  return (
    differenceInDays(new Date(), entry.creationDate) >
    config.heroListConservation
  );
}

export { getHeroesList };
