import ArtifactSummary from "../artifact/model/ArtifactSummary";
import { getArtifactById, getArtifactList } from "../artifact/ArtifactService";
import { SummaryMenu } from "../menus/SummaryMenu";
import { Message } from "discord.js";
import findId from "../utility/IdentifiedFinder";
import Artifact from "src/artifact/model/Artifact";
import ArtifactMenu from "../menus/ArtifactMenu";
import ArtifactAliases from "../../resources/artifactAliases.json";

async function displayArtifacts(message: Message, args: string[]) {
  let artifacts: ArtifactSummary[] = [];
  try {
    artifacts = await getArtifactList();
  } catch (e) {
    console.log(e);
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

async function displayArtifact(message: Message, args: string[]): Promise<any> {
  let artifacts: ArtifactSummary[] = [];
  const artifactName = args.join(" ");
  try {
    artifacts = await getArtifactList();
  } catch (e) {
    console.log(e);
    message.reply(`Could not find any artifact named '${artifactName}'`);
    return;
  }

  const artifactId = findId(artifactName, artifacts, ArtifactAliases.aliases);

  if (artifactId.length === 0) {
    console.log("No result for search request '" + artifactName + "'");
    message.reply(`Could not find any artifact named '${artifactName}'`);
    return null;
  }

  let artifact: Artifact;
  try {
    process.stdout.write(`Looking for artifact with id '${artifactName}'\n`);
    artifact = await getArtifactById(artifactId);
  } catch (e) {
    console.log(e);
    console.log("No result for search request '" + artifactName + "'");
    message.reply(`Could not find any artifact named '${artifactName}'`);
    return;
  }

  if (artifact === undefined) {
    console.log("No result for search request '" + artifactName + "'");
    message.reply(`Could not find any artifact named '${artifactName}'`);
    return;
  }

  const menu = new ArtifactMenu(message.channel, message.author.id, artifact);
  menu.start();
}

export { displayArtifacts, displayArtifact };
