import { iItem, ItemSubTypes, ItemTypes, ModifierApplyData, ModifierResult } from "./equipment"

export type CardData = iItem & {
    targetType: ItemTypes;
    targetSubTypes?: ItemSubTypes[]
    suffix?: string;
}

export interface iCard extends CardData {
    resolveModifiers(data: ModifierApplyData): ModifierResult[];
}
