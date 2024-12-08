'use client'

import EquipmentForm from "@/components/EquipmentForm";
import EquipmentInstanceCard from "@/components/EquipmentInstanceCard";
import Inventory from "@/components/Inventory";
import EquipmentSearch from "@/components/EquipmentSearch";
import { EquipmentType, Job, SlotType, WeaponSubType } from "@/contants";
import { CharacterEquipments, EquipmentInstance } from "@/types";
import { useState } from "react";

const mockItems = [
  {
    id: 1,
    equipment: {
      id: 510147,
      name: "Adaga dos Orcs",
      type: EquipmentType.Weapon,
      subType: WeaponSubType.Dagger,
      iconUrl: "https://www.divine-pride.net/img/items/item/bRO/510147",
      slotConfigs: [
        {allowedTypes: [SlotType.Card]},
        {allowedTypes: [SlotType.Card]}
      ],
      weight: 100,
      minLevel: 1,
      allowedClasses: [Job.Novice]
    },
    refinement: 14,
    slots: [],
  }
]

export default function Home() {
  const [inventory, ] = useState(mockItems)
  const [equipments, setEquipments] = useState<CharacterEquipments>({});
  const [rightHandFormVisibility, setRightHandFormVisibility] = useState(true);

  const handleEquipFormSave = (equip?: EquipmentInstance) => {
    setEquipments({...equipments, rightHand: equip});
    setRightHandFormVisibility(false);
  }

  return (
    <div>
      <div id="inventory" className="">
        <div className="h-[1px] bg-gray-600"></div>
        <div className="w-96">
          <EquipmentSearch onItemSelected={() => {}}/>
          <Inventory 
            items={inventory} 
          />
        </div>
      </div>

      <div className="">
        <div className="p-2 border bg-gray-100">
          Mão Direita
        </div>
        <div className="border p-1">
          {rightHandFormVisibility ? 
            <EquipmentForm onSave={(equipmentInstance) => handleEquipFormSave(equipmentInstance)}/> 
            : <EquipmentInstanceCard item={equipments.rightHand} />}
        </div>
      </div>
      
    </div>
  );
}
