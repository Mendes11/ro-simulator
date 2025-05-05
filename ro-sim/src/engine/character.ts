import { iAttributes } from "./types/attributes";
import { ItemLocations } from "./types/enums";
import { CharacterData } from "./types/character";

import { Attributes } from "./attributes";
import { ElementTypes } from "./types/enums";
import { Novice } from "./jobs/novice";
import { EquipmentSet } from "./modifiers/conditions/types/config";
import { iCharacter } from "./types/character";
import { iEquipmentInstance } from "./types/equipmentInstance";
import { Job } from "./types/jobs";
import { iCard } from "./types/card";
import { iTarget } from "./types/target";
import { iSkillInstance } from "./types/skills";
import { iCharacterModifiers } from "./types/equipment";

export class Character implements iCharacter {
    level: number;
    baseAttrs: iAttributes;
    equipments: iEquipmentInstance[];
    shadowEquipments: iEquipmentInstance[];
    job: Job;

    public constructor(data?: CharacterData){
        this.level = data?.level ?? 1;
        this.baseAttrs = new Attributes(data?.baseAttrs);
        this.equipments = data?.equipments ?? [];
        this.shadowEquipments = data?.shadowEquipments ?? [];
        this.job = data?.job ?? Novice;
    }

    allEquipments(): iEquipmentInstance[] {
        return [...this.equipments, ...this.shadowEquipments];
    }

    findSkill(){
        // TODO: Implement this.
        return undefined;
    }

    findEquipmentByName(name: string){
        return this.allEquipments().find(e => e.equipment.name === name);
    }

    findEquipmentByLocation(location: ItemLocations){
        return this.equipments.find(e => (e.sourceLocation & location) != 0);
    }

    findCardByName(name: string): { slot: iCard; equipmentInstance: iEquipmentInstance; } | undefined {
        return this.cardsList().find(({slot}) => slot.name === name);
    }

    cardsList(): { slot: iCard, equipmentInstance: iEquipmentInstance}[] {
        return this.equipments.flatMap(e => e.slots.flatMap(slot => ({slot: slot, equipmentInstance: e})))
    }

    activeModifiers(element: ElementTypes, target: iTarget, skill?: iSkillInstance): {eqp: iEquipmentInstance, charModifiers: iCharacterModifiers}[] {
        const sets: EquipmentSet[] = [];
        return this.allEquipments().map(eqp =>({
            eqp: eqp,
            charModifiers: eqp.resolveModifiers({
                character: this,
                sets: sets,
                element: element,
                target: target,
                skill: skill
            }).finalModifier
        }));
    }
}
