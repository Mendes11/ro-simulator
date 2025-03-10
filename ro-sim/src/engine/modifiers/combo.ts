import { ConditionCheckData, ConditionData, iCondition } from "@/types/condition";
import { iCharacterModifiers, iModifier, ModifierApplyData } from "@/types/equipment";
import { ModifierData, newCondition, newModifier } from "./utils";
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