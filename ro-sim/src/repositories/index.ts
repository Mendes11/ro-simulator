import { LocalCardRepository } from "./local/card";
import { LocalEquipmentRepository } from "./local/equipment";


export const equipmentRepository = new LocalEquipmentRepository();
export const cardRepository = new LocalCardRepository();
