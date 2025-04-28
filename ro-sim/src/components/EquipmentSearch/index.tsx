import { ChangeEvent, useEffect, useRef, useState } from "react"
import EquipmentList from "./EquipmentList";
import UseComponentVisibility from "@/hooks/UseClickOutside";
import { ItemSubTypes, ItemTypes, iEquipment } from "@engine/types/equipment";
import { ItemLocations } from "@/engine/types/enums";
import { searchEquipments } from "@/actions/search";


type Props = {
  types?: ItemTypes[];
  subTypes?: ItemSubTypes[];
  locations?: ItemLocations[];
  onItemSelected: (item: iEquipment) => void
  autofocus?: boolean
}

export default function EquipmentSearch({
  onItemSelected, autofocus, types, subTypes, locations,
}: Props) {
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<iEquipment[]>([]);
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    if (autofocus) inputRef.current?.focus();
  }, [autofocus])

  useEffect(() => {
    const debouncer = setTimeout(() => {
        searchEquipments({name: searchText, types: types, subTypes: subTypes, locations: locations}).then((items) => {
            setItems(items);
            setVisibility(true);
        })
    }, 500);

    return () => clearTimeout(debouncer);
  }, [searchText, setVisibility, locations, subTypes, types]);

  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  const focused = () => {
    setVisibility(true)
  }

  return (
    <div ref={ref} className="w-auto">
        <input ref={inputRef}
          type="text"
          onFocus={focused}
          placeholder="Nome do Equipamento..."
          className="ml-1 w-full h-8 border-b"
          value={searchText}
          onChange={setValue} />
        {isVisible && (
          <div  className="min-h-56 bg-white">
            <EquipmentList
              equipments={items} onItemSelected={onItemSelected}
            />
          </div>)}
    </div>
  )
}
