class GuildWarsReport {
  speed: number;
  allies: string[];
  enemies: string[];
  alliesCp: number;
  enemiesCp: number;
  matchResult: string;
  constructor(
    speed: number,
    allies: string[],
    alliesCp: number,
    enemies: string[],
    enemiesCp: number,
    matchResult: string
  ) {
    this.speed = speed;
    this.allies = allies;
    this.alliesCp = alliesCp;
    this.enemies = enemies;
    this.enemiesCp = enemiesCp;
    this.matchResult = matchResult;
  }
}

export default GuildWarsReport;
