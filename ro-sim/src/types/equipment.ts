import { SimulationSummary } from "@/engine/simulation";
import { CharacterData, iCharacter } from "./character";
import { AttackMultipliersData, AttackRangeTypes, iAttackMultipliers } from "./attackMultiplier";
import { iEquipmentInstance } from "./equipmentInstance";
import { iTarget } from "./target";
import { ConditionCheckData } from "./condition";
import { AttributesData, iAttributes } from "./attributes";
import { CharacterSubStatsData, iCharacterSubStats } from "./stats";

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


// ItemLocations allow for use of OR operation for items that require multiple slots
// Eg:
//  If the item takes Upper and Mid, use HeadUpper | HeadMid
//  If the item is a two handed sword, use RighHand | LeftHand
export enum ItemLocations {
    HeadUpper = 1 << 0,
    HeadMid = 1 << 1,
    HeadBottom = 1 << 2,

    Armor = 1 << 3,
    RightHand = 1 << 4,
    LeftHand = 1 << 5,
    Garment = 1 << 6,
    Shoes = 1 << 7,
    RightAccessory = 1 << 8,
    LeftAccessory = 1 << 9,
    Ammo = 1 << 10,

    // Composed Locations
    BothHands = RightHand | LeftHand,
    HeadUpperMid = HeadUpper | HeadMid,
    HeadUpperMidBottom = HeadUpper | HeadMid | HeadBottom,
    HeadUpperBottom = HeadUpper | HeadBottom,
    HeadMidBottom = HeadMid | HeadBottom,

}


export interface iItem {
    type: ItemTypes;
    subType?: ItemSubTypes;
    id: number;
    name: string;
    description: string;
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
    summary: SimulationSummary
    multiplier?: number; // Number of times to apply this
}

export type AttackModifiersData = {
    defBypass: number;
    defMBypass: number;
    sizePenalty: number; // 1.0 for 100% damage
    thanatosEffect: boolean;
}

export interface iAttackModifiers extends AttackModifiersData {
    sum: (other: iAttackModifiers, inplace?: boolean) => iAttackModifiers;
    mul: (n: number, inplace?: boolean) => iAttackModifiers;
}

export interface CharacterModifiers {
    attributes: iAttributes;
    subStats: iCharacterSubStats;
    attackMultipliers: iAttackMultipliers;
    attackModifiers: AttackModifiersData;
}
// A Modifier applies changes to a SimulationSummary and may have conditions
// that need to be checked in order for it to be applied.
export interface iModifier {
    // getModifiers: (data: ModifierApplyData) => CharacterModifiers;
    apply: (data: ModifierApplyData) => void;
    check: (data: ConditionCheckData) => boolean;
}


// Equipment has the basic characteristics of any equipment item in the game.
export interface iEquipment extends EquipmentData {
}

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
