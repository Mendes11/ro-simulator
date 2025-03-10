import { AttributesData } from "@/types/attributes";
import { iCard } from "@/types/card";
import { CharacterData, CharacterEquipments, iCharacter } from "@/types/character";
import { ItemLocations } from "@/types/equipment";
import { iEquipmentInstance } from "@/types/equipmentInstance";
import { Job } from "@/types/jobs";
import { iSkillInstance } from "@/types/skills";

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

    findSkill(id: string){
        // TODO: Implement this.
        return undefined;
    }

    findEquipmentByName(name: string){
        return this.equipmentsList().find(e => e.equipment.name === name);
    }

    findEquipmentByLocation(location: ItemLocations){
        return this.equipmentsList().find(e => ((e.equipment.allowedLocations?.some(l => (l & location) != 0))));
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