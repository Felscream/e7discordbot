import ArtifactsCache from "./ArtifactsCache";
import ArtifactSummary from "./model/ArtifactSummary";
import { getArtifacts } from "../Epicsevendb";

const artifactsKey = "a";
const artifactsCache = new ArtifactsCache();

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

export { getArtifactList };
