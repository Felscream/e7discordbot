import { MessageEmbed } from "discord.js";
import DevotionHelper from "../hero/DevotionHelper";
import {
  Devotion,
  DevotionGrades,
  DevotionType,
} from "../hero/model/characteristics";
import * as resources from "../../resources/resources.json";
import { Hero } from "../hero/model/Hero";

function createHeroEmbed(hero: Hero): MessageEmbed {
  return new MessageEmbed()
    .setTitle(buildTitle(hero))
    .setURL(hero.epicsevendb)
    .setColor(resources.attributeColor[hero.attribute])
    .setDescription(buildHeroInformation(hero))
    .addField("**Stats (Lv. 50 → Lv. 60)**", buildHeroStatsColumn1(hero), true)
    .addField("\u200B", buildHeroStatsColumn2(hero), true)
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
  grades.forEach((grade) => {
    let value = formatDevotionGradeValue(isPercentage, grade);
    levels.push(`${value}${suffix} (${grade.grade})`);
  });

  return levels.join(", ");
}

function formatDevotionGradeValue(
  isPercentage: boolean,
  grade: DevotionGrades
) {
  let value = "0";
  if (isPercentage) {
    if (grade.value < 1) {
      return grade.value.toPrecision(1);
    }
    if (grade.value < 10) {
      return grade.value.toPrecision(2);
    }
    return grade.value.toPrecision(3);
  }
  return grade.value.toString();
}

function isPercentageDevotion(type: DevotionType): boolean {
  return (
    type.includes("rate") ||
    type === DevotionType.EFFECTIVENESS ||
    type === DevotionType.EFFECT_RESISTANCE ||
    type == DevotionType.CRITICAL
  );
}

function buildHeroStatsColumn1(hero: Hero): string {
  const stats = [
    buildStatEntry("CP", hero.lvl50Stats.cp, hero.lvl60Stats.cp),
    buildStatEntry("Attack", hero.lvl50Stats.attack, hero.lvl60Stats.attack),
    buildStatEntry("Health", hero.lvl50Stats.health, hero.lvl60Stats.health),
    buildStatEntry("Speed", hero.lvl50Stats.speed, hero.lvl60Stats.speed),
    buildStatEntry("Defense", hero.lvl50Stats.defense, hero.lvl60Stats.defense),
  ].join("\n");
  return stats;
}

function buildHeroStatsColumn2(hero: Hero): string {
  const stats = [
    buildStatEntry(
      "Critical Hit Chance",
      hero.lvl50Stats.criticalChance,
      hero.lvl60Stats.criticalChance,
      "%"
    ),
    buildStatEntry(
      "Critical Hit Damage",
      hero.lvl50Stats.criticalDamage,
      hero.lvl60Stats.criticalDamage,
      "%"
    ),
    buildStatEntry(
      "Dual Attack Chance",
      hero.lvl50Stats.dualAttack,
      hero.lvl60Stats.dualAttack,
      "%"
    ),
    buildStatEntry(
      "Effectiveness",
      hero.lvl50Stats.effectiveness,
      hero.lvl60Stats.effectiveness,
      "%"
    ),
    buildStatEntry(
      "Effect Resistance",
      hero.lvl50Stats.effectResistance,
      hero.lvl60Stats.effectResistance,
      "%"
    ),
  ].join("\n");
  return stats;
}

function buildStatEntry(
  key: string,
  lvl50Value: number,
  lvl60Value: number,
  sign: string = ""
) {
  return `**${key}**: ${lvl50Value}${sign} → ${lvl60Value}${sign}`;
}

function capitalize(str: string) {
  return str
    .split(" ")
    .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
    .join(" ");
}

export default createHeroEmbed;
