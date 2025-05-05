import { iEquipmentInstance } from "./equipmentInstance";
import { iCard } from "./card";
import { iAttributes } from "@/engine/types/attributes";
import { Job } from "./jobs";
import { ElementTypes, ItemLocations } from "@/engine/types/enums";
import { iSkillInstance } from "./skills";
import { iTarget } from "./target";
import { iCharacterModifiers } from "./equipment";

export type CharacterData = {
    level: number;
    baseAttrs: iAttributes,
    equipments: iEquipmentInstance[];
    job: Job;
    shadowEquipments: iEquipmentInstance[];
    // skills: iSkillInstance[]
}

export type ActiveModifier = {
    eqp: iEquipmentInstance;
    charModifiers: iCharacterModifiers
}

export interface iCharacter extends CharacterData {
    findSkill: (id: string) => iSkillInstance | undefined;
    findEquipmentByName: (name: string) => iEquipmentInstance | undefined
    findEquipmentByLocation: (location: ItemLocations) => iEquipmentInstance | undefined;
    findCardByName: (name: string) => {slot: iCard, equipmentInstance: iEquipmentInstance} | undefined
    activeModifiers: (element: ElementTypes, target: iTarget, skill?: iSkillInstance) => ActiveModifier[]
}
