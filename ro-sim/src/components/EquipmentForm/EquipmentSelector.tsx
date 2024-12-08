import { Equipment } from "@/types"
import EquipmentCard from "../EquipmentCard"
import UseComponentVisibility from "@/hooks/UseClickOutside"
import EquipmentSearch from "../EquipmentSearch"

type Props = {
  equipment?: Equipment
  onEquipmentSelected: (equipment: Equipment) => void
}

export default function EquipmentSelector({
  equipment, onEquipmentSelected
}: Props) {
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  
  const handleItemSelected = (item: Equipment) => {
    onEquipmentSelected(item)
    setVisibility(false)
  }

  const showEquipmentSearch = () => {
    setVisibility(true);
  }

  return (
    <div className="w-full relative">
      <div className="cursor-pointer" onClick={() => showEquipmentSearch()}>
        <EquipmentCard equipment={equipment} />
      </div>
      {isVisible && <div ref={ref} className="absolute min-w-80 left-0 w-full">
        <EquipmentSearch onItemSelected={handleItemSelected} autofocus={true}/>
      </div>}
    </div>
 )
}