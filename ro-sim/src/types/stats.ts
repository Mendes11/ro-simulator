export type CharacterSubStatsData = {
    eAtk: number // Maps to ATQ+
    eMatk: number // Maps to MATQ+
    crit: number
    precision: number // Maps to Precisão
    perfectPrecision: number // Maps to Precisão Perfeita
    softDef: number
    hardDef: number // Maps to DEF+
    aspdPercent: number // Maps to Velocidade de Ataque + x%
    aspdUnit: number // Maps to Velocidade de Ataque + x
    masteryAtk: number
}

export interface iCharacterSubStats extends CharacterSubStatsData {
    sum: (other: iCharacterSubStats) => iCharacterSubStats;
    mul: (n: number) => iCharacterSubStats;
}
