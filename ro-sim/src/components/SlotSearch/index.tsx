import { searchSlotItem } from "@/actions/search";
import UseComponentVisibility from "@/hooks/UseClickOutside";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SlotList } from "./SlotList";
import { iSlot, SlotTypes } from "@/types/slot";

type Props = {
  onItemSelected: (item: iSlot) => void
  allowedTypes: SlotTypes[]
  autofocus?: boolean
}

export default function SlotSearch({onItemSelected, autofocus}: Props) {
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<iSlot[]>([]);
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    if (autofocus) inputRef.current?.focus();
  }, [autofocus])

  useEffect(() => {
      const debouncer = setTimeout(() => {
        searchSlotItem({query: searchText}).then((items) => {
            setItems(items);
            setVisibility(true);
          })
      }, 500);

      return () => clearTimeout(debouncer);
    }, [searchText, setVisibility]);

  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
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
