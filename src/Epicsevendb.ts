import config from "../config.json";
import axios from "axios";
import HeroMapper from "./hero/HeroMapper";
import { HeroSummary } from "./hero/model/heroSummary";
import { Hero } from "./hero/model/Hero";
async function getHeroes(): Promise<HeroSummary[]> {
  let response = null;
  try {
    response = await axios.get(config.heroesUrl);
  } catch (exception) {
    process.stderr.write(
      `ERROR received from ${config.heroesUrl}: ${exception}\n`
    );
    const error = new Error("Error getting list of available heroes");
    console.log("Error: ", error);
    throw error;
  }

  const heroes: HeroSummary[] = [];
  for (let hero in response.data.results) {
    heroes.push(HeroMapper.mapHeroSummary(response.data.results[hero]));
  }
  return heroes;
}

async function getHero(id: string): Promise<Hero> {
  let response = null;
  const url = config.heroUrl + id;
  try {
    response = await axios.get(url);
  } catch (exception) {
    process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
    const error = new Error(`Error getting hero data for id ${id}`);
    console.log("Error: ", error);
    throw error;
  }

  if (response.data !== undefined && response.data.results.length > 0) {
    return await HeroMapper.mapHero(response.data.results[0]);
  }
  const error = new Error(`Received no hero result data for id ${id}`);
  console.log("Error: ", error);
  throw error;
}

export { getHeroes, getHero };
