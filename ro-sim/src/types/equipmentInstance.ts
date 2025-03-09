import { iEquipment } from "./equipment";
import { iCard } from "./card";

// EquipmentInstance is the materialization of an equipment, with refinement, and cards attached
export interface iEquipmentInstance {
    id?: number,
    equipment: iEquipment,
    refinement: number,
    slots: iCard[],
}
