import UseComponentVisibility from "@/hooks/UseClickOutside";
import SlotSearch from "../SlotSearch";
import SlotCard from "../SlotCard";
import { useState } from "react";
import { iCard } from "@/types/card";
import { iEquipment } from "@/types/equipment";

type Props = {
  equipment: iEquipment;
  selected?: iCard
  onCardSelected: (slot: iCard) => void
}

export default function CardSelector({
    equipment, selected, onCardSelected
}: Props) {
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  const [currentSlot, setCurrentSlot] = useState(selected);
  const handleItemSelected = (item: iCard) => {
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
          targetType={equipment.type}
          targetSubType={equipment.subType}
        />
      </div>}
    </div>
  )
}
