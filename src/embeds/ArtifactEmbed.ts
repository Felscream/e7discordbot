import { MessageEmbed } from "discord.js";
import Artifact from "../artifact/model/Artifact";
import embedResources from "../../resources/embedResources.json";

function createArtifactEmbed(artifact: Artifact, level: number): MessageEmbed {
  return new MessageEmbed()
    .setTitle(buildTitle(artifact, level))
    .setURL(artifact.url)
    .setDescription(artifact.getDescription(level))
    .setImage(artifact.image);
}

function buildTitle(artifact: Artifact, level: number): string {
  let title = "[";
  for (let i = 0; i < artifact.rarity; i++) {
    title += "\u2605";
  }
  title += `] ${embedResources.roleEmoji[artifact.role]} ${
    artifact.name
  } +${Math.max(level * 3, 1)}`;
  return title;
}

export default createArtifactEmbed;
