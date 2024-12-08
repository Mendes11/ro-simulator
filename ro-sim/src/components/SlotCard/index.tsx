import { Slot } from "@/types";
import ItemIcon, { ItemType } from "../ItemIcon";

export default function SlotCard({item}: {item?: Slot}) {
  return (
    <div className="flex flex-row p-1 min-w-80 min-h-12 bg-white">
      <ItemIcon id={item?.id} type={ItemType.Card} />
      <div className="flex flex-col ml-1 justify-between">
        <p>{item?.name}</p>
        <div className="text-xs">
          {item && <p>id: {item.id}</p>}
        </div>
      </div>
    </div>
  )
}