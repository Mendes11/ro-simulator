import EquipmentCard from "../EquipmentCard"
import UseComponentVisibility from "@/hooks/UseClickOutside"
import EquipmentSearch from "../EquipmentSearch"
import { iEquipment } from "@/types/equipment"

type Props = {
  equipment?: iEquipment
  onEquipmentSelected: (equipment: iEquipment) => void
}

export default function EquipmentSelector({
  equipment, onEquipmentSelected
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
        <EquipmentSearch onItemSelected={handleItemSelected} autofocus={true}/>
      </div>}
    </div>
 )
}
