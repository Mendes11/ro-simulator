import { searchCards } from "@/actions/search";
import UseComponentVisibility from "@/hooks/UseClickOutside";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SlotList } from "./SlotList";
import { iCard } from "@/types/card";
import { ItemSubTypes, ItemTypes } from "@/types/equipment";


type Props = {
  onItemSelected: (item: iCard) => void;
  targetType: ItemTypes;
  targetSubType?: ItemSubTypes;
  autofocus?: boolean;
}

export default function SlotSearch({onItemSelected, autofocus, targetType, targetSubType}: Props) {
  const [searchText, setSearchText] = useState<string>('');
  const [items, setItems] = useState<iCard[]>([]);
  const { ref, isVisible, setVisibility } = UseComponentVisibility()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    if (autofocus) inputRef.current?.focus();
  }, [autofocus])

  useEffect(() => {
      const debouncer = setTimeout(() => {
        searchCards({name: searchText, targetTypes: [targetType], targetSubTypes: targetSubType ? [targetSubType] : undefined}).then((items) => {
            setItems(items);
            setVisibility(true);
          })
      }, 500);

      return () => clearTimeout(debouncer);
    }, [searchText, targetType, targetSubType, setVisibility]);

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
