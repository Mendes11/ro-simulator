import { useEffect, useState } from "react";
import EquipmentForm from "../EquipmentForm";
import EquipmentInstanceCard from "../EquipmentInstanceCard";
import { iEquipmentInstance } from "@engine/types/equipmentInstance";
import { ItemSubTypes, ItemTypes } from "@engine/types/equipment";
import { ItemLocations } from "@/engine/types/enums";

type Props = {
  title: string
  equippedItem?: iEquipmentInstance
  allowedTypes: ItemTypes[];
  allowedSubTypes: ItemSubTypes[];
  location: ItemLocations;
  enabled?: boolean;
  onItemChanged: (item: iEquipmentInstance) => void
  onItemRemoved: () => void
}

export default function CharacterEquipmentCard({
  title, equippedItem, onItemChanged, onItemRemoved, enabled,
  allowedTypes: allowedTypes, allowedSubTypes, location
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

  useEffect(()=> {
    if (!enabled && formVisibible) {
      setFormVisible(false);
    }
  }, [enabled, formVisibible])

  return (
    <>

    <div className="relative border bg-white">
      {!enabled && <div className="absolute bg-gray-200 bg-opacity-50 z-100 w-full h-full"></div>}
      <div className="p-2 bg-gray-100 border-b-2">
        {title}
      </div>
      <div className="p-1">
        {formVisibible ?
          <EquipmentForm
              searchTypes={allowedTypes}
              searchSubTypes={allowedSubTypes}
              searchLocation={location}
              equipment={equippedItem} onSave={handleFormSave}
          />
          : <EquipmentInstanceCard item={equippedItem} clickable={enabled ?? true} onClick={() => setFormVisible(true)} />}
      </div>
    </div>
    </>
  )
}
