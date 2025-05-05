import { ModifierData } from "./modifiers/types/config";
import { iModifier } from "./modifiers/types/engine";
import { newModifier } from "./modifiers/utils";
import { ItemLocations } from "./types/enums";
import { EquipmentData, iEquipment, ItemSubTypes, ItemTypes, ModifierApplyData, ModifierResult } from "./types/equipment";


export class Equipment implements iEquipment {
    type: ItemTypes;
    subType?: ItemSubTypes;
    id: number;
    name: string;
    description: string;
    modifiers?: ModifierData[];
    modifierInstances: iModifier[] = [];
    allowedLocations?: ItemLocations[];
    slots: number;
    weight: number;
    minLevel: number;

    constructor(data: EquipmentData) {
        this.type = data.type;
        this.subType = data.subType;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.modifiers = data.modifiers;
        this.allowedLocations = data.allowedLocations;
        this.slots = data.slots;
        this.weight = data.weight;
        this.minLevel = data.minLevel;
        this.modifierInstances = data.modifiers?.map(m => newModifier(m)) ?? [];
    }

    getModifiers(): iModifier[] {
        return this.modifierInstances;
    }

    resolveModifiers(data: ModifierApplyData): ModifierResult[] {
        return this.modifierInstances.map(m => {
            return {
                modifier: m,
                result: m.getModifier(data)
            }
        });
    }
}
