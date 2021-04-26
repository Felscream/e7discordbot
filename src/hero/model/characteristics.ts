enum Attribute {
  FIRE = "fire",
  EARTH = "earth",
  ICE = "ice",
  LIGHT = "light",
  DARK = "dark",
}

enum Role {
  WARRIOR = "warrior",
  KNIGHT = "knight",
  THIEF = "thief",
  RANGER = "ranger",
  MAGE = "mage",
  SOUL_WEAVER = "soul weaver",
}

enum Zodiac {
  CANCER = "cancer",
  SAGITTARIUS = "sagittarius",
  GEMINI = "gemini",
  LEO = "leo",
  AQUARIUS = "aquarius",
  SCORPIO = "scorpio",
  ARIES = "aries",
  PISCES = "pisces",
  TAURUS = "taurus",
  LIBRA = "libra",
  VIRGO = "virgo",
  CAPRICORN = "capricorn",
}

enum DevotionType {
  MAX_HP_RATE = "max_hp_rate",
  MAX_HP = "max_hp",
  DEF = "def",
  DEF_RATE = "def_rate",
  EFFECT_RESISTANCE = "res",
  EFFECTIVENESS = "acc",
  ATTACK = "att",
  ATTACK_RATE = "att_rate",
  CRITICAL = "cri",
  SPEED = "speed",
}

class DevotionGrade {
  grade: string;
  value: number;
  constructor(grade: string, value: number) {
    this.grade = grade;
    this.value = value;
  }
}

class Devotion {
  type: DevotionType;
  grades: DevotionGrade[];
  constructor(type: DevotionType, grades: DevotionGrade[]) {
    this.type = type;
    this.grades = grades;
  }
}

class HeroStats {
  cp: number;
  attack: number;
  health: number;
  speed: number;
  defense: number;
  criticalChance: number;
  criticalDamage: number;
  dualAttack: number;
  effectiveness: number;
  effectResistance: number;

  constructor(
    cp: number,
    attack: number,
    health: number,
    speed: number,
    defense: number,
    criticalChance: number,
    criticalDamage: number,
    doubleAttack: number,
    effectiveness: number,
    effectResistance: number
  ) {
    this.cp = cp;
    this.attack = attack;
    this.health = health;
    this.speed = speed;
    this.defense = defense;
    this.criticalChance = criticalChance;
    this.criticalDamage = criticalDamage;
    this.dualAttack = doubleAttack;
    this.effectiveness = effectiveness;
    this.effectResistance = effectResistance;
  }
}

export {
  Attribute,
  Role,
  Zodiac,
  Devotion,
  DevotionType,
  DevotionGrade as DevotionGrades,
  HeroStats,
};
