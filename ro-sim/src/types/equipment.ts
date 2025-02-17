import { AttackRangeTypes } from "./attackMultiplier";
import { iSlotConfig } from "./slot";

export enum EquipmentTypes {
    Weapon,
    Armor,
    ShadowEquipment,
}

export enum EquipmentSubTypes {
    // Weapon
    Dagger,
    Sword,
    TwoHandedSword,
    Spear,
    TwoHandedSpear,
    Axe,
    TwoHandedAxe,
    Mace,
    Bow,
    Katar,
    Whip,
    Instrument,
    Staff,
    TwoHandedStaff,
    Rifle,
    Pistol,
    GrenadeLauncher,
    MachineGun,
    Shotgun,
    ShurikenHuuma,
    FistWeapon,
    Book,



    Armor,
    Shield,
    Headgear,
    Cloack,
    Shoes,
    Accessory,
    AccessoryLeft,
    AccessoryRight,
    ShadowEquipment,
    Card,
}

export const AllWeaponSubTypes = [
    EquipmentSubTypes.Dagger,
    EquipmentSubTypes.Sword,
    EquipmentSubTypes.TwoHandedSword,
    EquipmentSubTypes.Spear,
    EquipmentSubTypes.TwoHandedSpear,
    EquipmentSubTypes.Axe,
    EquipmentSubTypes.TwoHandedAxe,
    EquipmentSubTypes.Mace,
    EquipmentSubTypes.Bow,
    EquipmentSubTypes.Katar,
    EquipmentSubTypes.Whip,
    EquipmentSubTypes.Instrument,
    EquipmentSubTypes.Staff,
    EquipmentSubTypes.TwoHandedStaff,
    EquipmentSubTypes.Rifle,
    EquipmentSubTypes.Pistol,
    EquipmentSubTypes.GrenadeLauncher,
    EquipmentSubTypes.MachineGun,
    EquipmentSubTypes.Shotgun,
    EquipmentSubTypes.ShurikenHuuma,
    EquipmentSubTypes.FistWeapon,
    EquipmentSubTypes.Book,
]

export enum EquipmentLocations {
    // Headgear Location
    Upper,
    Mid,
    Bottom,


    Headgear, // Card Location
    Weapon, // Card|Shadow Location
    Shield, // Card|Shadow Location
    Shoes, // Card|Shadow Location
    Armor, // Card|Shadow Location
    Cloack, // Card Location
    Acessory, // Card Location
    AccessoryLeft, // Card|Shadow Location
    AccessoryRight, // Card|Shadow Location
}

// Equipment has the basic characteristics of any equipment item in the game.
export interface iEquipment {
    type: EquipmentTypes,
    subType: EquipmentSubTypes,
    location?: EquipmentLocations,
    id: number,
    name: string,
    description: string,
    slotConfigs: iSlotConfig[],
    weight: number,
    minLevel: number,
    weaponLevel?: number,
    weaponAtk?: number,
    weaponMAtk?: number,
    equipDef?: number;
    equipMDef?: number;
    attackRange?: AttackRangeTypes;
}
