import { HeroPreview } from "../menus/HeroListMenu";
const sortAlphabetically = function (a: HeroPreview, b: HeroPreview): number {
  if (a.name > b.name) {
    return 1;
  }

  if (a.name < b.name) {
    return -1;
  }

  return 0;
};

const sortByRarity = function (a: HeroPreview, b: HeroPreview): number {
  return Math.sign(b.rarity - a.rarity);
};

class HeroSorter {
  public static sortHeroes(
    hero: HeroPreview[],
    sortKey: string[]
  ): HeroPreview[] {
    switch (sortKey[0]) {
      case "a":
        return hero.sort(sortAlphabetically);
      case "s":
      default:
        return hero.sort(sortByRarity);
    }
  }
}

export default HeroSorter;
