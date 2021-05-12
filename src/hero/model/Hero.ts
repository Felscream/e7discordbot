import { Skill } from "../skills/model/Skill";
import {
  Attribute,
  Devotion,
  HeroStats,
  Role,
  Zodiac,
} from "./characteristics";

class Hero {
  name: string;
  rarity: number;
  attribute: Attribute;
  role: Role;
  zodiac: Zodiac;
  devotion: Devotion;
  selfDevotion: Devotion;
  icon: string;
  lvl50Stats: HeroStats;
  lvl60Stats: HeroStats;
  epicsevendb: string;
  skills: Skill[];

  constructor(builder: HeroBuilder) {
    this.name = builder.name;
    this.rarity = builder.rarity;
    this.role = builder.role;
    this.attribute = builder.attribute;
    this.zodiac = builder.zodiac;
    this.devotion = builder.devotion;
    this.selfDevotion = builder.selfDevotion;
    this.icon = builder.icon;
    this.lvl50Stats = builder.lvl50Stats;
    this.lvl60Stats = builder.lvl60Stats;
    this.epicsevendb = builder.epicsevendb;
    this.skills = builder.skills;
  }
}

class HeroBuilder {
  name: string;
  rarity: number;
  attribute: Attribute;
  role: Role;
  zodiac: Zodiac;
  devotion: Devotion;
  selfDevotion: Devotion;
  icon: string;
  lvl50Stats: HeroStats;
  lvl60Stats: HeroStats;
  epicsevendb: string;
  skills: Skill[];

  constructor() {}

  withName(name: string) {
    this.name = name;
    return this;
  }

  withRarity(rarity: number) {
    this.rarity = rarity;
    return this;
  }

  withAttribute(attribute: Attribute) {
    this.attribute = attribute;
    return this;
  }

  withRole(role: Role) {
    this.role = role;
    return this;
  }

  withZodiac(zodiac: Zodiac) {
    this.zodiac = zodiac;
    return this;
  }

  withDevotion(devotion: Devotion) {
    this.devotion = devotion;
    return this;
  }

  withSelfDevotion(devotion: Devotion) {
    this.selfDevotion = devotion;
    return this;
  }

  withIcon(icon: string) {
    this.icon = icon;
    return this;
  }

  withLvl50Stats(stats: HeroStats) {
    this.lvl50Stats = stats;
    return this;
  }

  withLvl60Stats(stats: HeroStats) {
    this.lvl60Stats = stats;
    return this;
  }

  withEpicSevenDb(url: string) {
    this.epicsevendb = url;
    return this;
  }

  withSkills(skills: Skill[]) {
    this.skills = skills;
    return this;
  }

  create() {
    return new Hero(this);
  }
}

export { Hero, HeroBuilder };
