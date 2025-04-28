import { useState } from "react";
import CardSelector from "./CardSelector";
import EquipmentSelector from "./EquipmentSelector";
import { Priority } from "@/contants";
import AppButton from "../common/AppButton";
import { iEquipmentInstance } from "@engine/types/equipmentInstance";
import { ItemSubTypes, ItemTypes, iEquipment } from "@engine/types/equipment";
import { ItemLocations } from "@/engine/types/enums";
import { iCard } from "@engine/types/card";


type Props = {
  equipment?: iEquipmentInstance,
  searchTypes: ItemTypes[];
  searchSubTypes: ItemSubTypes[];
  searchLocation: ItemLocations;
  onSave(equipment?: iEquipmentInstance): void
}

type FormDataType = {
  id?: number
  equipment?: iEquipment
  refinement: number
  slots: iCard[]
  location: ItemLocations
  sourceLocation: ItemLocations
}

export default function EquipmentForm(props: Props) {
  const [formData, setFormData] = useState<FormDataType>({
    id: props.equipment?.id,
    equipment: props.equipment?.equipment,
    refinement: props.equipment?.refinement ?? 0,
    slots: props.equipment?.slots ?? [],
    location: props.searchLocation,
    sourceLocation: props.searchLocation,
  })


  const handleItemSelected = (item: iEquipment) => {
    const location = item.allowedLocations?.find(l => (l & props.searchLocation) != 0)
    if (location) {
      setFormData({...formData, equipment: item, location: location})
    }
  }

  const handleRefinementSet = (value: number) => {
    console.log(value);
    setFormData({...formData, refinement: value})
  }

  const onFormSave = (formData: FormDataType) => {
    if (formData.equipment == null) {
      props.onSave();
    } else {
      props.onSave(formData as iEquipmentInstance);
    }
  }

  const updateSlotItem = (i: number, slot: iCard) => {
    formData.slots[i] = slot
    setFormData(formData)
  }


  return (
    <>
      <div className="flex flex-row">
        <select name="refinement"
          value={formData.refinement}
          onChange={(e) => handleRefinementSet(parseInt(e.target.value))}>
          {[...Array(21).keys()].map((i) => (
            <option key={i} value={i}>+{i}</option>
          ))}
        </select>
        <div className="ml-1 flex-auto">
          <EquipmentSelector
            equipment={formData.equipment}
            searchTypes={props.searchTypes}
            searchSubTypes={props.searchSubTypes}
            searchLocations={[props.searchLocation]}
            onEquipmentSelected={handleItemSelected}/>
        </div>
      </div>
      <div>
        {formData.equipment && [...Array(formData.equipment.slots).keys()].map((i) => (
          <div key={i} className="flex flex-row text-xs mt-1">
            <p className="m-auto w-[3.25rem]">Slot {i}</p>
            <div className="flex-auto">
              <CardSelector
                equipment={formData.equipment!}
                selected={formData.slots[i]}
                onCardSelected={(item) => updateSlotItem(i, item)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1">
      <AppButton
        text={"Salvar"}
        priority={Priority.Primary}
        full={true}
        onClick={() => formData && onFormSave(formData)}
      />
      </div>
    </>
  )
}
