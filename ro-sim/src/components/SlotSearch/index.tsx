import { searchSlotItem } from "@/actions/search";
import UseComponentVisibility from "@/hooks/UseClickOutside";
import { Slot } from "@/types"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SlotList } from "./SlotList";
import { SlotType } from "@/contants";

type Props = {
  onItemSelected: (item: Slot) => void
  allowedTypes: SlotType[]
}

export default function SlotSearch({onItemSelected}: Props) {
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<Slot[]>([]);
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    inputRef.current?.focus();
  }, [])

  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    // Add a debouncer rule
    searchSlotItem({query: searchText}).then((items) => {
      setItems(items);
      setVisibility(true);
    })
  }

  
  return (
    <div className="w-full">
      <div className="flex flex-row">
        <input ref={inputRef} type="text" className="w-full h-8" value={searchText} onChange={setValue}></input>
      </div>
      {isVisible && onItemSelected.length > 0 && (
        <div ref={ref} className="">
          <SlotList items={items} onItemSelected={onItemSelected} />
        </div>
      )}
    </div>
  )
}