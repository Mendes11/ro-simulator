import { iArmor, iCharacterModifiers, iWeapon, ModifierResult } from "./equipment";
import { ElementTypes, ItemLocations } from "@/engine/types/enums";
import { iCard } from "./card";
import { EquipmentSet } from "../modifiers/conditions/types/config";
import { iCharacter } from "./character";
import { iSkillInstance } from "./skills";
import { iTarget } from "./target";


export type InstanceActiveModifiers = {
    equipmentModifiers: ModifierResult[];
    cardsModifiers: ModifierResult[];
    finalModifier: iCharacterModifiers;
}

export type EquipmentInstanceData = {
    id?: number,
    equipment: (iArmor | iWeapon),
    location: ItemLocations,
    sourceLocation: ItemLocations,
    refinement: number,
    slots: iCard[],
}

export type ActiveInstanceModifiersData = {
    character: iCharacter,
    sets: EquipmentSet[],
    element: ElementTypes,
    target: iTarget,
    skill?: iSkillInstance
}

// EquipmentInstance is the materialization of an equipment, with refinement, and cards attached
export interface iEquipmentInstance extends EquipmentInstanceData {
    resolveModifiers(data: ActiveInstanceModifiersData): InstanceActiveModifiers;
}
