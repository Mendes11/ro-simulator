
import { Equipment } from "@/types";
import EquipmentCard from "../EquipmentCard";

type Props = {
  equipments: Equipment[]
  onItemSelected: (item: Equipment) => void
}

export default function EquipmentList({ equipments, onItemSelected }: Props) {

  return (
    <div className="shadow-xs w-full overflow-auto">
      {equipments.map(eqp =>
        <div key={eqp.id} className="border-t hover:cursor-pointer" onClick={() => onItemSelected(eqp)}>
          <EquipmentCard
            equipment={eqp}
            hoverable={true}
          />
        </div>
      )}
    </div>
  )
}
