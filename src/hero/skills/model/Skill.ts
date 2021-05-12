import { DevotionGrades } from "src/hero/model/characteristics";

const marker = "{{variable}}";

class Skill {
  name: string;
  description: string;
  variables: number[];
  cooldown: number;
  enhancements: string[];
  soulgain: number;
  soulburn: Soulburn;
  icon: string;

  constructor(
    name: string,
    description: string,
    variables: number[],
    cooldown: number,
    enhancements: string[],
    soulburn: Soulburn,
    soulgain: number,
    icon: string
  ) {
    this.name = name;
    this.description = description;
    this.variables = variables;
    this.cooldown = cooldown;
    this.enhancements = enhancements;
    this.soulburn = soulburn;
    this.soulgain = soulgain;
    this.icon = icon;
  }

  getDescription(): string {
    let formated = this.description;
    for (let i = 0; i < this.variables.length; i++) {
      const suffix = this.variables[i] < 1 ? "%" : "";
      const value = this.getVariableFormatedValue(this.variables[i]);
      formated = formated.replace(marker, `**${value}${suffix}**`);
    }
    if (this.soulgain) {
      formated += `\nAcquire ${this.soulgain} soul`;
      if (this.soulgain > 1) {
        formated += "s";
      }
    }
    return formated;
  }

  private getVariableFormatedValue(variable: number): string {
    const percentage = variable < 1;

    if (percentage) {
      const scaledVariable = Math.round(variable * 1000) / 10;
      if (scaledVariable < 1) {
        return scaledVariable.toPrecision(1);
      }
      if (scaledVariable < 10) {
        return scaledVariable.toPrecision(2);
      }
      return scaledVariable.toPrecision(3);
    }

    return variable.toString();
  }
}

class Soulburn {
  cost: number;
  description: string;
  constructor(cost: number, description: string) {
    this.cost = cost;
    this.description = description;
  }
}

export { Skill, Soulburn };
