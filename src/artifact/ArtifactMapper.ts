import { Role } from "../hero/model/characteristics";
import ArtifactSummary from "./model/ArtifactSummary";

function mapArtifactSummary(artifact: any): ArtifactSummary {
  return ArtifactSummary.start()
    .withId(artifact.id)
    .withName(artifact.name)
    .withRarity(artifact.rarity)
    .withRole(mapRole(artifact.role));
}

function mapRole(role: any): Role {
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
    case "manauser":
      return Role.SOUL_WEAVER;
    default:
      return Role.NONE;
  }
}

export { mapArtifactSummary };
