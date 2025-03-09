import { iModifier } from "@/types/equipment";
import { StatsModifier, StatsModifierData } from "./statsModifier";
import { RefinementModifier, RefinementModifierData } from "./refinementModifier";
import { ConditionData, ConditionTypes, iCondition } from "@/types/condition";
import { RefinementCondition } from "./conditions/refinementCondition";
import { EquipmentSetCondition } from "./conditions/equipmentSetCondition";

export enum ModifierTypes {
    Stats,
    Refinement
}
export type ModifierData =
    | { type: ModifierTypes.Refinement; data: RefinementModifierData, conditions?: ConditionData[] }
    | { type: ModifierTypes.Stats; data: StatsModifierData, conditions?: ConditionData[] };

export function newModifier(m: ModifierData): iModifier {
    switch (m.type) {
        case ModifierTypes.Stats:
            return new StatsModifier(m.data, m.conditions);
        case ModifierTypes.Refinement:
            return new RefinementModifier(m.data, m.conditions);
        default:
            // @ts-expect-error unknown type
            throw new Error(`Unsupported Modifier Type: ${m.type}`)
    }
}

export function newCondition(c: ConditionData): iCondition {
    switch (c.type) {
        case ConditionTypes.Refinement:
            return new RefinementCondition(c.data)
        case ConditionTypes.EquipmentSet:
            return new EquipmentSetCondition(c.data)
            
    }
}