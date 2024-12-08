import { Equipment, EquipmentInstance, Slot } from "@/types";
import { useRef, useState } from "react";
import EquipmentCard from "../EquipmentCard";
import UseComponentVisibility from "@/hooks/UseClickOutside";
import EquipmentList from "../EquipmentSearch/EquipmentList";
import EquipmentSearch from "../EquipmentSearch";
import CardSelector from "./CardSelector";
import EquipmentSelector from "./EquipmentSelector";
import { EquipmentType, Priority, SlotType } from "@/contants";
import AppButton from "../common/AppButton";

const defaultEquipmentInstance = {
  refinement: 0,
  slots: [
    {
      id: 123,
      name: "Carta Freeoni",
      iconUrl: "https://static.divine-pride.net/images/items/cards/4121.png",
      type: SlotType.Card,
      suffix: "infinito"
    }
  ]
}

type Props<T = EquipmentType> = {
  equipment?: EquipmentInstance<T>,
  onSave(equipment: EquipmentInstance<T>): void
}

export default function EquipmentForm<T = EquipmentType>(props: Props<T>) {
  const [formData, setFormData] = useState({
    id: props.equipment?.id,
    equipment: props.equipment?.equipment,
    refinement: props.equipment?.refinement,
    slots: props.equipment?.slots ?? [],
  })

  const { ref, isVisible, setVisibility } = UseComponentVisibility()

  const handleItemSelected = (item: Equipment<T>) => {
    // const data = equipmentInstance ?? defaultEquipmentInstance;
    setFormData({...formData, equipment: item})
    setVisibility(false)
  }

  const handleRefinementSet = (value: number) => {
    setFormData({...formData, refinement: value})
  }

  const showEquipmentSearch = () => {
    setVisibility(true);
  }

  const onFormSave = (formData: any) => {
    props.onSave(formData);
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

        <EquipmentSelector<T>
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
