import { ItemSubTypes, ItemTypes, iEquipment } from "./equipment";
import { ItemLocations } from "@/engine/types/enums";
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
    All(): Promise<iEquipment[]>;
    Find(id: number): Promise<iEquipment>;
    Search(query: EquipmentSearchArgs): Promise<iEquipment[]>;
}

export interface iCardRepository {
    Find(id: number): iCard;
    Search(query: CardSearchArgs): iCard[];
}
