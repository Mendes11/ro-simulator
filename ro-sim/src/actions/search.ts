'use server'

import { CardData } from "@/engine/types/card";
import { ArmorData, WeaponData } from "@/engine/types/equipment";
import { EquipmentSearchArgs, CardSearchArgs } from "@/engine/types/repositories";
import { cardRepository, equipmentRepository } from "@/lib/repositories";

export async function searchEquipments(args: EquipmentSearchArgs): Promise<(ArmorData | WeaponData)[]> {
  console.log(args);
  const equipments = await equipmentRepository.Search(args);
  console.log(`Found ${equipments.length}`)
  return equipmentRepository.Search(args)
}


export async function searchCards(args: CardSearchArgs): Promise<CardData[]> {
  console.log(args);
  return cardRepository.Search(args)
}
