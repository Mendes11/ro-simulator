import { iEquipmentInstance } from "./equipmentInstance";
import { iCard } from "./card";
import { AttributesData } from "./attributes";
import { Job } from "./jobs";
import { SimulateResult } from "@/engine/simulation";
import { ItemLocations } from "./equipment";
import { iSkillInstance } from "./skills";
import { iTarget } from "./target";
import { ElementTypes } from "./element";

export type CharacterData = {
    level: number;
    baseAttrs: AttributesData,
    equipments: iEquipmentInstance[];
    job: Job;
    // shadowEquipments: iEquipmentInstance;
    // job: Jobs
    // skills: iSkillInstance[]
}
export interface iCharacter extends CharacterData {
    findSkill: (id: string) => iSkillInstance | undefined;
    findEquipmentByName: (name: string) => iEquipmentInstance | undefined
    findEquipmentByLocation: (location: ItemLocations) => iEquipmentInstance | undefined;
    findCardByName: (name: string) => {slot: iCard, equipmentInstance: iEquipmentInstance} | undefined

    simulate: (element: ElementTypes,  target: iTarget, skill?: iSkillInstance) => SimulateResult
}
