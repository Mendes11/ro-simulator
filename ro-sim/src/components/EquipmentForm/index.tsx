import { Equipment, EquipmentInstance, Slot } from "@/types";
import { useState } from "react";
import CardSelector from "./CardSelector";
import EquipmentSelector from "./EquipmentSelector";
import { Priority } from "@/contants";
import AppButton from "../common/AppButton";


type Props = {
  equipment?: EquipmentInstance,
  onSave(equipment?: EquipmentInstance): void
}

type FormDataType = {
  id?: number
  equipment?: Equipment
  refinement: number
  slots: Slot[]
}

export default function EquipmentForm(props: Props) {
  const [formData, setFormData] = useState<FormDataType>({
    id: props.equipment?.id,
    equipment: props.equipment?.equipment,
    refinement: props.equipment?.refinement ?? 0,
    slots: props.equipment?.slots ?? [],
  })


  const handleItemSelected = (item: Equipment) => {
    // const data = equipmentInstance ?? defaultEquipmentInstance;
    setFormData({...formData, equipment: item})
  }

  const handleRefinementSet = (value: number) => {
    setFormData({...formData, refinement: value})
  }

  const onFormSave = (formData: FormDataType) => {
    if (formData.equipment == null) {
      props.onSave();
    } else {
      props.onSave(formData as EquipmentInstance);
    }
  }

  const updateSlotItem = (i: number, slot: Slot) => {
    formData.slots[i] = slot
    setFormData(formData)
  }


  return (
    <>
      <div className="flex flex-row">
        <select name="refinement"
          value={props.equipment?.refinement}
          onChange={(e) => handleRefinementSet(parseInt(e.target.value))}>
          {[...Array(21).keys()].map((i) => (
            <option key={i}>+{i}</option>
          ))}
        </select>

        <EquipmentSelector
          equipment={formData.equipment}
          onEquipmentSelected={handleItemSelected}/>
      </div>
      <div>
        {formData.equipment?.slotConfigs.map((slotConfig, i) => (
          <div key={i} className="flex flex-row text-xs mt-1">
            <div className="flex flex-col justify-center">
              <p>Slot {i}</p>
            </div>
            <div className="ml-1 cursor-pointer">
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
