import { Slot, SlotConfig } from "@/types"
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
    <div className="relative">
      <div className="cursor-pointer" onClick={() => showCardSearch()}>
        <SlotCard item={currentSlot}/>
      </div>
      {isVisible && <div ref={ref} className="absolute inset-0 z-10">
        <SlotSearch
          autofocus={true}
          onItemSelected={handleItemSelected}
          allowedTypes={slotConfig.allowedTypes}
        />
      </div>}
    </div>
  )
}
