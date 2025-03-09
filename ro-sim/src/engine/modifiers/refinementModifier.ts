import { iModifier, ModifierApplyData } from "@/types/equipment";
import { ModifierData, newModifier } from "./utils";
import { BaseModifier } from "./base";
import { ConditionData } from "@/types/condition";

export type RefinementModifierData = {
    refinementSteps: number;
    minRefinement?: number;
    maxRefinement?: number;
    modifier: iModifier | ModifierData;
}

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

    apply(data: ModifierApplyData) {
        const multiplier = Math.round(data.source.instance.refinement / this.refinementSteps);
        this.modifier.apply({...data, multiplier: multiplier});
    }
}
