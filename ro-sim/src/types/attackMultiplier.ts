// Each multiplier will be applied to a single one of the following types
export enum AttackMultiplierTypes {
    Default, // Default for AttackType (physical vs magic multipliers)
    Size,
    Race,
    TargetProperty,
    AttackProperty, // Eg: Venom Attacks
    AttackRange,
    Critical
}

export enum AttackTypes {
    Physical = 1 << 0,
    Magic = 1 << 1,
}

export enum AttackRangeTypes {
    Melee,
    Distance,
}

// Multipliers are any type of damage multiplication factor that comes from skills and equipments
export type AttackMultipliersData = {
    weaponAtk: number; // Weapon Atk%
    race: number;
    size: number;
    attackElement: number;
    targetElement: number;
    default: number;
    range: number;
    crit: number;
    damage: number; // Or 0 and use (1 + x) in the formula. -- Frenesi / Força violentíssima
    finalDamage: number;
    weaponDamage: number; // Eg: EDP, MagnumBreak
    groupB: number; // Eg: EDP
    skillAtk: number; // This is the percentage of ATK from a skill -- From iSkill's attackMultiplier
    skill: number; // This is a multiplier over the skill's attack multiplier -- eg: "Increases damage of <skill> by 10%"
}

export interface iAttackMultipliers extends AttackMultipliersData {
    sum: (other: iAttackMultipliers, inplace?: boolean) => iAttackMultipliers;
    mul: (n: number, inplace?: boolean) => iAttackMultipliers;
}
