import { ConditionData } from "@/types/condition";
import { iModifier, ModifierApplyData } from "@/types/equipment";
import { ModifierData, newModifier } from "./utils";
import { BaseModifier } from "./base";

// A Combo holds multiple modifiers under the same condition
export class Combo extends BaseModifier {
    modifiers: iModifier[];

    public constructor(modifiers: ModifierData[], conditions: ConditionData[] = []){
        super(conditions);
        this.modifiers = modifiers.map(m => newModifier(m));
    }

    mountModifier(data: ModifierApplyData){
        return this.modifiers
                .map(m => m.getModifier(data))
                .filter(m => m != null)
                .reduce((l, r) => l.sum(r));
    }
}