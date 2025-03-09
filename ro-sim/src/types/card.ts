import { iItem, ItemSubTypes, ItemTypes } from "./equipment"

export interface iCard extends iItem {
  targetType: ItemTypes;
  targetSubTypes?: ItemSubTypes[]
  suffix?: string;
}
