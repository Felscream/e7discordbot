import { Role } from "../../hero/model/characteristics";

const marker = "{{variable}}";

class Artifact {
  id: string;
  name: string;
  rarity: number;
  role: Role;
  description: string;
  enhancements: number[];
  icon: string;
  image: string;
  thumbnail: string;
  url: string;

  constructor(builder: ArtifactBuilder) {
    this.id = builder.id;
    this.name = builder.name;
    this.rarity = builder.rarity;
    this.role = builder.role;
    this.description = builder.description;
    this.enhancements = builder.enhancements;
    this.icon = builder.icon;
    this.image = builder.image;
    this.thumbnail = builder.thumbnail;
    this.url = builder.url;
  }
  getName(): string {
    return this.name;
  }

  static start(): ArtifactBuilder {
    return new ArtifactBuilder();
  }

  getDescription(level: number): string {
    let formated = this.description;
    const value = this.getVariableFormatedValue(this.enhancements[level]);
    formated = formated.replace(marker, `**${value}%**`);
    return formated;
  }

  private getVariableFormatedValue(variable: number): string {
    const scaledVariable = Math.round(variable * 1000) / 10;
    if (scaledVariable < 1) {
      return scaledVariable.toPrecision(1);
    }
    if (scaledVariable < 10) {
      return scaledVariable.toPrecision(2);
    }
    return scaledVariable.toPrecision(3);
  }
}

class ArtifactBuilder {
  id: string;
  name: string;
  rarity: number;
  role: Role;
  description: string;
  enhancements: number[];
  icon: string;
  image: string;
  thumbnail: string;
  url: string;

  withId(id: string) {
    this.id = id;
    return this;
  }

  withName(name: string) {
    this.name = name;
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

  withDescription(description: string) {
    this.description = description;
    return this;
  }

  withEnhancements(enhancements: number[]) {
    this.enhancements = enhancements;
    return this;
  }

  withIcon(icon: string) {
    this.icon = icon;
    return this;
  }

  withImage(image: string) {
    this.image = image;
    return this;
  }

  withThumbnail(thumbnail: string) {
    this.thumbnail = thumbnail;
    return this;
  }

  withUrl(url: string) {
    this.url = url;
    return this;
  }

  build(): Artifact {
    return new Artifact(this);
  }
}

export default Artifact;
