'use server'

import { cardRepository, equipmentRepository } from "@/repositories";
import { CardSearchArgs, EquipmentSearchArgs } from "@/types/repositories"
import { iCard } from "@/types/card"
import { iEquipment } from "@/types/equipment";



export async function searchEquipments(args: EquipmentSearchArgs): Promise<iEquipment[]> {
  console.log(args);
  return equipmentRepository.Search(args)
}


export async function searchCards(args: CardSearchArgs): Promise<iCard[]> {
  console.log(args);
  return cardRepository.Search(args)
}
