import { ButtonHTMLAttributes, ChangeEvent, ChangeEventHandler, HTMLInputTypeAttribute, MouseEventHandler, MutableRefObject, Ref, useCallback, useEffect, useRef, useState } from "react"
import EquipmentList from "./EquipmentList";
import { searchEquipments } from "@/actions/search";
import UseComponentVisibility from "@/hooks/UseClickOutside";
import { Equipment } from "@/types";
import { EquipmentType } from "@/contants";

type Props<T = EquipmentType> = {
  onItemSelected: (item: Equipment<T>) => void
  autofocus?: boolean
}

export default function EquipmentSearch<T = EquipmentType>({
  onItemSelected, autofocus
}: Props<T>) {
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<Equipment<T>[]>([]);
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    if (autofocus) inputRef.current?.focus();
  }, [])

  let setValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    // Add a debouncer rule
    searchEquipments({query: searchText}).then((items) => {
      setItems(items);
      setVisibility(true);
    })
  }

  const focused = () => {
    console.log("focused");
    setVisibility(true)
  }

  return (
    <div ref={ref} className="w-full">
        <input ref={inputRef} type="text" onFocus={focused} className="w-full h-8 border-b" value={searchText} onChange={setValue}></input>
        {isVisible && (
          <div  className="min-h-56 bg-white">
            <EquipmentList equipments={items} onItemSelected={onItemSelected} />
          </div>)}      
    </div>
  )
}