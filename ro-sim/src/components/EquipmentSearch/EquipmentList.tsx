
import { Equipment } from "@/types";
import EquipmentCard from "../EquipmentCard";
import { EquipmentType } from "@/contants";

type Props<T = EquipmentType> = {
  equipments: Equipment<T>[]
  onItemSelected: (item: Equipment<T>) => void
}

export default function EquipmentList<T = EquipmentType>({ equipments, onItemSelected }: Props<T>) {

  return (
    <div className="shadow-xs w-full overflow-auto">
      {equipments.map(eqp =>
        <div key={eqp.id} className="border-t" onClick={() => onItemSelected(eqp)}>
          <EquipmentCard
            equipment={eqp}
            hoverable={true}
          />
        </div>
      )}
    </div>
  )
}