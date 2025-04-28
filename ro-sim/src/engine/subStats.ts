import { CharacterSubStatsData } from "./types/config";
import { iCharacterSubStats } from "./types/stats";

export class CharacterSubStats implements iCharacterSubStats {
    eAtk: number = 0;
    eMatk: number = 0;
    crit: number = 0;
    precision: number = 0;
    perfectPrecision: number = 0;
    softDef: number = 0;
    hardDef: number = 0;
    softDefM: number = 0;
    hardDefM: number = 0;
    aspdPercent: number = 0;
    aspdUnit: number = 0;
    masteryAtk: number = 0;
    hpUnit: number = 0;
    hpPercent: number = 0.0;
    spUnit: number = 0;
    spPercent: number = 0.0;
    variableCast: number = 0.0;
    fixedCastUnit: number = 0.0;
    fixedCastPercent: number = 0.0;

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
        this.softDefM = data?.softDefM ?? 0;
        this.hardDefM = data?.hardDefM ?? 0;
        this.aspdPercent = data?.aspdPercent ?? 0;
        this.aspdUnit = data?.aspdUnit ?? 0;
        this.masteryAtk = data?.masteryAtk ?? 0;
        this.hpUnit = data?.hpUnit ?? 0;
        this.hpPercent = data?.hpPercent ?? 0.0;
        this.spUnit = data?.spUnit ?? 0;
        this.spPercent = data?.spPercent ?? 0.0;
        this.variableCast = data?.variableCast ?? 0.0;
        this.fixedCastPercent = data?.fixedCastPercent ?? 0.0;
        this.fixedCastUnit = data?.fixedCastUnit ?? 0.0;
    }

    sum(other: iCharacterSubStats) {
        return new CharacterSubStats({
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
            hpUnit: this.hpUnit + other.hpUnit,
            hpPercent: this.hpPercent + other.hpPercent,
            spUnit: this.spUnit + other.spUnit,
            spPercent: this.spPercent + other.spPercent,
            variableCast: this.variableCast + other.variableCast,
            fixedCastPercent: this.fixedCastPercent + other.fixedCastPercent,
            fixedCastUnit: this.fixedCastPercent + other.fixedCastUnit,
        });
    }

    mul(n: number) {
        return new CharacterSubStats({
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
            hpUnit: this.hpUnit * n,
            hpPercent: this.hpPercent * n,
            spUnit: this.spUnit * n,
            spPercent: this.spPercent * n,
            variableCast: this.variableCast * n,
            fixedCastPercent: this.fixedCastPercent * n,
            fixedCastUnit: this.fixedCastPercent * n,
        });
    }
}
