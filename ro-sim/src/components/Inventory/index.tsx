import { iEquipmentInstance } from '@/types/equipmentInstance'
import EquipmentInstanceCard from '../EquipmentInstanceCard'



interface InventoryProps {
  items: iEquipmentInstance[]
}

export default function Inventory({ items }: InventoryProps) {

  return (
    <div className={`border`} >
      <div className="p-2">
        <p>Inventário</p>
      </div>
      <div className="border bg-white overflow-auto">
        {items.map((item) => (
          <EquipmentInstanceCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

