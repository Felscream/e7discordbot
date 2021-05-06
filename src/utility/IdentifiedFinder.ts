import Config from "../../config.json";
import levensthein from "./Levensthein";
import HeroAliases from "../../resources/unitAliases.json";
import Identified from "src/utility/Identified";
import { O_DIRECT } from "node:constants";

function findId<T extends Identified>(
  query: string,
  identifiers: T[],
  aliases: any = undefined
): string {
  let id = aliases !== undefined ? findIdWithAliases(query, aliases) : "";

  if (id.length === 0) {
    id = findIdWithName(query, identifiers);
  }

  return id.trim();
}

function findIdWithName<T extends Identified>(
  input: string,
  identifiers: T[]
): string {
  if (input.length > Config.levenstheinMaxLength) {
    const identified = identifiers.find(
      (identifier) => identifier.getName() === input
    );
    return identified === undefined ? "" : identified.getId();
  }

  let score = Number.MAX_VALUE;
  let foundId: string = "";
  for (let i = 0; i < identifiers.length; i++) {
    let idScore = levensthein(input, identifiers[i].getName(), true);
    if (idScore == 0) {
      return identifiers[i].getId();
    }
    if (idScore <= Config.typoTolerance && idScore < score) {
      score = idScore;
      foundId = identifiers[i].getId();
    }
  }

  return foundId;
}

function findIdWithAliases(alias: string, aliases: any): string {
  for (let entry in aliases) {
    if (aliases[entry].alias.includes(alias)) {
      return aliases[entry].id;
    }
  }
  return "";
}

export default findId;
