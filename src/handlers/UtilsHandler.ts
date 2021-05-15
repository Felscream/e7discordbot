import fs from "fs";
import { getHeroesList } from "../hero/HeroService";
import aliases from "../../resources/unitAliases.json";
import { toNamespacedPath } from "node:path";

async function handleUtility(args: string[]) {
  if (args[0] === "alias_diff") {
    await generateAliasDiff();
  }
}

async function generateAliasDiff() {
  const currentAliases = aliases.aliases.map((alias) => alias.id);
  const updatedHeroList = await getHeroesList(true);
  const diff = updatedHeroList
    .filter((hero) => !currentAliases.includes(hero.getId()))
    .map((hero) => {
      return { id: hero.getId(), alias: [] };
    });
  fs.writeFile(
    `./resources/aliasDiff${new Date().toString()}.json`,
    `${JSON.stringify(diff)}`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
  diff.forEach((unit) => aliases.aliases.push(unit));
  aliases.aliases.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }

    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });

  fs.writeFile(
    "./resources/unitAliases.json",
    JSON.stringify(aliases),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  console.log(diff);
}

export default handleUtility;
