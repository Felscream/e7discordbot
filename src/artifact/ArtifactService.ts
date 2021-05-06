import ArtifactsCache from "./ArtifactsCache";
import ArtifactSummary from "./model/ArtifactSummary";
import { getArtifacts, getArtifact } from "../Epicsevendb";
import Artifact from "./model/Artifact";
import ArtifactCache from "./ArtifactCache";

const artifactsKey = "a";
const artifactsCache = new ArtifactsCache();
const artifactCache = new ArtifactCache();

async function getArtifactList(): Promise<ArtifactSummary[]> {
  let artifacts = artifactsCache.get(artifactsKey);
  if (artifacts === undefined) {
    artifacts = await getArtifacts();
    if (artifacts !== undefined && artifacts.length > 0) {
      artifactsCache.put(artifactsKey, artifacts, new Date());
    }
  }
  return artifacts;
}

async function getArtifactById(id: string): Promise<Artifact> {
  let artifact = artifactCache.get(id);
  if (artifact === undefined) {
    artifact = await getArtifact(id);
    if (artifact !== undefined) {
      artifactCache.put(id, artifact, new Date());
    }
  }
  return artifact;
}

export { getArtifactList, getArtifactById };
