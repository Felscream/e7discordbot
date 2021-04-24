abstract class Cache<T, U> {
  private map = new Map();
  put(key: T, value: U, created: Date): void {
    this.map.set(key, new Entry(value, created));
  }

  get(key: T): Entry<U> {
    return this.map.get(key);
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
