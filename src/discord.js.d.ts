declare module "discord.js-menu" {
  export class Menu {
    constructor(channel: any, author: string, pages: any, ms: number);
    start(): void;
    stop(): void;
    delete(): void;
    clearReactions(): void;
    setPage(page: number): void;
    addReactions(): void;
    awaitReactions(): void;
  }
}
