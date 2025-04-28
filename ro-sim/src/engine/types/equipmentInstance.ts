import { iEquipment } from "./equipment";
import { ItemLocations } from "@/engine/types/enums";
import { iCard } from "./card";

// EquipmentInstance is the materialization of an equipment, with refinement, and cards attached
export interface iEquipmentInstance {
    id?: number,
    equipment: iEquipment,
    location: ItemLocations,
    sourceLocation: ItemLocations,
    refinement: number,
    slots: iCard[],
}
