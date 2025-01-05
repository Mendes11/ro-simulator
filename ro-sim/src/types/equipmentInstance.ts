import { iEquipment } from "./equipment";
import { iSlot } from "./slot";

// EquipmentInstance is the materialization of an equipment, with refinement, and cards attached
export interface iEquipmentInstance {
    id?: number,
    equipment: iEquipment,
    refinement: number,
    slots: iSlot[],
}
