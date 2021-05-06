import { Role } from "../hero/model/characteristics";
import Artifact from "./model/Artifact";
import ArtifactSummary from "./model/ArtifactSummary";
import config from "../../config.json";

function mapArtifactSummary(artifact: any): ArtifactSummary {
  return ArtifactSummary.start()
    .withId(artifact._id)
    .withName(artifact.name)
    .withRarity(artifact.rarity)
    .withRole(mapRole(artifact.role))
    .build();
}

function mapArtifact(artifact: any): Artifact {
  return Artifact.start()
    .withId(artifact._id)
    .withName(artifact.name)
    .withRarity(artifact.rarity)
    .withRole(mapRole(artifact.role))
    .withDescription(artifact.skill.description)
    .withEnhancements(artifact.skill.enhancements)
    .withIcon(artifact.assets.icon)
    .withImage(artifact.assets.image)
    .withThumbnail(artifact.assets.thumbnail)
    .withUrl(config.epicsevendbartifact + artifact._id)
    .build();
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

export { mapArtifact, mapArtifactSummary };
