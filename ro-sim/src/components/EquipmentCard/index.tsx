import { iEquipment } from "@/types/equipment";
import ItemIcon, { ItemType } from "../ItemIcon";

interface Props {
    equipment?: iEquipment
    hoverable?: boolean

}

export default function EquipmentCard({equipment, hoverable}: Props) {

    return (
        <div className={`flex flex-row w-auto min-h-12 bg-white ${hoverable && "hover:bg-gray-100"}`}>
          <div className="ml-1 h-auto my-auto">
            <ItemIcon id={equipment?.id} type={ItemType.Equipment} />
          </div>
          <div className="flex flex-col justify-between ml-1">
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

function equipmentName(item: iEquipment) {
  return `${item.name} [${item.slotConfigs.length}]`;
}
