import { useState } from "react";
import EquipmentForm from "../EquipmentForm";
import EquipmentInstanceCard from "../EquipmentInstanceCard";
import { iEquipmentInstance } from "@/types/equipmentInstance";

type Props = {
  title: string
  equippedItem?: iEquipmentInstance
  onItemChanged: (item: iEquipmentInstance) => void
  onItemRemoved: () => void
}

export default function CharacterEquipmentCard({
  title, equippedItem, onItemChanged, onItemRemoved
}: Props) {
  const [formVisibible, setFormVisible] = useState(false);

  const handleFormSave = (item?: iEquipmentInstance) => {
    if (item != null) {
      onItemChanged(item);
    } else {
      onItemRemoved();
    }
    setFormVisible(false);
  }

  return (
    <div className="border bg-white">
        <div className="p-2 bg-gray-100 border-b-2">
          {title}
        </div>
        <div className="p-1">
          {formVisibible ?
            <EquipmentForm equipment={equippedItem} onSave={handleFormSave}/>
            : <EquipmentInstanceCard item={equippedItem} clickable={true} onClick={() => setFormVisible(true)} />}
        </div>
      </div>
  )
}
