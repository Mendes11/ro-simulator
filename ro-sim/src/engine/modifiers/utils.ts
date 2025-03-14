import { iModifier } from "@/types/equipment";
import { StatsModifier, StatsModifierData } from "./statsModifier";
import { RefinementModifier, RefinementModifierData } from "./refinementModifier";
import { ConditionData, ConditionTypes, iCondition } from "@/types/condition";
import { RefinementCondition } from "./conditions/refinementCondition";
import { EquipmentSetCondition } from "./conditions/equipmentSetCondition";
import { CardSetCondition } from "./conditions/cardSetCondition";
import { AttackTypeCondition } from "./conditions/attackTypeCondition";
import { TargetCondition } from "./conditions/targetCondition";
import { JobCondition } from "./conditions/jobCondition";
import { LevelCondition } from "./conditions/levelCondition";
import { SkillCondition } from "./conditions/skillCondition";
import { Combo, ComboModifierData } from "./combo";

export enum ModifierTypes {
    Stats,
    Refinement,
    Combo
}
export type ModifierData =
    | { type: ModifierTypes.Refinement; data: RefinementModifierData, conditions?: ConditionData[] }
    | { type: ModifierTypes.Stats; data: StatsModifierData, conditions?: ConditionData[] }
    | { type: ModifierTypes.Combo; data: ComboModifierData, conditions?: ConditionData[] }

export function newModifier(m: ModifierData): iModifier {
    switch (m.type) {
        case ModifierTypes.Stats:
            return new StatsModifier(m.data, m.conditions);
        case ModifierTypes.Refinement:
            return new RefinementModifier(m.data, m.conditions);
        case ModifierTypes.Combo:
            return new Combo(m.data, m.conditions);
        default:
            // @ts-expect-error unknown type
            throw new Error(`Unsupported Modifier Type: ${m.type}`)
    }
}

export function newCondition(c: ConditionData): iCondition {
    switch (c.type) {
        case ConditionTypes.Refinement:
            return new RefinementCondition(c.data);
        case ConditionTypes.EquipmentSet:
            return new EquipmentSetCondition(c.data);
        case ConditionTypes.Card:
            return new CardSetCondition(c.data);
        case ConditionTypes.AttackType:
            return new AttackTypeCondition(c.data);
        case ConditionTypes.Target:
            return new TargetCondition(c.data);
        case ConditionTypes.Job:
            return new JobCondition(c.data);
        case ConditionTypes.Level:
            return new LevelCondition(c.data);
        case ConditionTypes.Skill:
            return new SkillCondition(c.data);
    }
}