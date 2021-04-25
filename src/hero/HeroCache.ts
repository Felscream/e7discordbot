import { Cache } from "../utility/Cache";
import { Hero } from "./model/Hero";

class HeroCache extends Cache<string, Hero> {}

export default HeroCache;
