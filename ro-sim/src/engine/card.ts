import { ModifierData } from "./modifiers/types/config";
import { iModifier } from "./modifiers/types/engine";
import { newModifier } from "./modifiers/utils";
import { CardData, iCard } from "./types/card";
import { ItemTypes, ItemSubTypes, ModifierApplyData, ModifierResult } from "./types/equipment";

export class Card implements iCard {
    targetType: ItemTypes;
    targetSubTypes?: ItemSubTypes[] | undefined;
    suffix?: string | undefined;
    type: ItemTypes;
    subType?: ItemSubTypes | undefined;
    id: number;
    name: string;
    description: string;
    modifiers?: ModifierData[] | undefined;
    modifierInstances: iModifier[];

    public constructor(data: CardData) {
        this.type = data.type;
        this.subType = data.subType;
        this.targetType = data.targetType;
        this.targetSubTypes = data.targetSubTypes;
        this.suffix = data.suffix;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.modifiers = data.modifiers;
        this.modifierInstances = data.modifiers?.map(m => newModifier(m)) ?? [];
    }

    resolveModifiers(data: ModifierApplyData): ModifierResult[] {
        return this.modifierInstances.map(mod => ({modifier: mod, result: mod.getModifier(data)}));
    }
}
