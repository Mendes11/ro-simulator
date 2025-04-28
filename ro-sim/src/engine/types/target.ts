import { ElementTypes, RaceTypes, TargetTypes } from "@/engine/types/enums";
import { SizeTypes } from "@/engine/types/enums";

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

