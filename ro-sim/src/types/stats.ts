
export enum SubStatTypes {
    wAtk = "wAtk",
    eAtk = "eAtk",
    wMatk = "wMatk",
    eMatk = "eMatk",
    crit = "crit",
    precision = "precision",
    perfectPrecision = "perfectPrecision",
    softDef = "softDef",
    hardDef = "hardDef",
    aspdPercent = "aspdPercent",
    aspdUnit = "aspdUnit",
}

export type CharacterSubStatsData = {
    eAtk: number
    eMatk: number
    crit: number
    precision: number
    perfectPrecision: number
    softDef: number
    hardDef: number
    aspdPercent: number
    aspdUnit: number
    masteryAtk: number
}

export interface iCharacterSubStats extends CharacterSubStatsData {
    sum: (other: iCharacterSubStats) => iCharacterSubStats;
    mul: (n: number) => iCharacterSubStats;
}
