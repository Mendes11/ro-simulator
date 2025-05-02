/* eslint-disable @typescript-eslint/ban-ts-comment */
import { iModifier } from "./types/engine";
import { StatsModifier } from "./statsModifier";
import { RefinementModifier } from "./refinementModifier";
import { iCondition } from "./conditions/types/engine";
import { ConditionData } from "./conditions/types/config";
import { ConditionTypes } from "./conditions/types/config";
import { RefinementCondition } from "./conditions/refinementCondition";
import { EquipmentSetCondition } from "./conditions/equipmentSetCondition";
import { CardSetCondition } from "./conditions/cardSetCondition";
import { AttackTypeCondition } from "./conditions/attackTypeCondition";
import { TargetCondition } from "./conditions/targetCondition";
import { JobCondition } from "./conditions/jobCondition";
import { LevelCondition } from "./conditions/levelCondition";
import { SkillCondition } from "./conditions/skillCondition";
import { Combo } from "./combo";
import { ModifierData, ModifierTypes } from "./types/config";
import { LevelModifier } from "./levelModifier";
import { AttributeModifier } from "./attributeModifier";

export function newModifier(m: ModifierData): iModifier {
    switch (m.type) {
        // @ts-ignore
        case "Stats": // The parser is sometimes using a string instead of the ModifierTypes.<Type> expression.
        case ModifierTypes.Stats:
            return new StatsModifier(m.data, m.conditions);
        // @ts-ignore
        case "Refinement":
        case ModifierTypes.Refinement:
            return new RefinementModifier(m.data, m.conditions);
        // @ts-ignore
        case "Combo":
        case ModifierTypes.Combo:
            return new Combo(m.data, m.conditions);
        // @ts-ignore
        case "LevelSteps":
        case ModifierTypes.LevelSteps:
          return new LevelModifier(m.data, m.conditions);
        // @ts-ignore
        case "AttributeSteps":
        case ModifierTypes.AttributeSteps:
          return new AttributeModifier(m.data, m.conditions);
        default:
            // @ts-expect-error unknown type
            throw new Error(`Unsupported Modifier Type: ${m.type}`)
    }
}

export function newCondition(c: ConditionData): iCondition {
    switch (c.type) {
        // @ts-ignore
        case "Refinement":
        case ConditionTypes.Refinement:
            return new RefinementCondition(c.data);
        // @ts-ignore
        case "EquipmentSet":
        case ConditionTypes.EquipmentSet:
            return new EquipmentSetCondition(c.data);
        // @ts-ignore
        case "Card":
        case ConditionTypes.Card:
            return new CardSetCondition(c.data);
        // @ts-ignore
        case "AttackType":
        case ConditionTypes.AttackType:
            return new AttackTypeCondition(c.data);
        // @ts-ignore
        case "Target":
        case ConditionTypes.Target:
            return new TargetCondition(c.data);
        // @ts-ignore
        case "Job":
        case ConditionTypes.Job:
            return new JobCondition(c.data);
        // @ts-ignore
        case "Level":
        case ConditionTypes.Level:
            return new LevelCondition(c.data);
        // @ts-ignore
        case "Skill":
        case ConditionTypes.Skill:
            return new SkillCondition(c.data);
        default:
            throw new Error(`Unsupported Condition Type: ${c.type}`)
    }
}
