import { ModifierApplyData } from "../types/equipment";
import { iModifier } from "./types/engine";
import { newModifier } from "./utils";
import { ModifierData, RefinementModifierData } from "./types/config";
import { BaseModifier } from "./base";
import { ConditionData } from "./conditions/types/config";

// RefinementModifier is used to compute a multiplier on top of another modifier.
// Used for items with descriptions such as
//  - "A cada [refino | nível de refino]: ATQ+30"
//  - "A cada refino até o +12: ..."
//  - ""
export class RefinementModifier extends BaseModifier {
    modifier: iModifier;
    refinementSteps: number;
    minRefinement: number;
    maxRefinement: number;

    public constructor(data: RefinementModifierData, conditions: ConditionData[] = []) {
        super(conditions);
        if (typeof data.modifier !== "function") {
            this.modifier = newModifier(data.modifier as ModifierData);
        } else {
            this.modifier = data.modifier as iModifier;
        }

        this.refinementSteps = data.refinementSteps;
        this.minRefinement = data.minRefinement ?? 0;
        this.maxRefinement = data.maxRefinement ?? 20;
    }

    mountModifier(data: ModifierApplyData) {
      let value = data.source.instance.refinement;
      // Cap the value based on min/max limits.
      value = value < this.minRefinement ? 0 : value > this.maxRefinement ? this.maxRefinement : value;
      const multiplier = Math.round(value / this.refinementSteps);
      return this.modifier.getModifier(data)?.mul(multiplier);
    }
}
