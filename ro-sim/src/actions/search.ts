'use server'

import { ArmorLocation, ArmorSubType, EquipmentType, ShadowEquipmentSubType, SlotType, WeaponSubType } from "@/contants";
import { Equipment, EquipmentSubType, Slot } from "@/types";

type SearchEquipmentsProps = {
  query: string
  type?: EquipmentType
  subType?: EquipmentSubType
  location?: ArmorLocation
}

export async function searchEquipments({query, type, subType, location}: SearchEquipmentsProps): Promise<Equipment<any>[]> {
  console.log(query);

  let result: Equipment[] = [
    {
      id: 510147,
      name: "Adaga dos Orcs",
      type: EquipmentType.Weapon,
      subType: WeaponSubType.Dagger,
      slotConfigs: [
        {allowedTypes: [SlotType.Card]},
        {allowedTypes: [SlotType.Card]}
      ],
      weight: 0,
      minLevel: 0,
      allowedClasses: []
    },
    {
      id: 500009,
      name: "Lâmina Sagrada",
      type: EquipmentType.Weapon,
      subType: WeaponSubType.Sword,
      slotConfigs: [
        {allowedTypes: [SlotType.Card]}
      ],
      weight: 0,
      minLevel: 0,
      allowedClasses: []
    },
    {
      id: 510146,
      name: "Jurupari",
      type: EquipmentType.Weapon,
      subType: WeaponSubType.Dagger,
      slotConfigs: [
        {allowedTypes: [SlotType.Card]}
      ],
      weight: 0,
      minLevel: 0,
      allowedClasses: []
    }
  ]
  return result;
}

type SearchSlotsProps = {
  query: string
  type?: SlotType
  equipmentType?: EquipmentType
  equipmentSubType?: EquipmentSubType
}

export async function searchSlotItem({query}: SearchSlotsProps): Promise<Slot[]> {
  return [
    {
      id: 4121,
      name: "Carta Freeoni",
      type: SlotType.Card,
      equipmentType: EquipmentType.Weapon,
      suffix: "infinito"
    }
  ]
}