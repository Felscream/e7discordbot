import { Cache } from "../utility/Cache";
import { HeroSummary } from "./model/heroSummary";

class HeroListCache extends Cache<string, HeroSummary[]> {}

export default HeroListCache;
