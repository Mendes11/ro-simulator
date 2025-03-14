import { iCharacter } from "./character";
import { iEquipment, ModifierSourceData } from "./equipment";
import { iTarget } from "./target";
import { iCard } from "./card";
import { RefinementConditionData } from "@/engine/modifiers/conditions/refinementCondition";
import { EquipmentSetConditionData } from "@/engine/modifiers/conditions/equipmentSetCondition";
import { TargetConditionData } from "@/engine/modifiers/conditions/targetCondition";
import { AttackTypeConditionData } from "@/engine/modifiers/conditions/attackTypeCondition";
import { CardSetConditionData } from "@/engine/modifiers/conditions/cardSetCondition";
import { JobConditionData } from "@/engine/modifiers/conditions/jobCondition";
import { LevelConditionData } from "@/engine/modifiers/conditions/levelCondition";
import { SkillConditionData } from "@/engine/modifiers/conditions/skillCondition";
import { AttackRangeTypes, AttackTypes } from "./attackMultiplier";
import { ElementTypes } from "./element";

export enum ConditionTypes {
    Refinement = "refinement",
    EquipmentSet = "equipmentSet",
    Target = "target",
    AttackType = "attackType",
    Level = "level",
    Card = "card",
    Job = "job",
    Skill = "skill",
    // TODO: Enchants aren't implemented yet
    // Enchant,
}

export enum ComparisonConditions {
    EQ = "eq",
    GT = "gt",
    GTE = "gte",
    LT = "lt",
    LTE = "lte",
    NEQ = "neq"
}


export type EquipmentSet = {
    source: iEquipment;
    target: iEquipment | iCard
    condition: iCondition
}

// Condition data has the JSON representation of all possible conditions
export type ConditionData =
    | { type: ConditionTypes.Refinement, data: RefinementConditionData }
    | { type: ConditionTypes.EquipmentSet, data: EquipmentSetConditionData}
    | { type: ConditionTypes.Target, data: TargetConditionData}
    | { type: ConditionTypes.AttackType, data: AttackTypeConditionData}
    | { type: ConditionTypes.Card, data: CardSetConditionData }
    | { type: ConditionTypes.Job, data: JobConditionData }
    | { type: ConditionTypes.Level, data: LevelConditionData }
    | { type: ConditionTypes.Skill, data: SkillConditionData};


export type ConditionAttackinfo = {
    element: ElementTypes;
    attackType: AttackTypes;
    attackRangeType: AttackRangeTypes;
}

export interface ConditionCheckData {
    source: ModifierSourceData;
    character: iCharacter;
    target: iTarget;
    attackInfo: ConditionAttackinfo;

    setAlreadyInUse: (set: EquipmentSet) => boolean;
    addSet: (set: EquipmentSet) => void;
}
export interface iCondition {
    check: (data: ConditionCheckData) => boolean;
}
