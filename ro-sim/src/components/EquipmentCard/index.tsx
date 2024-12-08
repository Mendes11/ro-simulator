import { ArmorSubType, EquipmentType, ShadowEquipmentSubType, WeaponSubType } from "@/contants";
import { Equipment } from "@/types";
import Image from "next/image";
import ItemIcon, { ItemType } from "../ItemIcon";

interface Props {
    equipment?: Equipment<any>
    hoverable?: boolean
    
}

export default function EquipmentCard({equipment, hoverable}: Props) {

    return (
        <div className={`flex flex-row min-w-80 min-h-12 bg-white ${hoverable && "hover:bg-gray-100"}`}>
          <ItemIcon id={equipment?.id} type={ItemType.Equipment} />
          <div className="flex flex-col justify-between">
            <div className="">
              <p>{equipment && equipmentName(equipment)}</p>
            </div>
            <div className="text-xs">
              {equipment && <p>id: {equipment.id}</p>}
            </div>
          </div>
        </div>
    )
}

function equipmentName(item: Equipment) {
  let name = `${item.name} [${item.slotConfigs.length}]`;
  return name
}