import { useState } from "react";
import CardSelector from "./CardSelector";
import EquipmentSelector from "./EquipmentSelector";
import { Priority } from "@/contants";
import AppButton from "../common/AppButton";
import { iEquipmentInstance } from "@/types/equipmentInstance";
import { iEquipment } from "@/types/equipment";
import { iSlot } from "@/types/slot";


type Props = {
  equipment?: iEquipmentInstance,
  onSave(equipment?: iEquipmentInstance): void
}

type FormDataType = {
  id?: number
  equipment?: iEquipment
  refinement: number
  slots: iSlot[]
}

export default function EquipmentForm(props: Props) {
  const [formData, setFormData] = useState<FormDataType>({
    id: props.equipment?.id,
    equipment: props.equipment?.equipment,
    refinement: props.equipment?.refinement ?? 0,
    slots: props.equipment?.slots ?? [],
  })


  const handleItemSelected = (item: iEquipment) => {
    // const data = equipmentInstance ?? defaultEquipmentInstance;
    setFormData({...formData, equipment: item})
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

  const updateSlotItem = (i: number, slot: iSlot) => {
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
            onEquipmentSelected={handleItemSelected}/>
        </div>
      </div>
      <div>
        {formData.equipment?.slotConfigs.map((slotConfig, i) => (
          <div key={i} className="flex flex-row text-xs mt-1">
            <p className="m-auto w-[3.25rem]">Slot {i}</p>
            <div className="flex-auto">
              <CardSelector
                slotConfig={slotConfig}
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
