import { Attribute, Role, Zodiac } from "./characteristics";

class HeroSummary {
  id: string;
  name: string;
  isMoonlight: boolean;
  attribute: Attribute;
  rarity: number;
  role: Role;
  zodiac: Zodiac;
  icon: string;

  constructor(builder: HeroSummaryBuilder) {
    this.id = builder.id;
    this.name = builder.name;
    this.isMoonlight = builder.isMoonlight;
    this.attribute = builder.attribute;
    this.rarity = builder.rarity;
    this.zodiac = builder.zodiac;
    this.role = builder.role;
    this.icon = builder.icon;
  }
}

class HeroSummaryBuilder {
  id: string;
  name: string;
  isMoonlight: boolean;
  attribute: Attribute;
  rarity: number;
  role: Role;
  zodiac: Zodiac;
  icon: string;

  constructor() {
    this.id = "";
    this.name = "";
    this.isMoonlight = false;
    this.attribute = Attribute.FIRE;
    this.rarity = 1;
    this.role = Role.KNIGHT;
    this.zodiac = Zodiac.CANCER;
    this.icon = "";
  }

  withId(id: string) {
    this.id = id;
    return this;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  withIsMoonlight(isMoonlight: boolean) {
    this.isMoonlight = isMoonlight;
    return this;
  }

  withAttribute(attribute: Attribute) {
    this.attribute = attribute;
    return this;
  }

  withRarity(rarity: number) {
    this.rarity = rarity;
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

  withIcon(icon: string) {
    this.icon = icon;
    return this;
  }

  build(): HeroSummary {
    return new HeroSummary(this);
  }
}
export { HeroSummary, HeroSummaryBuilder };
