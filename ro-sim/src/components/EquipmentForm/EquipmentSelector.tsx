import { Equipment } from "@/types"
import EquipmentCard from "../EquipmentCard"
import UseComponentVisibility from "@/hooks/UseClickOutside"
import EquipmentSearch from "../EquipmentSearch"
import { EquipmentType } from "@/contants"

type Props<T = EquipmentType> = {
  equipment?: Equipment<T>
  onEquipmentSelected: (equipment: Equipment<T>) => void
}

export default function EquipmentSelector<T = EquipmentType>({
  equipment, onEquipmentSelected
}: Props<T>) {
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  
  const handleItemSelected = (item: Equipment<T>) => {
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
        <EquipmentSearch<T> onItemSelected={handleItemSelected} autofocus={true}/>
      </div>}
    </div>
 )
}