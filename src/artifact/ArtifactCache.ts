import { Cache } from "../utility/Cache";
import Artifact from "./model/Artifact";

class ArtifactCache extends Cache<string, Artifact> {}

export default ArtifactCache;
