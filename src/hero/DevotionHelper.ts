import { DevotionType } from "./model/characteristics";

class DevotionHelper {
  static getDevotionTypeLabel(type: DevotionType): string {
    switch (type) {
      case DevotionType.ATTACK:
      case DevotionType.ATTACK_RATE:
        return "Attack";
      case DevotionType.CRITICAL:
        return "Critical Hit Chance";
      case DevotionType.DEF:
      case DevotionType.DEF_RATE:
        return "Defense";
      case DevotionType.EFFECTIVENESS:
        return "Effectiveness";
      case DevotionType.EFFECT_RESISTANCE:
        return "Effect Resistance";
      case DevotionType.SPEED:
        return "Speed";
      case DevotionType.MAX_HP:
      case DevotionType.MAX_HP_RATE:
      default:
        return "Health";
    }
  }
}

export default DevotionHelper;
