import { ConditionData } from "./conditions/types/config";
import { ModifierApplyData } from "../types/equipment";
import { iModifier } from "./types/engine";
import { newModifier } from "./utils";
import { ComboModifierData } from "./types/config";
import { BaseModifier } from "./base";

// A Combo holds multiple modifiers under the same condition
export class Combo extends BaseModifier {
    modifiers: iModifier[];

    public constructor(data: ComboModifierData, conditions: ConditionData[] = []){
        super(conditions);
        this.modifiers = data.modifiers.map(m => newModifier(m));
    }

    mountModifier(data: ModifierApplyData){
        return this.modifiers
                .map(m => m.getModifier(data))
                .filter(m => m != null)
                .reduce((l, r) => l.sum(r));
    }
}