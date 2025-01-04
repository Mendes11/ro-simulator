import { iCharacter } from "./character";
import { iEquipment } from "./equipment";
import { iModifier } from "./modifier";
import { iSlot } from "./slot";

// EquipmentInstance is the materialization of an equipment, with refinement, and cards attached
export interface iEquipmentInstance {
    id?: number,
    equipment: iEquipment,
    refinement: number,
    slots: iSlot[],

    getModifiers(character: iCharacter): iModifier[]
}


export class EquipmentInstance {
    equipment: iEquipment
    refinement: number
    slots: iSlot[]

    public constructor(equipment: iEquipment, refinement=0, slots=[]) {
        this.equipment = equipment;
        this.refinement = refinement;
        this.slots = slots;
    }

    getModifiers(character: iCharacter) {
        
    }
}