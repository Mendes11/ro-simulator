'use server'

import { iCard } from "@/engine/types/card";
import { iEquipment } from "@/engine/types/equipment";
import { EquipmentSearchArgs, CardSearchArgs } from "@/engine/types/repositories";
import { cardRepository, equipmentRepository } from "@/lib/repositories";

export async function searchEquipments(args: EquipmentSearchArgs): Promise<iEquipment[]> {
  console.log(args);
  const equipments = await equipmentRepository.Search(args);
  console.log(`Found ${equipments.length}`)
  return equipmentRepository.Search(args)
}


export async function searchCards(args: CardSearchArgs): Promise<iCard[]> {
  console.log(args);
  return cardRepository.Search(args)
}
