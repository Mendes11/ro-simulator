import { AttackTypes, AttackRangeTypes } from "@/engine/types/config";
import { EquipmentSet } from "./config";
import { ElementTypes } from "@/engine/types/enums";
import { ModifierSourceData } from "@/engine/types/equipment";
import { iCharacter } from "@/engine/types/character";
import { iTarget } from "@/engine/types/target";

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

