import { Cache } from "../utility/Cache";
import ArtifactSummary from "./model/ArtifactSummary";

class ArtifactsCache extends Cache<string, ArtifactSummary[]> {}

export default ArtifactsCache;
