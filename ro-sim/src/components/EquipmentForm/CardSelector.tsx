import { Slot, SlotConfig } from "@/types"
import Image from "next/image";
import UseComponentVisibility from "@/hooks/UseClickOutside";
import SlotSearch from "../SlotSearch";
import SlotCard from "../SlotCard";
import { useState } from "react";

type Props = {
  slotConfig: SlotConfig
  selected?: Slot
  onCardSelected: (slot: Slot) => void
}

export default function CardSelector({
  slotConfig, selected, onCardSelected
}: Props) {
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  const [currentSlot, setCurrentSlot] = useState(selected);
  const handleItemSelected = (item: Slot) => {
    onCardSelected(item);
    setCurrentSlot(item);
    setVisibility(false);
  }

  const showCardSearch = () => {
    setVisibility(true);
  }
  
  return (
    <div className="w-full">
      <div className="cursor-pointer" onClick={() => showCardSearch()}>
        <SlotCard item={currentSlot}/>
      </div>
      {isVisible && <div ref={ref} className="absolute min-w-80">
        <SlotSearch onItemSelected={handleItemSelected} />
      </div>}
    </div>
  )
}
  