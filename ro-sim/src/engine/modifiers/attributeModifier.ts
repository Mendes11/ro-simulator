import { ModifierApplyData } from "../types/equipment";
import { iModifier } from "./types/engine";
import { newModifier } from "./utils";
import { AttributeModifierData, ModifierData } from "./types/config";
import { BaseModifier } from "./base";
import { ConditionData } from "./conditions/types/config";
import { AttributesData } from "../types/config";

// attributeModifier is used to compute a attribute-based multiplier on top of another modifier.
// Used for items with descriptions such as
//  - "A cada X níveis: <downstream modifier>"
//  - "A cada X níveis a partir do 50: <downstream modifier>"
//  - ""
export class AttributeModifier extends BaseModifier {
    attribute: keyof AttributesData;
    modifier: iModifier;
    attributeSteps: number;
    minValue: number;
    maxValue: number;

    public constructor(data: AttributeModifierData, conditions: ConditionData[] = []) {
        super(conditions);
        if (typeof data.modifier !== "function") {
            this.modifier = newModifier(data.modifier as ModifierData);
        } else {
            this.modifier = data.modifier as iModifier;
        }
        this.attribute = data.attribute;
        this.attributeSteps = data.attributeSteps;
        this.minValue = data.minValue ?? 0;
        this.maxValue = data.maxValue ?? 20;
    }

    mountModifier(data: ModifierApplyData) {
      let value = data.character.baseAttrs[this.attribute];
      // Cap the value based on min/max limits.
      value = value < this.minValue ? 0 : value > this.maxValue ? this.maxValue : value;
      const multiplier = Math.round(value / this.attributeSteps);
      return this.modifier.getModifier(data)?.mul(multiplier);
    }
}
