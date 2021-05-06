import { DevotionGrades } from "src/hero/model/characteristics";

const marker = "{{variable}}";

class Skill {
  name: string;
  description: string;
  variables: number[];
  cooldown: number;
  enhancements: string[];
  icon: string;

  constructor(
    name: string,
    description: string,
    variables: number[],
    cooldown: number,
    enhancements: string[],
    icon: string
  ) {
    this.name = name;
    this.description = description;
    this.variables = variables;
    this.cooldown = cooldown;
    this.enhancements = enhancements;
    this.icon = icon;
  }

  getDescription(): string {
    let formated = this.description;
    for (let i = 0; i < this.variables.length; i++) {
      const suffix = this.variables[i] < 1 ? "%" : "";
      const value = this.getVariableFormatedValue(this.variables[i]);
      formated = formated.replace(marker, `**${value}${suffix}**`);
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

export default Skill;
