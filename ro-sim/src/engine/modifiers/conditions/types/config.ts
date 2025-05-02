import { AttackTypes, AttackRangeTypes, AttributesData } from "@/engine/types/config";
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
    Skill = "skill",
    Attribute = "attribute",
}

export enum ComparisonConditions {
    EQ = "eq",
    GT = "gt",
    GTE = "gte",
    LT = "lt",
    LTE = "lte",
    NEQ = "neq"
}

// Used for modifiers conditioned to attack attributes
export type AttackTypeConditionData = {
    attackType?: AttackTypes;
    attackRangeType?: AttackRangeTypes;
    attackElement?: ElementTypes;
}

// Used for modifiers conditioned to the presence of a set of cards by name.
export interface CardSetConditionData {
    names: string[];
}

// Used for modifiers conditioned to the presence of a set of equipments by name.
export interface EquipmentSetConditionData {
    names: string[];
}

// Used for modifiers conditioned to the character's job.
export type JobConditionData = {
    jobs: JobIds[];
}

// Used for modifiers conditioned to the character's level.
 export type LevelConditionData = {
    level: number;
    operator: ComparisonConditions;
}

// Used for modifiers conditioned to a refinement level. If the condition isn't on the same equipment, but rather has
// a location specified, you must provide the location of the equipment.
export interface RefinementConditionData {
    // If the condition is on another equipment
    // Use location to point to it.
    location?: ItemLocations;
    refinement: number;
    condition: ComparisonConditions;
}

// Used for conditional modifiers when a specific skill is learnt, and additionally at a specific level (not required)
export type SkillConditionData = {
    id: string;
    level?: number;
    levelComparisonOperator?: ComparisonConditions;
}

// Used for conditional modifiers against a specific target's attributes
export type TargetConditionData = {
    race?: RaceTypes;
    size?: SizeTypes;
    element?: ElementTypes;
    type?: TargetTypes;
}

// Used for conditions on an attribute such as "AGI base 50 ou mais: <downstream_modifier>"
export type AttributeConditionData = {
    attribute: keyof AttributesData;
    value: number;
    operator: ComparisonConditions;
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
{ type: ConditionTypes.Skill; data: SkillConditionData; } |
{ type: ConditionTypes.Attribute; data: AttributeConditionData; };


