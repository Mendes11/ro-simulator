import { ElementTypes } from "./element";
import { RaceTypes } from "./race";
import { SizeTypes } from "./size";

// TargetTypes indicates that the multiplier will be applied to
// a specific type of monster.
// Eg: Abysmal Knight:
//    - multiplier = 25%
//    - attackType: Physical
//    - targetType: Boss
//    - multiplierType: Default
export enum TargetTypes {
    All,
    Normal,
    SemiBoss,
    Boss,
    
}

export interface iTarget {
    type: TargetTypes
    element: ElementTypes
    size: SizeTypes
    race: RaceTypes
    softDef: number
    attackDef: number
}

