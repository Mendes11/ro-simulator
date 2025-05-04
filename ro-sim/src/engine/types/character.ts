import { iEquipmentInstance } from "./equipmentInstance";
import { iCard } from "./card";
import { AttributesData } from "@/engine/types/attributes";
import { Job } from "./jobs";
import { SimulateResult } from "@/engine/simulation";
import { ElementTypes, ItemLocations } from "@/engine/types/enums";
import { iSkillInstance } from "./skills";
import { iTarget } from "./target";

export type CharacterData = {
    level: number;
    baseAttrs: AttributesData,
    equipments: iEquipmentInstance[];
    job: Job;
    shadowEquipments: iEquipmentInstance[];
    // skills: iSkillInstance[]
}
export interface iCharacter extends CharacterData {
    findSkill: (id: string) => iSkillInstance | undefined;
    findEquipmentByName: (name: string) => iEquipmentInstance | undefined
    findEquipmentByLocation: (location: ItemLocations) => iEquipmentInstance | undefined;
    findCardByName: (name: string) => {slot: iCard, equipmentInstance: iEquipmentInstance} | undefined

    simulate: (element: ElementTypes,  target: iTarget, skill?: iSkillInstance) => SimulateResult
}
