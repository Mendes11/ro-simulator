import { ChangeEvent, useEffect, useRef, useState } from "react"
import EquipmentList from "./EquipmentList";
import { searchEquipments } from "@/actions/search";
import UseComponentVisibility from "@/hooks/UseClickOutside";
import { Equipment } from "@/types";

type Props = {
  onItemSelected: (item: Equipment) => void
  autofocus?: boolean
}

export default function EquipmentSearch({
  onItemSelected, autofocus
}: Props) {
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<Equipment[]>([]);
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    if (autofocus) inputRef.current?.focus();
  }, [autofocus])

  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    // Add a debouncer rule
    searchEquipments({query: searchText}).then((items) => {
      setItems(items);
      setVisibility(true);
    })
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
