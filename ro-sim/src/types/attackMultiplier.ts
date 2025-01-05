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
    Physical,
    Magic,
}

export enum AttackRangeTypes {
    Melee,
    Distance,
}
