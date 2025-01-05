import { EquipmentLocations, EquipmentSubTypes, EquipmentTypes, iEquipment } from "./equipment";
import { iSlot } from "./slot";

export type EquipmentSearchArgs = {
    name?: string;
    types?: EquipmentTypes[];
    subTypes?: EquipmentSubTypes[];
    locations?: EquipmentLocations[];
}

export interface iEquipmentRepository {
    Find(id: number): Promise<iEquipment>;
    Search(query: EquipmentSearchArgs): Promise<iEquipment[]>;
}

export interface iSlotRepository {
    Find(id: number): iSlot;
    Search(query: EquipmentSearchArgs): iSlot[];
}
