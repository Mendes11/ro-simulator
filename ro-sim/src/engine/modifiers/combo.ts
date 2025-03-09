import { ConditionCheckData, ConditionData, iCondition } from "@/types/condition";
import { iModifier, ModifierApplyData } from "@/types/equipment";
import { ModifierData, newCondition, newModifier } from "./utils";

// A Combo holds multiple modifiers under the same condition
export class Combo implements iModifier {
    modifiers: iModifier[];
    conditions: iCondition[];

    public constructor(modifiers: iModifier[], conditions: iCondition[] = []){
        this.modifiers = modifiers;
        this.conditions = conditions;
    }

    public static fromJSON(data: {modifiers: ModifierData[], conditions?: ConditionData[]}) {
        return new Combo(
            data.modifiers.map(m => newModifier(m)),
            data.conditions?.map(c => newCondition(c))
        )
    }
    
    check(data: ConditionCheckData) {
        if (this.conditions.length === 0) return true;
        return this.conditions.every(c => c.check(data));
    }

    apply(data: ModifierApplyData) {
        this.modifiers.map(m => m.apply(data));
    }
}