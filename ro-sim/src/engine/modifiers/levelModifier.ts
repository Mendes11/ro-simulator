import { ModifierApplyData } from "../types/equipment";
import { iModifier } from "./types/engine";
import { newModifier } from "./utils";
import { LevelModifierData, ModifierData } from "./types/config";
import { BaseModifier } from "./base";
import { ConditionData } from "./conditions/types/config";

// LevelModifier is used to compute a level-based multiplier on top of another modifier.
// Used for items with descriptions such as
//  - "A cada X níveis: <downstream modifier>"
//  - "A cada X níveis a partir do 50: <downstream modifier>"
//  - ""
export class LevelModifier extends BaseModifier {
    modifier: iModifier;
    levelSteps: number;
    minLevel: number;
    maxLevel: number;

    public constructor(data: LevelModifierData, conditions: ConditionData[] = []) {
        super(conditions);
        if (typeof data.modifier !== "function") {
            this.modifier = newModifier(data.modifier as ModifierData);
        } else {
            this.modifier = data.modifier as iModifier;
        }

        this.levelSteps = data.levelSteps;
        this.minLevel = data.minLevel ?? 0;
        this.maxLevel = data.maxLevel ?? 20;
    }

    mountModifier(data: ModifierApplyData) {
      let value = data.character.level;
      // Cap the value based on min/max limits.
      value = value < this.minLevel ? 0 : value > this.maxLevel ? this.maxLevel : value;
      const multiplier = Math.round(value / this.levelSteps);
      return this.modifier.getModifier(data)?.mul(multiplier);
    }
}
