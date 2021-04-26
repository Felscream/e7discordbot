import {
  Attribute,
  Devotion,
  DevotionType,
  DevotionGrades,
  HeroStats,
  Role,
  Zodiac,
} from "./model/characteristics";
import { Hero, HeroBuilder } from "./model/Hero";
import { HeroSummary, HeroSummaryBuilder } from "./model/heroSummary";
import config from "../../config.json";

class HeroMapper {
  static mapHeroSummary(hero: any): HeroSummary {
    return new HeroSummaryBuilder()
      .withId(hero._id)
      .withName(hero.name)
      .withIsMoonlight(hero.moonlight)
      .withAttribute(HeroMapper.mapAttribute(hero.attribute))
      .withRarity(hero.rarity)
      .withRole(HeroMapper.mapRole(hero.role))
      .withZodiac(HeroMapper.mapZodiac(hero.zodiac))
      .withIcon(hero.assets.icon)
      .build();
  }

  static async mapHero(hero: any): Promise<Hero> {
    return new HeroBuilder()
      .withName(hero.name)
      .withRarity(hero.rarity)
      .withRole(HeroMapper.mapRole(hero.role))
      .withZodiac(HeroMapper.mapZodiac(hero.zodiac))
      .withAttribute(HeroMapper.mapAttribute(hero.attribute))
      .withIcon(hero.assets.icon)
      .withSelfDevotion(HeroMapper.mapDevotion(hero.self_devotion))
      .withDevotion(HeroMapper.mapDevotion(hero.devotion))
      .withLvl50Stats(
        HeroMapper.mapStats(hero.calculatedStatus.lv50FiveStarFullyAwakened)
      )
      .withLvl60Stats(
        HeroMapper.mapStats(hero.calculatedStatus.lv60SixStarFullyAwakened)
      )
      .withEpicSevenDb(config.epicsevendbhero + hero._id)
      .create();
  }

  private static mapAttribute(attribute: any): Attribute {
    switch (attribute) {
      case "fire":
        return Attribute.FIRE;
      case "wind":
        return Attribute.EARTH;
      case "ice":
        return Attribute.ICE;
      case "light":
        return Attribute.LIGHT;
      default:
      case "dark":
        return Attribute.DARK;
    }
  }

  private static mapZodiac(zodiac: any): Zodiac {
    switch (zodiac) {
      case "crab":
        return Zodiac.CANCER;
      case "archer":
        return Zodiac.SAGITTARIUS;
      case "twins":
        return Zodiac.GEMINI;
      case "lion":
        return Zodiac.LEO;
      case "waterbearer":
        return Zodiac.AQUARIUS;
      case "scorpion":
        return Zodiac.SCORPIO;
      case "ram":
        return Zodiac.ARIES;
      case "fish":
        return Zodiac.ARIES;
      case "bull":
        return Zodiac.TAURUS;
      case "scales":
        return Zodiac.LIBRA;
      case "maiden":
        return Zodiac.VIRGO;
      default:
      case "goat":
        return Zodiac.CAPRICORN;
    }
  }

  private static mapDevotion(rawDevotion: any): Devotion {
    const devotionType = HeroMapper.mapDevotionType(rawDevotion.type);
    return new Devotion(
      devotionType,
      HeroMapper.mapDevotionGrades(rawDevotion.grades, devotionType)
    );
  }

  private static mapDevotionGrades(
    grades: any,
    devotionType: DevotionType
  ): DevotionGrades[] {
    let mappedGrades: DevotionGrades[] = [];
    const isPercentage = HeroMapper.isPercentageDevotion(devotionType);
    Object.keys(grades).forEach((key) => {
      mappedGrades.push(
        new DevotionGrades(
          key,
          HeroMapper.getDevotionValue(grades[key], isPercentage)
        )
      );
    });

    return mappedGrades;
  }

  private static getDevotionValue(
    value: number,
    isPercentage: boolean
  ): number {
    return isPercentage ? Math.round(value * 1000) / 10 : value;
  }

  private static mapDevotionType(devotionType: any): DevotionType {
    switch (devotionType) {
      case "max_hp_rate":
        return DevotionType.MAX_HP_RATE;
      case "max_hp":
        return DevotionType.MAX_HP;
      case "def":
        return DevotionType.DEF;
      case "def_rate":
        return DevotionType.DEF_RATE;
      case "res":
        return DevotionType.EFFECT_RESISTANCE;
      case "acc":
        return DevotionType.EFFECTIVENESS;
      case "att":
        return DevotionType.ATTACK;
      case "att_rate":
        return DevotionType.ATTACK_RATE;
      case "speed":
        return DevotionType.SPEED;
      default:
      case "cri":
        return DevotionType.CRITICAL;
    }
  }

  private static mapRole(role: any): Role {
    switch (role) {
      case "knight":
        return Role.KNIGHT;
      case "warrior":
        return Role.WARRIOR;
      case "assassin":
        return Role.THIEF;
      case "ranger":
        return Role.RANGER;
      case "mage":
        return Role.MAGE;
      default:
      case "manauser":
        return Role.SOUL_WEAVER;
    }
  }

  private static mapStats(stats: any): HeroStats {
    return new HeroStats(
      Number(stats.cp),
      Number(stats.atk),
      Number(stats.hp),
      Number(stats.spd),
      Number(stats.def),
      Number(Math.round(stats.chc * 1000) / 10),
      Number(Math.round(stats.chd * 1000) / 10),
      Number(Math.round(stats.dac * 1000) / 10),
      Number(Math.round(stats.eff * 1000) / 10),
      Number(Math.round(stats.efr * 1000) / 10)
    );
  }

  private static isPercentageDevotion(type: DevotionType): boolean {
    return (
      type.includes("rate") ||
      type === DevotionType.EFFECTIVENESS ||
      type === DevotionType.EFFECT_RESISTANCE ||
      type == DevotionType.CRITICAL
    );
  }
}

export default HeroMapper;
