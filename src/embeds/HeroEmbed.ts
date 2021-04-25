import { MessageEmbed } from "discord.js";
import DevotionHelper from "../hero/DevotionHelper";
import { Devotion, DevotionType } from "../hero/model/characteristics";
import * as resources from "../../resources/resources.json";
import { Hero } from "../hero/model/Hero";

function createHeroEmbed(hero: Hero): MessageEmbed {
  return new MessageEmbed()
    .setTitle(buildTitle(hero))
    .setURL(hero.epicsevendb)
    .setColor(resources.attributeColor[hero.attribute])
    .setDescription(buildHeroInformation(hero))
    .setThumbnail(hero.icon);
}

function buildTitle(hero: Hero): string {
  let title = "[";
  for (let i = 0; i < hero.rarity; i++) {
    title += "\u2605";
  }
  title += `] ${hero.name}`;
  return title;
}

function buildHeroInformation(hero: Hero): string {
  return [buildGeneralInformation(hero), "\u200B", buildImprintInfo(hero)].join(
    "\n"
  );
}

function buildGeneralInformation(hero: Hero): string {
  return [buildRole(hero), buildElement(hero), buildZodiac(hero)].join("\n");
}

function buildRole(hero: Hero): string {
  return (
    "**Class: **" + resources.roleEmoji[hero.role] + " " + capitalize(hero.role)
  );
}

function buildElement(hero: Hero): string {
  return (
    "**Element: **" +
    resources.attribute[hero.attribute] +
    " " +
    capitalize(hero.attribute)
  );
}

function buildZodiac(hero: Hero): string {
  return (
    "**Zodiac: **" +
    resources.zodiac[hero.zodiac] +
    " " +
    capitalize(hero.zodiac)
  );
}

function buildImprintInfo(hero: Hero): string {
  return [buildImprint(hero), "\u200B", buildSelfImprint(hero)].join("\n");
}

function buildImprint(hero: Hero): string {
  return (
    "**Imprint - " +
    DevotionHelper.getDevotionTypeLabel(hero.devotion.type) +
    "**\n" +
    buildImprintGrade(hero.devotion)
  );
}

function buildSelfImprint(hero: Hero): string {
  return (
    "**Self Imprint - " +
    DevotionHelper.getDevotionTypeLabel(hero.selfDevotion.type) +
    "**\n" +
    buildImprintGrade(hero.selfDevotion)
  );
}

function buildImprintGrade(devotion: Devotion): string {
  const isPercentage: boolean = isPercentageDevotion(devotion.type);
  const suffix = isPercentage ? "%" : "";
  let imprint = "";
  let levels: string[] = [];
  const grades = devotion.grades;
  Object.keys(grades).forEach((key) => {
    const amount = isPercentage
      ? Math.round(Number(grades[key]) * 1000) / 10
      : grades[key];
    levels.push(`${amount}${suffix} (${key})`);
  });

  return levels.join(", ");
}

function isPercentageDevotion(type: DevotionType): boolean {
  return (
    type.includes("rate") ||
    type === DevotionType.EFFECTIVENESS ||
    type === DevotionType.EFFECT_RESISTANCE ||
    type == DevotionType.CRITICAL
  );
}

function buildHeroStats(hero: Hero): string {
  return "**Stats(Lv. 50 → Lv. 60**";
}

function capitalize(str: string) {
  return str
    .split(" ")
    .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
    .join(" ");
}

export default createHeroEmbed;
