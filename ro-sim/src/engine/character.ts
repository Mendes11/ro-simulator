import { AttributesData } from "@/types/attributes";
import { iCard } from "@/types/card";
import { CharacterData, CharacterEquipments, iCharacter } from "@/types/character";
import { iEquipmentInstance } from "@/types/equipmentInstance";
import { Job } from "@/types/jobs";

export class Character implements iCharacter {
    level: number;
    baseAttrs: AttributesData;
    equipments: CharacterEquipments;
    job: Job;

    public constructor(data: CharacterData){
        this.level = data.level;
        this.baseAttrs = data.baseAttrs;
        this.equipments = data.equipments;
        this.job = data.job;
    }

    findEquipmentByName(name: string){
        return this.equipmentsList().find(e => e.equipment.name === name);
    }

    findCardByName(name: string): { slot: iCard; equipmentInstance: iEquipmentInstance; } | undefined {
        return this.cardsList().find(({slot}) => slot.name === name);
    }

    equipmentsList(): iEquipmentInstance[]{
        return Object.keys(this.equipments)
                .map(k => this.equipments[k as keyof CharacterEquipments])
                .filter(e => e != null);
    }
    
    cardsList(): { slot: iCard, equipmentInstance: iEquipmentInstance}[] {
        return this.equipmentsList().flatMap(e => e.slots.flatMap(slot => ({slot: slot, equipmentInstance: e})))
    }

}