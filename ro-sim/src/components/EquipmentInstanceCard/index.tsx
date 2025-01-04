import { iEquipmentInstance } from "@/types/equipmentInstance";
import ItemIcon, { ItemType } from "../ItemIcon"
import { EquipmentTypes } from "@/types/equipment";

type Props = {
  item?: iEquipmentInstance
  onClick?: () => void;
  clickable?: boolean;
}

export default function EquipmentInstanceCard({item, onClick, clickable}: Props) {
  return (
    <div className={`flex flex-row p-1 min-w-80 bg-white min-h-12 ${clickable && "hover:cursor-pointer"}`} onClick={() => clickable && onClick && onClick()}>
      <div className="ml-1 h-auto my-auto">
        <ItemIcon id={item?.equipment?.id} type={ItemType.Equipment} />
      </div>
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
      {item && item.equipment.type === EquipmentTypes.Weapon ? (undefined) : (undefined)}
    </div>
  )
}


function equipmentName(item: iEquipmentInstance) {
  let name = `${item.equipment.name} [${item.equipment.slotConfigs.length}]`;
  if (item.refinement > 0) name = `+${item.refinement} ${name}`
  return name
}
