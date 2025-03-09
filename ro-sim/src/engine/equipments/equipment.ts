import { CharacterData } from "@/types/character";
import { EquipmentData, iEquipment, iModifier, ItemLocations, ItemSubTypes, ItemTypes } from "@/types/equipment";
import { SimulationSummary } from "../simulation";


export class Equipment implements iEquipment {
    type: ItemTypes;
    subType?: ItemSubTypes | undefined;
    id: number;
    name: string;
    description: string;
    allowedLocations?: ItemLocations[] | undefined;
    slots: number;
    weight: number;
    minLevel: number;
    modifiers: iModifier[];

    public constructor(data: EquipmentData, modifiers: iModifier[]) {
    this.type = data.type;
        this.subType = data.subType;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.allowedLocations = data.allowedLocations;
        this.slots = data.slots;
        this.weight = data.weight;
        this.minLevel = data.minLevel;
        this.modifiers = modifiers;
    }

    apply(refinement: number, character: CharacterData, summary: SimulationSummary){
    }
}


const NewEquipment = (data: EquipmentData): iEquipment => {
    return {
        ...data,
    }
}
