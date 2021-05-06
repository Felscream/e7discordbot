import { differenceInDays } from "date-fns";
import config from "../../config.json";

abstract class Cache<T, U> {
  private map = new Map();
  put(key: T, value: U, created: Date): void {
    this.map.set(key, new Entry(value, created));
  }

  get(key: T): U {
    const entry = this.map.get(key);
    if (this.isValid(entry)) {
      return entry.value;
    }
    return undefined;
  }

  private isValid(cachedValue: Entry<U> | Entry<U[]>) {
    return cachedValue !== undefined && !this.isCacheExpired(cachedValue);
  }

  private isCacheExpired(entry: Entry<U[]> | Entry<U>): boolean {
    if (entry === undefined) {
      return true;
    }
    return (
      differenceInDays(new Date(), entry.creationDate) >
      config.heroListConservation
    );
  }
}

class Entry<U> {
  value: U;
  creationDate: Date;
  constructor(value: U, creation: Date) {
    this.value = value;
    this.creationDate = creation;
  }
}

export { Cache, Entry };
