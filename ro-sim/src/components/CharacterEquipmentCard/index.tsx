import { useState } from "react";
import EquipmentForm from "../EquipmentForm";
import EquipmentInstanceCard from "../EquipmentInstanceCard";
import { iEquipmentInstance } from "@/types/equipmentInstance";
import { EquipmentLocations, EquipmentSubTypes, EquipmentTypes } from "@/types/equipment";

type Props = {
  title: string
  equippedItem?: iEquipmentInstance
  type: EquipmentTypes;
  allowedSubTypes: EquipmentSubTypes[];
  allowedLocations?: EquipmentLocations[];
  onItemChanged: (item: iEquipmentInstance) => void
  onItemRemoved: () => void
}

export default function CharacterEquipmentCard({
  title, equippedItem, onItemChanged, onItemRemoved,
  type, allowedSubTypes, allowedLocations
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
            <EquipmentForm
                searchTypes={[type]}
                searchSubTypes={allowedSubTypes}
                searchLocations={allowedLocations}
                equipment={equippedItem} onSave={handleFormSave}
            />
            : <EquipmentInstanceCard item={equippedItem} clickable={true} onClick={() => setFormVisible(true)} />}
        </div>
      </div>
  )
}
