import { EquipmentLocations, EquipmentSubTypes, EquipmentTypes } from "./equipment"

export enum SlotTypes {
    Card,
    Enchant
}

export interface iSlotConfig {
    allowedTypes: SlotTypes[],
}

export interface iSlot {
  id: number
  type: SlotTypes
  targetType?: EquipmentTypes,
  targetSubType?: EquipmentSubTypes,
  targetLocation?: EquipmentLocations,
  name: string
  suffix: string
}
