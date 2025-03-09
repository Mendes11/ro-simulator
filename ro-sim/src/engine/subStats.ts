import { iCharacterSubStats } from "@/types/stats";

export type CharacterSubStatsData = {
    eAtk?: number
    eMatk?: number
    crit?: number
    precision?: number
    perfectPrecision?: number
    softDef?: number
    hardDef?: number
    aspdPercent?: number
    aspdUnit?: number
    masteryAtk?: number
}

export class CharacterSubStats implements iCharacterSubStats {
    eAtk: number = 0;
    eMatk: number = 0;
    crit: number = 0;
    precision: number = 0;
    perfectPrecision: number = 0;
    softDef: number = 0;
    hardDef: number = 0;
    aspdPercent: number = 0;
    aspdUnit: number = 0;
    masteryAtk: number = 0;

    public constructor(data?: CharacterSubStatsData) {
        this.setData(data);
    }

    setData(data?: CharacterSubStatsData){
        this.eAtk = data?.eAtk ?? 0;
        this.eMatk = data?.eMatk ?? 0;
        this.crit = data?.crit ?? 0;
        this.precision = data?.precision ?? 0;
        this.perfectPrecision = data?.perfectPrecision ?? 0;
        this.softDef = data?.softDef ?? 0;
        this.hardDef = data?.hardDef ?? 0;
        this.aspdPercent = data?.aspdPercent ?? 0;
        this.aspdUnit = data?.aspdUnit ?? 0;
        this.masteryAtk = data?.masteryAtk ?? 0;
    }

    sum(other: iCharacterSubStats, inplace?: boolean) {
        const data = {
            eAtk: this.eAtk + other.eAtk,
            eMatk: this.eMatk + other.eMatk,
            crit: this.crit + other.crit,
            precision: this.precision + other.precision,
            perfectPrecision: this.perfectPrecision + other.perfectPrecision,
            softDef: this.softDef + other.softDef,
            hardDef: this.hardDef + other.hardDef,
            aspdPercent: this.aspdPercent + other.aspdPercent,
            aspdUnit: this.aspdUnit + other.aspdUnit,
            masteryAtk: this.masteryAtk + other.masteryAtk,
        }

        if (inplace) {
            this.setData(data);
            return this;
        }

        return new CharacterSubStats(data);
    }

    mul(n: number, inplace?: boolean) {
        const data = {
            eAtk: this.eAtk * n,
            eMatk: this.eMatk * n,
            crit: this.crit * n,
            precision: this.precision * n,
            perfectPrecision: this.perfectPrecision * n,
            softDef: this.softDef * n,
            hardDef: this.hardDef * n,
            aspdPercent: this.aspdPercent * n,
            aspdUnit: this.aspdUnit * n,
            masteryAtk: this.masteryAtk * n,
        };

        if (inplace) {
            this.setData(data);
            return this;
        }
        return new CharacterSubStats(data)
    }
}
