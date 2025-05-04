/* eslint-disable @typescript-eslint/ban-ts-comment */
import { iModifier } from "./types/engine";
import { StatsModifier } from "./statsModifier";
import { RefinementModifier } from "./refinementModifier";
import { iCondition } from "./conditions/types/engine";
import { ConditionData, EquipmentSet, RefinementConditionData } from "./conditions/types/config";
import { RefinementCondition } from "./conditions/refinementCondition";
import { EquipmentSetCondition } from "./conditions/equipmentSetCondition";
import { CardSetCondition } from "./conditions/cardSetCondition";
import { AttackTypeCondition } from "./conditions/attackTypeCondition";
import { TargetCondition } from "./conditions/targetCondition";
import { JobCondition } from "./conditions/jobCondition";
import { LevelCondition } from "./conditions/levelCondition";
import { SkillCondition } from "./conditions/skillCondition";
import { Combo } from "./combo";
import { AttributeModifierData, ComboModifierData, LevelModifierData, ModifierData, ModifierTypes, RefinementModifierData, StatsModifierData } from "./types/config";
import { LevelModifier } from "./levelModifier";
import { AttributeModifier } from "./attributeModifier";
import { AttributeCondition } from "./conditions/attributeCondition";
import { CardSetConditionData } from "./conditions/types/config";
import { EquipmentSetConditionData } from "./conditions/types/config";
import { AttackTypeConditionData } from "./conditions/types/config";
import { TargetConditionData } from "./conditions/types/config";
import { JobConditionData } from "./conditions/types/config";
import { LevelConditionData } from "./conditions/types/config";
import { SkillConditionData } from "./conditions/types/config";
import { AttributeConditionData } from "./conditions/types/config";
import { ModifierApplyData } from "../types/equipment";
import { iCharacter } from "../types/character";
import { ElementTypes } from "../types/enums";
import { AttackTypes, AttackRangeTypes } from "../types/config";
import { iSkillInstance } from "../types/skills";
import { iTarget } from "../types/target";
import { iEquipmentInstance } from "../types/equipmentInstance";


export function newModifier(m: ModifierData): iModifier {
    switch (m.type.toString().toLowerCase()) {
        case "0":
        case "stats": // The parser is sometimes using a string instead of the ModifierTypes.<Type> expression.
        case ModifierTypes.Stats:
            return new StatsModifier(m.data as StatsModifierData, m.conditions);
        case "1":
        case "refinement":
        case ModifierTypes.Refinement:
            return new RefinementModifier(m.data as RefinementModifierData, m.conditions);
        case "2":
        case "combo":
        case ModifierTypes.Combo:
            return new Combo(m.data as ComboModifierData, m.conditions);
        case "3":
        case "levelsteps":
        case ModifierTypes.LevelSteps:
          return new LevelModifier(m.data as LevelModifierData, m.conditions);
        case "4":
        case "attributesteps":
        case ModifierTypes.AttributeSteps:
          return new AttributeModifier(m.data as AttributeModifierData, m.conditions);
        default:
            throw new Error(`Unsupported Modifier Type: ${m.type}`)
    }
}


export function newCondition(c: ConditionData): iCondition {
    switch (c.type.toString().toLowerCase()) {
        // The AI turned out to be a bit... creative with the condition types.
        // It didn't respect the instruction to put a call to the enum, and decided to use either the position or string value.
        case "0":
        case "refinement":
            return new RefinementCondition(c.data as RefinementConditionData);
        case "1":
        case "equipmentset":
            return new EquipmentSetCondition(c.data as EquipmentSetConditionData);
        case "2":
        case "target":
            return new TargetCondition(c.data as TargetConditionData);
        case "3":
        case "attacktype":
            return new AttackTypeCondition(c.data as AttackTypeConditionData);
        case "4":
        case "level":
            return new LevelCondition(c.data as LevelConditionData);
        case "5":
        case "card":
            return new CardSetCondition(c.data as CardSetConditionData);
        case "6":
        case "job":
            return new JobCondition(c.data as JobConditionData);
        case "7":
        case "skill":
            return new SkillCondition(c.data as SkillConditionData);
        case "8":
        case "attribute":
            return new AttributeCondition(c.data as AttributeConditionData);
        default:
            throw new Error(`Unsupported Condition Type: ${c.type}`)
    }
}

export function newModifierApplyData(
    character: iCharacter,
    equipment: iEquipmentInstance,
    element: ElementTypes,
    target: iTarget,
    sets: EquipmentSet[],
    skill?: iSkillInstance
): ModifierApplyData {
    return {
        character: character,
        sets: sets,
        target: target,
        attackInfo: {
            element: element,
            attackType: skill?.skill.attackType ?? AttackTypes.Physical,
            attackRangeType: skill?.skill.attackRangeType ?? AttackRangeTypes.Melee,
        },
        source: {
            instance: equipment,
            location: equipment.location
        }
    }
}
