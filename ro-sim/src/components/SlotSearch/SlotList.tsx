import { iSlot } from "@/types/slot"
import SlotCard from "../SlotCard"

type Props = {
  items: iSlot[]
  onItemSelected: (item: iSlot) => void
}

export function SlotList({items, onItemSelected}: Props) {
  return (
    <div className="bg-white max-h-96 shadow-xs w-full z-200 overflow-auto">
      {items.map(item => (
        <div className="hover:bg-gray-400 border-t" key={item.id} onClick={() => onItemSelected(item)}>
          <SlotCard item={item}/>
        </div>
      ))}
    </div>
  )
}
