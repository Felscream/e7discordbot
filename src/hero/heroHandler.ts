import HeroListCache from "./heroListCache";
import { getHeroes } from "../epicsevendb";
import { HeroSummary } from "./model/heroSummary";
import { Entry } from "../utility/Cache";
import config from "../../config.json";
import { differenceInDays } from "date-fns";
const cacheKey = "H";
const cache = new HeroListCache();

async function getHeroesList(): Promise<HeroSummary[]> {
  let cachedValue = cache.get(cacheKey);

  if (cachedValue === undefined || isCacheExpired(cachedValue)) {
    if (isCacheExpired(cachedValue)) {
      console.log("cache expired");
    }
    console.log("cache is empty");
    let list = await getHeroes();
    console.log(list.length);
    cache.put(cacheKey, list, new Date());
  } else {
    console.log("cache is not empty");
    let heroes = cachedValue.value;
    console.log(heroes.length);
    return heroes;
  }
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
