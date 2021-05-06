import config from "../config.json";
import axios from "axios";
import HeroMapper from "./hero/HeroMapper";
import { HeroSummary } from "./hero/model/heroSummary";
import { Hero } from "./hero/model/Hero";
import { mapArtifact, mapArtifactSummary } from "./artifact/ArtifactMapper";
import ArtifactSummary from "./artifact/model/ArtifactSummary";
import Artifact from "./artifact/model/Artifact";

async function getHeroes(): Promise<HeroSummary[]> {
  let response = null;
  try {
    response = await axios.get(config.heroesUrl);
  } catch (exception) {
    process.stderr.write(
      `ERROR received from ${config.heroesUrl}: ${exception}\n`
    );
    const error = new Error("Error getting list of available heroes");
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
  const url = config.heroesUrl + id;
  try {
    response = await axios.get(url);
  } catch (exception) {
    process.stderr.write(
      `ERROR received from ${url}: ${exception}\nError getting hero with id '${id}'\n`
    );
    const error = new Error(`Error getting hero with id '${id}'`);
    throw error;
  }

  if (response.data !== undefined && response.data.results.length > 0) {
    return HeroMapper.mapHero(response.data.results[0]);
  }
  const error = new Error(`Received no hero result with id '${id}'\n`);
  throw error;
}

async function getArtifacts(): Promise<ArtifactSummary[]> {
  let response = null;
  try {
    response = await axios.get(config.artifactsUrl);
  } catch (exception) {
    process.stderr.write(
      `ERROR received from ${config.artifactsUrl}: ${exception}\n`
    );
    const error = new Error("Error getting list of available artifacts");
    throw error;
  }

  const artifacts: ArtifactSummary[] = [];
  for (let artifact in response.data.results) {
    artifacts.push(mapArtifactSummary(response.data.results[artifact]));
  }

  return artifacts;
}

async function getArtifact(id: string): Promise<Artifact> {
  let response = null;
  const url = config.artifactsUrl + id;
  try {
    response = await axios.get(url);
  } catch (exception) {
    process.stderr.write(
      `ERROR received from ${url}: ${exception}\nError getting artifact with id '${id}'\n`
    );
    const error = new Error(`Error getting artifact with id '${id}'`);
    throw error;
  }

  if (response.data !== undefined && response.data.results.length > 0) {
    return mapArtifact(response.data.results[0]);
  }
  const error = new Error(`Received no artifact result with id '${id}'\n`);
  throw error;
}

export { getHeroes, getHero, getArtifacts, getArtifact };
