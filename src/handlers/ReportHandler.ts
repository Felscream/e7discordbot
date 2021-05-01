import { Message } from "discord.js";
import Config from "../../config.json";
import GuildWarsReport from "../reports/model/GuildWarsReport";
import findHeroId from "../hero/HeroFinder";
import { getHeroesList } from "../hero/HeroService";
import { HeroSummary } from "../hero/model/heroSummary";
import { sendGuildWarsReport } from "../utility/MongoConnector";

async function handleReport(message: Message, args: string[]) {
  let matchReport;
  try {
    matchReport = await buildGuildWarsReport(message, args);
  } catch (e) {
    console.log(e);
    return;
  }

  sendGuildWarsReport(matchReport);
}

async function buildGuildWarsReport(
  message: Message,
  args: string[]
): Promise<GuildWarsReport> {
  let reportParameters = args
    .join(" ")
    .split(Config.reportSeparator)
    .map((value) => value.trim());
  // SPEED
  const speed = Math.round(Number(reportParameters.shift()));
  if (isNaN(speed) || speed < 1 || speed >= Config.maxSpeed) {
    message.reply(
      "Didn't catch the speed parameter, it is not a number, has not been filled, or is not in the processable range"
    );
    throw new Error("Invalid report format - speed");
  }

  // RESULT
  const matchResult = getMatchResult(reportParameters.pop());
  if (matchResult.length === 0) {
    message.reply(
      "Could not read match results, accepted values are [v,w,win,victory,victoire] for a VICTORY, [l,loss,lose,defeat,défaite] for a LOSS and [e, draw, égalité] for a DRAW"
    );
    throw new Error("Invalid report format - match result");
  }

  // TEAMS
  const teams = await getTeamsCompositionAndPower(reportParameters, message);

  return new GuildWarsReport(
    speed,
    teams.team1Comp,
    teams.team1Cp,
    teams.team2Comp,
    teams.team2Cp,
    matchResult
  );
}

async function getTeamsCompositionAndPower(
  parameters: string[],
  message: Message
): Promise<TeamParameter> {
  let heroes: HeroSummary[];
  try {
    heroes = await getHeroesList();
  } catch (e) {
    heroes = [];
  }

  let teams = new TeamParameter();
  for (let i = 0; i < 2; i++) {
    const team = parameters[i]
      .split(Config.heroSeparator)
      .map((value) => value.trim());

    if (team.length !== 4) {
      message.reply(
        "Could not process team composition, make sure three heroes are present for each team. If you want to make an empty spot, input another ',' instead of the missing hero"
      );
      throw new Error("Invalid report format - team size");
    }

    let cp = 0;
    if (team.length != 4) {
      cp = Config.gwDefaultCp;
    } else {
      cp = Math.round(Number(team.pop().trim()));
      if (isNaN(cp) || cp < 1 || cp >= Config.gwMaxCp) {
        cp = Config.gwDefaultCp;
        message.reply(
          `Invalid CP value, will default to ${Config.gwDefaultCp}`
        );
      }
    }

    const teamId = team.map((unit) => {
      let heroId = findHeroId(unit, heroes);
      if (heroId.length === 0) {
        return unit;
      }
      return heroId;
    });

    if (i === 0) {
      teams.team1Comp = teamId;
      teams.team1Cp = cp;
    } else {
      teams.team2Comp = teamId;
      teams.team2Cp = cp;
    }
  }

  return teams;
}

function getMatchResult(matchResult: string): string {
  const result = matchResult.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  switch (result) {
    case "w":
    case "v":
    case "win":
    case "victory":
    case "victoire":
      return "victory";
    case "l":
    case "loss":
    case "lose":
    case "defeat":
    case "defaite":
      return "DEFEAT";
    case "e":
    case "draw":
    case "egalite":
      return "DRAW";
    default:
      return "";
  }
}

class TeamParameter {
  team1Comp: string[];
  team1Cp: number;
  team2Comp: string[];
  team2Cp: number;
}

export default handleReport;
