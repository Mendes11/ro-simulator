import { iCharacter } from "./character";
import { iAttackMultipliers } from "./attackMultiplier";
import { AttackRangeTypes } from "@/engine/types/config";
import { iTarget } from "./target";
import { ConditionAttackinfo } from "@/engine/modifiers/conditions/types/engine";
import { iAttributes } from "@/engine/types/attributes";
import { iCharacterSubStats } from "./stats";
import { ModifierData } from "@/engine/modifiers/types/config";
import { EquipmentSet } from "@/engine/modifiers/conditions/types/config";
import { iAttackModifiers } from "@/engine/types/attackModifier";
import { ItemLocations } from "@/engine/types/enums";

export enum ItemTypes {
    Weapon,
    Armor,
    ShadowEquipment,
    Card,
    Usable,
    PetEgg,
    PetEquipment,
    ETC,
    Costume,
    Ammo,
    Enchant,
}

export enum WeaponSubTypes {
    Dagger = 0,
    Sword = 1,
    TwoHandedSword = 2,
    Spear = 3,
    TwoHandedSpear = 4,
    Axe = 5,
    TwoHandedAxe = 6,
    Mace = 7,
    TwoHandedMace = 8,
    Bow = 9,
    Katar = 10,
    Whip = 11,
    Instrument = 12,
    Staff = 13,
    TwoHandedStaff = 14,
    Rifle = 15,
    Pistol = 16,
    GrenadeLauncher = 17,
    MachineGun = 18,
    Shotgun = 19,
    ShurikenHuuma = 20,
    Knuckle = 21,
    Book = 22,
}

export const AllWeaponSubTypes = [
    WeaponSubTypes.Dagger,
    WeaponSubTypes.Sword,
    WeaponSubTypes.TwoHandedSword,
    WeaponSubTypes.Spear,
    WeaponSubTypes.TwoHandedSpear,
    WeaponSubTypes.Axe,
    WeaponSubTypes.TwoHandedAxe,
    WeaponSubTypes.Mace,
    WeaponSubTypes.TwoHandedMace,
    WeaponSubTypes.Bow,
    WeaponSubTypes.Katar,
    WeaponSubTypes.Whip,
    WeaponSubTypes.Instrument,
    WeaponSubTypes.Staff,
    WeaponSubTypes.TwoHandedStaff,
    WeaponSubTypes.Rifle,
    WeaponSubTypes.Pistol,
    WeaponSubTypes.GrenadeLauncher,
    WeaponSubTypes.MachineGun,
    WeaponSubTypes.Shotgun,
    WeaponSubTypes.ShurikenHuuma,
    WeaponSubTypes.Knuckle,
    WeaponSubTypes.Book,
]

export enum EquipmentSubTypes {
    Armor = 23,
    Shield = 24,
    Headgear = 25,
    Garment = 26,
    Shoes = 27,
    Accessory = 28,
    AccessoryLeft = 29,
    AccessoryRight = 30,
}

export enum ShadowEquipmentSubTypes {
    ShadowWeapon = 31,
    ShadowArmor = 32,
    ShadowShield = 33,
    ShadowShoes = 34,
    ShadowRightAcessory = 35,
    ShadowLeftAccessory = 36,
}

export enum AmmoSubTypes {
    Arrow = 37,
    CannonBall = 38,
    ThrowWeapon = 39,
    Bullet = 40,
}

export enum CardSubTypes {
    Card = 41,
}

export type ItemSubTypes = WeaponSubTypes | EquipmentSubTypes | ShadowEquipmentSubTypes | AmmoSubTypes | CardSubTypes;


export interface iItem {
    type: ItemTypes;
    subType?: ItemSubTypes;
    id: number;
    name: string;
    description: string;
    modifiers?: ModifierData[]
}

export type EquipmentData = iItem & {
  // allowedLocations stores the places where the item can be placed.
  // eg:
  //  - A one handed sword can be placed in the right hand, and left hand (depending on the job)
  //      allowedLocations: [ItemLocations.RightHand, ItemLocations.LeftHand]
  //
  //  - A two handed sword occupies both hands:
  //      allowedLocations: [ItemLocations.RightHand | ItemLoctions.LeftHand] <- See the usage of OR operator here.
  allowedLocations?: ItemLocations[];
  slots: number;
  weight: number;
  minLevel: number;
}

export type ModifierSourceData = {
    location: ItemLocations;
    instance: {
        refinement: number;
        equipment: EquipmentData
    }
    card?: boolean
}

export type ModifierApplyData = {
    source: ModifierSourceData,
    character: iCharacter,
    target: iTarget,
    attackInfo: ConditionAttackinfo,
    sets: EquipmentSet[],
}

export interface iCharacterModifiers {
    attributes: iAttributes;
    subStats: iCharacterSubStats;
    attackMultipliers: iAttackMultipliers;
    attackModifiers: iAttackModifiers;

    sum: (other: iCharacterModifiers) => iCharacterModifiers;
    mul: (n: number) => iCharacterModifiers;
}

// Equipment has the basic characteristics of any equipment item in the game.
export type iEquipment = EquipmentData

export interface iArmor extends iEquipment {
    equipDef?: number;
    equipMDef?: number;
}

export interface iWeapon extends iEquipment {
    weaponLevel: number,
    weaponAtk?: number,
    weaponMAtk?: number,
    attackRange: AttackRangeTypes;
}
