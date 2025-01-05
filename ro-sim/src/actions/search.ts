'use server'

import { equipmentRepository } from "@/repositories";
import { EquipmentSubTypes, EquipmentTypes, iEquipment } from "@/types/equipment"
import { EquipmentSearchArgs } from "@/types/repositories"
import { iSlot, SlotTypes } from "@/types/slot"



export async function searchEquipments(args: EquipmentSearchArgs): Promise<iEquipment[]> {
  console.log(args);
  return equipmentRepository.Search(args)
}

type SearchSlotsProps = {
  query: string
  type?: SlotTypes
  equipmentType?: EquipmentTypes
  equipmentSubType?: EquipmentSubTypes
}

export async function searchSlotItem({query}: SearchSlotsProps): Promise<iSlot[]> {
  console.log(query);

  return [

  ]
}
