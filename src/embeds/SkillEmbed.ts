import { EmbedFieldData, MessageEmbed } from "discord.js";
import { Hero } from "src/hero/model/Hero";
import Skill from "../hero/skills/model/Skill";
import resources from "../../resources/embedResources.json";

function createSkillEmbed(hero: Hero, index: number): MessageEmbed {
  const skill = hero.skills[index];
  const message = new MessageEmbed()
    .setTitle(buildTitle(skill, hero))
    .setColor(resources.attributeColor[hero.attribute])
    .setThumbnail(skill.icon)
    .setDescription(skill.getDescription())
    .addFields(createEnhancementFields(skill));
  return message;
}

function buildTitle(skill: Skill, hero: Hero): string {
  const hasCooldown = skill.cooldown > 0;
  const turn = skill.cooldown > 1 ? "turns" : "turn";
  const cooldown = hasCooldown
    ? `${resources.cooldown} ${skill.cooldown} ${turn}`
    : "";
  return `${hero.name} - ${skill.name} ${cooldown}`;
}

function createEnhancementFields(skill: Skill): EmbedFieldData[] {
  const enhancements: EmbedFieldData[] = [];
  skill.enhancements.forEach((enhancement, index) => {
    enhancements.push({
      name: "\u200b",
      value: `**+${index + 1}**: ${enhancement}`,
      inline: true,
    });
  });
  return enhancements;
}

export default createSkillEmbed;
