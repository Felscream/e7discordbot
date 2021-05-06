import ArtifactSummary from "../artifact/model/ArtifactSummary";
import { getArtifactList } from "../artifact/ArtifactService";
import { SummaryMenu } from "../menus/SummaryMenu";
import { Message } from "discord.js";

async function displayArtifacts(message: Message, args: string[]) {
  let artifacts: ArtifactSummary[] = [];
  try {
    artifacts = await getArtifactList();
  } catch (e) {
    artifacts = [];
  }

  if (artifacts.length > 0) {
    const menu = new SummaryMenu(
      message.channel,
      message.author.id,
      artifacts,
      "Artifact list"
    );
    menu.start(args);
  } else {
    message.reply(
      "An error occured while getting the list of available artifacts"
    );
  }
}

export { displayArtifacts };
