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
    weaponAtk: number; // ATQ da Arma +x%
    race: number; // Maps to Dano contra Raça
    size: number; // Maps to Dano contra Tamanho
    attackElement: number; // Maps to Dano de elemento X
    targetElement: number; // Maps to Dano contra Elemento X
    default: number; // Maps to "Dano Físico" OR "Dano Mágico" not followed to any other of the above -- The condition will tell which of the two (or both)
    range: number; // Maps to "Dano Corpo a Corpo" or "Dano a Distância" -- The condition will tell which of the two
    crit: number; // Maps to "Dano Crítico + x%"
    damage: number; // LLM Hint: Do not fill. -- Frenesi / Força violentíssima
    finalDamage: number; // LLM Hint: Do not fill.
    weaponDamage: number; // LLM Hint: Do not fill. Eg: EDP, MagnumBreak
    groupB: number; // LLM Hint: Do not fill -- Eg: EDP
    skillAtk: number; // LLM Hint: Do not fill -- This is the percentage of ATK from a skill -- From iSkill's attackMultiplier
    skill: number; // Maps to "Aumenta o dano da Habilidade <Nome> em X%"
}

export interface iAttackMultipliers extends AttackMultipliersData {
    sum: (other: iAttackMultipliers) => iAttackMultipliers;
    mul: (n: number) => iAttackMultipliers;
}
