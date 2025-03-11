import { Equipment } from "@/engine/equipments/equipment";
import { iCharacter } from "./character";
import { iEquipment, ItemLocations, ModifierSourceData } from "./equipment";
import { iTarget } from "./target";
import { iCard } from "./card";
import { AttackInfo } from "@/engine/simulation";
import { RefinementConditionData } from "@/engine/modifiers/conditions/refinementCondition";
import { EquipmentSetConditionData } from "@/engine/modifiers/conditions/equipmentSetCondition";
import { TargetConditionData } from "@/engine/modifiers/conditions/targetCondition";
import { AttackTypeConditionData } from "@/engine/modifiers/conditions/attackTypeCondition";
import { CardSetConditionData } from "@/engine/modifiers/conditions/cardSetCondition";
import { JobConditionData } from "@/engine/modifiers/conditions/jobCondition";
import { LevelConditionData } from "@/engine/modifiers/conditions/levelCondition";
import { SkillConditionData } from "@/engine/modifiers/conditions/skillCondition";
import { AttackRangeTypes, AttackTypes } from "./attackMultiplier";
import { ElementType } from "react";
import { ElementTypes } from "./element";

export enum ConditionTypes {
    Refinement,
    EquipmentSet,
    Target,
    AttackType,
    Level,
    Card,
    Job,
    Skill,
    // TODO: Enchants aren't implemented yet
    // Enchant,
}

export enum ComparisonConditions {
    EQ,
    GT,
    GTE,
    LT,
    LTE,
    NEQ
}


export type EquipmentSet = {
    source: iEquipment;
    target: iEquipment | iCard
    condition: iCondition
}

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
