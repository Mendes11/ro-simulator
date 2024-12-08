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
    top?: EquipmentInstance;
    mid?: EquipmentInstance;
    bottom?: EquipmentInstance;
    armor?: EquipmentInstance;
    rightHand?: EquipmentInstance;
    leftHand?: EquipmentInstance;
    cloack?: EquipmentInstance;
    shoes?: EquipmentInstance;
    rightAccessory?: EquipmentInstance;
    leftAccessory?: EquipmentInstance;
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
export type EquipmentLocation = ArmorLocation
// Equipment has the basic characteristics of any equipment item in the game.
export type Equipment = {
    type: EquipmentType,
    subType: EquipmentSubType,
    location?: EquipmentLocation,
    id: number,
    name: string,
    slotConfigs: SlotConfig[],
    weight: number,
    minLevel: number,
    allowedClasses: Job[],
}


// EquipmentInstance is the materialization of an equipment, with refinement, and cards attached
export type EquipmentInstance = {
    id?: number,
    equipment: Equipment,
    refinement: number,
    slots: Slot[],
}
