import { Role } from "../../hero/model/characteristics";

class ArtifactSummary {
  id: string;
  name: string;
  role: Role;
  rarity: number;

  constructor(builder: ArtifactSummaryBuilder) {
    this.id = builder.id;
    this.name = builder.name;
    this.role = builder.role;
    this.rarity = builder.rarity;
  }

  static start() {
    return new ArtifactSummaryBuilder();
  }
}

class ArtifactSummaryBuilder {
  id: string;
  name: string;
  role: Role;
  rarity: number;

  constructor() {
    this.role = Role.NONE;
  }

  withId(id: string) {
    this.id = id;
    return this;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  withRole(role: Role) {
    this.role = role;
    return this;
  }

  withRarity(rarity: number) {
    this.rarity = rarity;
    return this;
  }

  build(): ArtifactSummary {
    return new ArtifactSummary(this);
  }
}

export default ArtifactSummary;
