import { Attribute, Role, Zodiac } from "./model/characteristics";
import { HeroSummary, HeroSummaryBuilder } from "./model/heroSummary";

class HeroSummaryMapper {
  static mapHeroSummary(hero: any): HeroSummary {
    return new HeroSummaryBuilder()
      .withId(hero._id)
      .withName(hero.name)
      .withIsMoonlight(hero.moonlight)
      .withAttribute(HeroSummaryMapper.mapAttribute(hero.attribute))
      .withRarity(hero.rarity)
      .withRole(HeroSummaryMapper.mapRole(hero.role))
      .withZodiac(HeroSummaryMapper.mapZodiac(hero.zodiac))
      .withIcon(hero.assets.icon)
      .build();
  }

  private static mapAttribute(attribute: any): Attribute {
    switch (attribute) {
      default:
      case "fire":
        return Attribute.FIRE;
      case "wind":
        return Attribute.EARTH;
      case "ice":
        return Attribute.ICE;
      case "light":
        return Attribute.LIGHT;
      case "dark":
        return Attribute.DARK;
    }
  }

  private static mapZodiac(zodiac: any): Zodiac {
    switch (zodiac) {
      default:
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
      case "goat":
        return Zodiac.CAPRICORN;
    }
  }

  private static mapRole(role: any): Role {
    switch (role) {
      default:
      case "knight":
        return Role.KNIGHT;
      case "warrior":
        return Role.WARRIOR;
      case "assassin":
        return Role.ASSASSIN;
      case "ranger":
        return Role.RANGER;
      case "mage":
        return Role.MAGE;
      case "manauser":
        return Role.SOUL_WEAVER;
    }
  }
}

export default HeroSummaryMapper;
