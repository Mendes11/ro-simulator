import { iEquipmentInstance } from "./equipmentInstance";
import { iSlot } from "./slot";
import { Jobs } from "./jobs";
import { iSkillInstance } from "./skills";
import { AttributesData } from "./attributes";

export interface iCharacterEquipments {
    top?: iEquipmentInstance;
    mid?: iEquipmentInstance;
    bottom?: iEquipmentInstance;
    armor?: iEquipmentInstance;
    rightHand?: iEquipmentInstance;
    leftHand?: iEquipmentInstance;
    cloack?: iEquipmentInstance;
    shoes?: iEquipmentInstance;
    rightAccessory?: iEquipmentInstance;
    leftAccessory?: iEquipmentInstance;
}


export interface iCharacter {
    level: number;
    baseAttrs: AttributesData,
    equipments: iCharacterEquipments;
    shadowEquipments: iCharacterEquipments;
    job: Jobs
    skills: iSkillInstance[]

    findEquipmentByName: (name: string) => iEquipmentInstance | null
    findCardByName: (name: string) => {slot: iSlot, equipmentInstance: iEquipmentInstance} | null
}
