import { ItemLocations, ItemSubTypes, ItemTypes, iEquipment } from "./equipment";
import { iCard } from "./card";

export type EquipmentSearchArgs = {
    name?: string;
    types?: ItemTypes[];
    subTypes?: ItemSubTypes[];
    locations?: ItemLocations[];
}

export type CardSearchArgs = {
    name?: string;
    targetTypes?: ItemTypes[];
    targetSubTypes?: ItemSubTypes[];
}

export interface iEquipmentRepository {
    Find(id: number): Promise<iEquipment>;
    Search(query: EquipmentSearchArgs): Promise<iEquipment[]>;
}

export interface iCardRepository {
    Find(id: number): iCard;
    Search(query: CardSearchArgs): iCard[];
}
