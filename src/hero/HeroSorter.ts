import Summary from "../utility/Summary";
const sortAlphabetically = function (a: Summary, b: Summary): number {
  if (a.getName() > b.getName()) {
    return 1;
  }

  if (a.getName() < b.getName()) {
    return -1;
  }

  return 0;
};

const sortByRarity = function (a: Summary, b: Summary): number {
  return Math.sign(b.getRarity() - a.getRarity());
};

class SummarySorter {
  public static sortHeroes(summary: Summary[], sortKey: string[]): Summary[] {
    switch (sortKey[0]) {
      case "a":
        return summary.sort(sortAlphabetically);
      case "s":
      default:
        return summary.sort(sortByRarity);
    }
  }
}

export default SummarySorter;
