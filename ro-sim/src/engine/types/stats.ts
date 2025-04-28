export type CharacterSubStatsData = {
    eAtk: number;
    eMatk: number;
    crit: number;
    precision: number;
    perfectPrecision: number;
    softDef: number;
    hardDef: number;
    softDefM: number;
    hardDefM: number;
    aspdPercent: number;
    aspdUnit: number;
    masteryAtk: number;
    hpUnit: number;
    hpPercent: number;
    spUnit: number;
    spPercent: number;
    variableCast: number;
    fixedCastUnit: number;
    fixedCastPercent: number;
}

export interface iCharacterSubStats extends CharacterSubStatsData {
    sum: (other: iCharacterSubStats) => iCharacterSubStats;
    mul: (n: number) => iCharacterSubStats;
}
