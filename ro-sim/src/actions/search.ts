'use server'

import { iCard } from "@/engine/types/card";
import { iEquipment } from "@/engine/types/equipment";
import { EquipmentSearchArgs, CardSearchArgs } from "@/engine/types/repositories";
import { cardRepository, equipmentRepository } from "@/lib/repositories";
import { promises as fs } from 'fs';
import path from "path";


export async function searchEquipments(args: EquipmentSearchArgs): Promise<iEquipment[]> {
  console.log(args);
  const cardsfile = await fs.readFile(process.cwd() + "/src/lib/repositories/local/equipments.json", 'utf-8');
  const cardsfile = await fs.readFile(process.cwd() + "/src/lib/repositories/local/cards.json", 'utf-8');
  const modifiersfile = await fs.readFile(process.cwd() + "/src/lib/repositories/local/equipments-modifiers.json", 'utf-8');
  console.log("File Loaded" + cardsfile.length + modifiersfile.length);
  const equipments = await equipmentRepository.Search(args);
  console.log(`Found ${equipments.length}`)
  return equipmentRepository.Search(args)
}


export async function searchCards(args: CardSearchArgs): Promise<iCard[]> {
  console.log(args);
  return cardRepository.Search(args)
}
