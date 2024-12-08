
export enum Priority {
  Primary,
  Secondary,
  Danger,
}

export enum SlotType {
    Card,
    Enchant
}

export enum EquipmentType {
    Weapon,
    Armor,
    ShadowEquipment,
}

export enum ArmorSubType {
    Armor,
    Shield,
    Headgear,
    Cloack,
    Shoes,
    Accessory,
    AccessoryLeft,
    AccessoryRight,
}

export enum WeaponSubType {
    Dagger,
    Sword,
    TwoHandedSword,
    Axe,
    Mace,
    Bow,
    Katar,
    Whip,
    Instrument,
}

export enum ShadowEquipmentSubType {

}


export enum ArmorLocation {
    Top,
    Mid,
    Bottom,
    AccessoryLeft,
    AccessoryRight,
}

// TODO: See how classes are classified in RO and their values. It would be nice if we had a way to use bitmasks for when checking equipment restrictions.
export enum Job {
    Novice,
}
