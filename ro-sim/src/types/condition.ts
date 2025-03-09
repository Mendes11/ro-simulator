import { Equipment } from "@/engine/equipments/equipment";
import { iCharacter } from "./character";
import { iEquipment, ItemLocations, ModifierSourceData } from "./equipment";
import { iTarget } from "./target";
import { iCard } from "./card";

export enum ConditionTypes {
    Refinement,
    EquipmentSet,
    Level,
    Card,
    Job,
    Enchant,
    Skill // Skill level
}

export enum ComparisonConditions {
    EQ,
    GT,
    GTE,
    LT,
    LTE,
    NEQ
}

export interface RefinementConditionData {
    // If the condition is on another equipment
    // Use location to point to it.
    location?: ItemLocations
    refinement: number
    condition: ComparisonConditions
}

export interface EquipmentSetConditionData {
    name: string;
}

export type ConditionData =
    | { type: ConditionTypes.Refinement, data: RefinementConditionData }
    | { type: ConditionTypes.EquipmentSet, data: EquipmentSetConditionData};


export type ConditionCheckData = {
    source: ModifierSourceData;
    character: iCharacter;
    target: iTarget;
    // A set can only be applied once for equipments, cards, and enchantments
    sets: {source: iEquipment, target: iEquipment | iCard }[]
}
export interface iCondition {
    check: (data: ConditionCheckData) => boolean;
}
