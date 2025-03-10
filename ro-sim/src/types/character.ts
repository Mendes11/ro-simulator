import { iEquipmentInstance } from "./equipmentInstance";
import { iCard } from "./card";
import { AttributesData } from "./attributes";
import { Job } from "./jobs";
import { SimulationSummary } from "@/engine/simulation";
import { ItemLocations } from "./equipment";
import { iSkillInstance } from "./skills";

export type CharacterEquipments = {
    top?: iEquipmentInstance;
    mid?: iEquipmentInstance;
    bottom?: iEquipmentInstance;
    armor?: iEquipmentInstance;
    rightHand?: iEquipmentInstance;
    leftHand?: iEquipmentInstance;
    garment?: iEquipmentInstance;
    shoes?: iEquipmentInstance;
    rightAccessory?: iEquipmentInstance;
    leftAccessory?: iEquipmentInstance;
}

export type CharacterData = {
    level: number;
    baseAttrs: AttributesData,
    equipments: CharacterEquipments;
    job: Job;
    // shadowEquipments: CharacterEquipments;
    // job: Jobs
    // skills: iSkillInstance[]
}
export interface iCharacter extends CharacterData {
    findSkill: (id: string) => iSkillInstance | undefined;
    findEquipmentByName: (name: string) => iEquipmentInstance | undefined
    findEquipmentByLocation: (location: ItemLocations) => iEquipmentInstance | undefined;
    findCardByName: (name: string) => {slot: iCard, equipmentInstance: iEquipmentInstance} | undefined
}
