
// Each multiplier will be applied to a single one of the following types
export enum AttackMultiplierTypes {
    Default,// Default for AttackType (physical vs magic multipliers)
    Size,
    Race,
    TargetProperty,
    AttackProperty,// Eg: Venom Attacks
    AttackRange,
    Critical
}

export enum AttackTypes {
    Physical = 1 << 0,
    Magic = 1 << 1
}

export enum AttackRangeTypes {
    Melee,
    Distance
}

export type AttributesData = {
    str?: number; // Maps to "FOR"
    agi?: number; // Maps to "AGI"
    vit?: number; // Maps to "VIT"
    int?: number; // Maps to "INT"
    dex?: number; // Maps to "DES"
    luk?: number; // Maps to "SOR"
}

export type CharacterSubStatsData = {
    eAtk?: number; // Maps to "ATQ"
    eMatk?: number; // Maps to "MATQ"
    crit?: number; // Maps to Crítico
    precision?: number; // Maps to Precisão
    perfectPrecision?: number; // Maps to Precisão perfeita
    softDef?: number; // LLM HINT: Do not use this.
    hardDef?: number; // Maps to "DEF"
    softDefM?: number; // LLM HINT: Do not use this.
    hardDefM?: number; // Maps to "DEFM"
    aspdPercent?: number; // Maps to "Velocidade de Ataque" in percentage. Use the decimal representation of the percentage
    aspdUnit?: number; // Maps to "Velocidade de Ataque" in units
    masteryAtk?: number; // LLM HINT: do not use this
    hpUnit?: number; // Maps to HP Máx in units
    hpPercent?: number; // Maps to HP Máx in percentage. Use the decimal representation of the percentage
    spUnit?: number; // Maps to "SP Máx" in units
    spPercent?: number; // Maps to "SP Máx" in Percentage. Use the decimal representation of the percentage
    variableCast?: number; // Maps to "Conjuração Variável"
    fixedCastUnit?: number; // Maps to "Conjuração Fixa" in seconds
    fixedCastPercent?: number; // Maps to "Conjuração Fixa" in percentage
}

export type AttackMultipliersData = {
    weaponAtk?: number; // Maps to "ATQ da Arma +x%"
    race?: number; // Maps to "Dano Físico|Mágico contra Raça"
    size?: number; // Maps to "Dano Físico|Mágico contra Tamanho"
    attackElement?: number; // Maps to "Dano Físico|Mágico do tipo <element>"
    targetElement?: number; // Maps to "Dano Físico|Mágico contra oponentes da propriedade <element>"
    default?: number; // Maps to "Dano Físico + x%" or "Dano Mágico + y%" or "Dano Físico e Mágico + x%" -- Use this When not followed by any condition.
    range?: number; // Maps to "Dano Físico Corpo a Corpo + x%" or "Dano Físico a distância + x%".
    crit?: number; // Maps to "Dano Crítico + x%"
    skill?: number; // Maps to "Dano de [<skill name>] + x%" 
    
    // LLM Hint: Attributes below are not supposed to be used by the assistant.
    damage?: number; // LLM Hint: Do not use this -- Or 0 and use (1 + x) in the formula. -- Frenesi / Força violentíssima
    finalDamage?: number; // LLM Hint: Do not use this.
    weaponDamage?: number; // LLM Hint: Do not use this -- Eg?: EDP, MagnumBreak
    groupB?: number; // LLM Hint: Do not use this -- Eg?: EDP
    skillAtk?: number; // LLM Hint: Do not use this -- This is the percentage of ATK from a skill -- From iSkill's attackMultiplier
}

export type AttackModifiersData = {
    defBypass?: number; // Maps to "Ignora Defesa"
    defMBypass?: number; // Maps to "Ignora Defesa Mágica"
    sizePenalty?: number; // Maps to "Ignora Penalidade de Tamanho" -- Set it to 1.0 when present
    thanatosEffect?: boolean; // Maps to "Ativa o Efeito de [Investigar]"
};
