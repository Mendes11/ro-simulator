import EquipmentCard from "../EquipmentCard"
import UseComponentVisibility from "@/hooks/UseClickOutside"
import EquipmentSearch from "../EquipmentSearch"
import { ItemSubTypes, ItemTypes, iEquipment } from "@engine/types/equipment"
import { ItemLocations } from "@/engine/types/enums"

type Props = {
  equipment?: iEquipment
  searchTypes: ItemTypes[];
  searchSubTypes: ItemSubTypes[];
  searchLocations?: ItemLocations[];
  onEquipmentSelected: (equipment: iEquipment) => void
}

export default function EquipmentSelector({
  equipment, onEquipmentSelected, searchTypes, searchSubTypes, searchLocations
}: Props) {
  const { ref, isVisible, setVisibility } = UseComponentVisibility()

  const handleItemSelected = (item: iEquipment) => {
    onEquipmentSelected(item)
    setVisibility(false)
  }

  const showEquipmentSearch = () => {
    setVisibility(true);
  }

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={() => showEquipmentSearch()}>
        <EquipmentCard equipment={equipment} />
      </div>
      {isVisible && <div ref={ref} className="absolute inset-0 z-10">
        <EquipmentSearch
            onItemSelected={handleItemSelected}
            autofocus={true}
            types={searchTypes}
            subTypes={searchSubTypes}
            locations={searchLocations}
        />
      </div>}
    </div>
 )
}
