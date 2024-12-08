import { EquipmentInstance } from "@/types"
import ItemIcon, { ItemType } from "../ItemIcon"
import {  EquipmentType } from "@/contants"

type Props = {
  item?: EquipmentInstance
}

export default function EquipmentInstanceCard({item}: Props) {
  return (
    <div className="flex flex-row p-1 min-w-80 bg-white min-h-12">
      <ItemIcon id={item?.equipment?.id} type={ItemType.Equipment} />
      <div className="flex flex-col text-md ml-1">
        <div className="">
          {item && equipmentName(item)}
        </div>
        <div className="flex flex-row">
          {item?.equipment.slotConfigs.map((_, i) => (
            <div className="ml-1" key={i}>
              <ItemIcon id={item.slots[i]?.id} type={ItemType.Card} />
            </div>
          ))}
        </div>
      </div>
      {item && item.equipment.type === EquipmentType.Weapon ? (undefined) : (undefined)}
    </div>
  )
}


function equipmentName(item: EquipmentInstance) {
  let name = `${item.equipment.name} [${item.equipment.slotConfigs.length}]`;
  if (item.refinement > 0) name = `+${item.refinement} ${name}`
  return name
}
