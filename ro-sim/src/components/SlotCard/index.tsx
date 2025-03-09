import { iCard } from "@/types/card";
import ItemIcon, { ItemType } from "../ItemIcon";

export default function SlotCard({item}: {item?: iCard}) {
  return (
    <div className="flex flex-row p-1 min-h-12 bg-white">
      <div className="ml-1 h-auto my-auto">
        <ItemIcon id={item?.id} type={ItemType.Card} />
      </div>
      <div className="flex flex-col ml-1 justify-between">
        <p>{item?.name}</p>
        <div className="text-xs">
          {item && <p>id: {item.id}</p>}
        </div>
      </div>
    </div>
  )
}
