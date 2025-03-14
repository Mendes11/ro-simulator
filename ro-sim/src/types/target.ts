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
    Normal, // Maps to Normal
    SemiBoss, // LLM Hint: Not used
    Boss, // Maps to Chefe

}

export type TargetData = {
    type: TargetTypes
    element: ElementTypes
    size: SizeTypes
    race: RaceTypes
    softDef: number;
    hardDef: number;
    softDefM: number;
    hardDefM: number;
    reductions: {
        race: number;
        size: number;
        attackElement: number;
        targetElement: number;
        default: number;
        range: number;
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
export interface iTarget extends TargetData {
}

