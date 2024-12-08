import { ArmorLocation, ArmorSubType, EquipmentType, Job, ShadowEquipmentSubType, SlotType, WeaponSubType } from "./contants";

export type Attributes = {
    for: number;
    agi: number;
    vit: number;
    int: number;
    dex: number;
    luck: number;
}

export type CharacterEquipments = {
    top?: EquipmentInstance<EquipmentType.Armor, ArmorSubType.Headgear, ArmorLocation.Top>;
    mid?: EquipmentInstance<EquipmentType.Armor, ArmorSubType.Headgear, ArmorLocation.Mid>;
    bottom?: EquipmentInstance<EquipmentType.Armor, ArmorSubType.Headgear, ArmorLocation.Bottom>;
    armor?: EquipmentInstance<EquipmentType.Armor, ArmorSubType.Armor>;
    rightHand?: EquipmentInstance<EquipmentType.Weapon>;
    leftHand?: EquipmentInstance<EquipmentType.Armor | EquipmentType.Weapon> ;
    cloack?: EquipmentInstance<EquipmentType.Armor>;
    shoes?: EquipmentInstance<EquipmentType.Armor>;
    rightAccessory?: EquipmentInstance<EquipmentType.Armor>;
    leftAccessory?: EquipmentInstance<EquipmentType.Armor>;
}

// Modifier interface applies to any equipable item that cause a change in the character info
export interface Modifier {
    apply: (character: Character) => null
}

// CharacterStats is used to compute the damage formulas
export type CharacterStats = {
    wAtq: number
    eAtq: number
    wMatq: number
    eMatq: number
    crit: number
    precision: number
    softDef: number
    hardDef: number

    // Multipliers
    atqRaceMultiplier: number,
    atqSizeMultiplier: number,
    atqElementMultiplier: number,
    atqPhysicalMultiplier: number,
    atqMeleeMultiplier: number,
    atqDistMultiplier: number,

    atk: () => number,
}

export type Character = {
    baseAttrs: Attributes,
    extraAttrs: Attributes,
    equipments: CharacterEquipments;
    shadowEquipments: CharacterEquipments;
    stats: CharacterStats;
}

// SlotConfig has the rules of what can be inserted in the slot
export type SlotConfig = {
    allowedTypes: SlotType[],
}

export type Slot = {
  id: number
  type: SlotType
  equipmentType: EquipmentType,
  equipmentSubType?: EquipmentSubType,
  equipmentLocation?: ArmorLocation,
  name: string
  suffix: string
}

export type EquipmentSubType = ArmorSubType | WeaponSubType | ShadowEquipmentSubType

// Equipment has the basic characteristics of any equipment item in the game.
export type Equipment<T = EquipmentType, ST = EquipmentSubType, L = ArmorLocation> = {
    type: T,
    subType: ST,
    location?: L,
    id: number,
    name: string,
    slotConfigs: SlotConfig[],
    weight: number,
    minLevel: number,
    allowedClasses: Job[],
}

// Armor is a specialization of an Equipment with defense values
export type Armor<ST = ArmorSubType> = Equipment<EquipmentType.Armor, ST> & {
    
}

// Weapon is a specialization of an Equipment with atack values
export type Weapon<ST = WeaponSubType> = Equipment<EquipmentType.Weapon, ST> & {

}

// EquipmentInstance is the materialization of an equipment, with refinement, and cards attached
export type EquipmentInstance<T = EquipmentType, ST = EquipmentSubType, L = ArmorLocation> = {
    id?: number,
    equipment: Equipment<T, ST, L>,
    refinement: number,
    slots: Slot[],
}
