import config from "../config.json";
import axios from "axios";
import HeroSummaryMapper from "./hero/heroSummaryMapper";
import { HeroSummary } from "./hero/model/heroSummary";
const url = config.epicsevendb;
const heroesUrl = url + "hero";

async function getHeroes(): Promise<HeroSummary[]> {
  let response = null;
  try {
    response = await axios.get(heroesUrl);
  } catch (exception) {
    process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
    return null;
  }

  const heroes: HeroSummary[] = [];
  for (let hero in response.data.results) {
    heroes.push(HeroSummaryMapper.mapHeroSummary(response.data.results[hero]));
  }
  return heroes;
}

export { getHeroes };
