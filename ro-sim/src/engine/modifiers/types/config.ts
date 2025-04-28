import { iModifier } from "./engine";
import { ConditionData } from "../conditions/types/config";
import { AttackModifiersData } from "@/engine/types/config";
import { AttackMultipliersData } from "@/engine/types/config";
import { AttributesData } from "@/engine/types/config";
import { CharacterSubStatsData } from "@/engine/types/config";

export enum ModifierTypes {
    Stats,
    Refinement,
    Combo,
    LevelSteps,
    AttributeSteps
}

// Maps ModifierTypes to their respective configuration type.
export type ModifierData = { type: ModifierTypes.Refinement; data: RefinementModifierData; conditions?: ConditionData[]; } |
    { type: ModifierTypes.Stats; data: StatsModifierData; conditions?: ConditionData[]; } |
    { type: ModifierTypes.Combo; data: ComboModifierData; conditions?: ConditionData[]; } |
    { type: ModifierTypes.LevelSteps, data: LevelModifierData, conditions?: ConditionData[]; } |
    { type: ModifierTypes.AttributeSteps, data: AttributeModifierData, conditions?: ConditionData[];};

// StatsModifierData is the modifier that holds all attributes.
// In any modifier tree, this is the final element
export interface StatsModifierData {
    attributes?: AttributesData;
    subStats?: CharacterSubStatsData;
    attackMultipliers?: AttackMultipliersData;
    attackModifiers?: AttackModifiersData;
}

export type ComboModifierData = {
    modifiers: ModifierData[];
};

// RefinementModifier is used to compute a multiplier on top of another modifier.
// Used for items with descriptions such as
//  - "A cada [refino | nível de refino]: ATQ+30"
//  - "A cada refino até o +12: ..."
//  - ""
export type RefinementModifierData = {
    refinementSteps: number;
    minRefinement?: number;
    maxRefinement?: number;
    modifier: iModifier | ModifierData;
}


// LevelModifier is used to compute a level-based multiplier on top of another modifier.
// Used for items with descriptions such as
//  - "A cada X níveis: <downstream modifier>"
//  - "A cada X níveis a partir do 50: <downstream modifier>"
//  - ""
export type LevelModifierData = {
  levelSteps: number;
  minLevel?: number;
  maxLevel?: number;
  modifier: iModifier | ModifierData;
}

// AttributeModifier is used to compute an attribute-based multiplier on top of another modifier.
// Used for items with descriptions such as
//  - "A cada 10 de AGI base: <downstream modifier>"
//  - "A cada X níveis a partir do 50: <downstream modifier>"
//  - ""
export type AttributeModifierData = {
  attribute: keyof AttributesData;
  attributeSteps: number;
  minValue?: number;
  maxValue?: number;
  modifier: iModifier | ModifierData;
}
