import { searchSlotItem } from "@/actions/search";
import UseComponentVisibility from "@/hooks/UseClickOutside";
import { Slot } from "@/types"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SlotList } from "./SlotList";
import { SlotType } from "@/contants";

type Props = {
  onItemSelected: (item: Slot) => void
  allowedTypes: SlotType[]
  autofocus?: boolean
}

export default function SlotSearch({onItemSelected, autofocus}: Props) {
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<Slot[]>([]);
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    if (autofocus) inputRef.current?.focus();
  }, [autofocus])

  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    // Add a debouncer rule
    searchSlotItem({query: searchText}).then((items) => {
      setItems(items);
      setVisibility(true);
    })
  }

  const focused = () => {
    setVisibility(true)
  }


  return (
    <div className="w-full text-base">
      <div className="flex flex-row">
        <input
          ref={inputRef}
          type="text"
          onFocus={focused}
          placeholder="Card ou Enchant..."
          className="ml-1 w-full h-8 border-b"
          value={searchText}
          onChange={setValue} />
      </div>
      {isVisible && (
        <div ref={ref} className="min-h-56 bg-white">
          <SlotList items={items} onItemSelected={onItemSelected} />
        </div>
      )}
    </div>
  )
}
