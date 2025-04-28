import { AttackTypes, AttackRangeTypes } from "@/engine/types/config";
import { iCondition } from "./engine";
import { ElementTypes, ItemLocations } from "@/engine/types/enums";
import { JobIds } from "@/engine/types/enums";
import { RaceTypes } from "@/engine/types/enums";
import { SizeTypes } from "@/engine/types/enums";
import { TargetTypes } from "@/engine/types/enums";
import { iEquipment } from "@/engine/types/equipment";
import { iCard } from "@/engine/types/card";

export enum ConditionTypes {
    Refinement = "refinement",
    EquipmentSet = "equipmentSet",
    Target = "target",
    AttackType = "attackType",
    Level = "level",
    Card = "card",
    Job = "job",
    Skill = "skill"
}

export enum ComparisonConditions {
    EQ = "eq",
    GT = "gt",
    GTE = "gte",
    LT = "lt",
    LTE = "lte",
    NEQ = "neq"
}

export type AttackTypeConditionData = {
    attackType?: AttackTypes;
    attackRangeType?: AttackRangeTypes;
    attackElement?: ElementTypes;
}

export interface CardSetConditionData {
    names: string[];
}

export interface EquipmentSetConditionData {
    names: string[];
}

export type JobConditionData = {
    jobs: JobIds[];
}

export type LevelConditionData = {
    level: number;
    operator: ComparisonConditions;
}

export interface RefinementConditionData {
    // If the condition is on another equipment
    // Use location to point to it.
    location?: ItemLocations;
    refinement: number;
    condition: ComparisonConditions;
}
export type SkillConditionData = {
    id: string;
    level?: number;
    levelComparisonOperator?: ComparisonConditions;
}
export type TargetConditionData = {
    race?: RaceTypes;
    size?: SizeTypes;
    element?: ElementTypes;
    type?: TargetTypes;
}

export type EquipmentSet = {
    source: iEquipment;
    targets: (iEquipment | iCard)[];
    condition: iCondition;
}

// Condition data has the JSON representation of all possible conditions
export type ConditionData = { type: ConditionTypes.Refinement; data: RefinementConditionData; } |
{ type: ConditionTypes.EquipmentSet; data: EquipmentSetConditionData; } |
{ type: ConditionTypes.Target; data: TargetConditionData; } |
{ type: ConditionTypes.AttackType; data: AttackTypeConditionData; } |
{ type: ConditionTypes.Card; data: CardSetConditionData; } |
{ type: ConditionTypes.Job; data: JobConditionData; } |
{ type: ConditionTypes.Level; data: LevelConditionData; } |
{ type: ConditionTypes.Skill; data: SkillConditionData; };

