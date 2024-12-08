import { Slot } from "@/types"
import SlotCard from "../SlotCard"

type Props = {
  items: Slot[]
  onItemSelected: (item: Slot) => void
}

export function SlotList({items, onItemSelected}: Props) {
  return (
    <div className="absolute bg-white max-h-96 shadow-xs w-full z-200 overflow-auto">
      {items.map(item => (
        <div className="hover:bg-gray-400 border-t" key={item.id} onClick={() => onItemSelected(item)}>
          <SlotCard item={item}/>
        </div>
      ))}
    </div>
  )
}