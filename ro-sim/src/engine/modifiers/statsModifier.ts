import { iModifier, ModifierApplyData } from "@/types/equipment";
import {  iCharacterSubStats } from "@/types/stats";
import {  iAttributes } from "@/types/attributes";
import { AttackRangeTypes, AttackTypes, iAttackMultipliers } from "@/types/attackMultiplier";
import { Attributes, AttributesData } from "../attributes";
import { CharacterSubStats, CharacterSubStatsData } from "../subStats";
import { AttackMultipliers, AttackMultipliersData } from "../attackMultipliers";
import { RaceTypes } from "@/types/race";
import { SizeTypes } from "@/types/size";
import { ElementTypes } from "@/types/element";
import { TargetTypes } from "@/types/target";
import { BaseModifier } from "./base";
import { ConditionData, iCondition } from "@/types/condition";

export type ModifierTarget = {
    attackType?: AttackTypes;
    attackRangeType?: AttackRangeTypes;
    attackElement?: ElementTypes;
    target?: {
        race?: RaceTypes;
        size?: SizeTypes;
        element?: ElementTypes;
        type?: TargetTypes;
    }
}

export interface StatsModifierData {
    attributes?: AttributesData;
    subStats?: CharacterSubStatsData;
    attackMultipliers?: AttackMultipliersData;
    target?: ModifierTarget; // This is used mostly for attackMultipliers of type Race / Size / Element
}

export class StatsModifier extends BaseModifier {
    attributes?: iAttributes;
    subStats?: iCharacterSubStats;
    attackMultipliers?: iAttackMultipliers;
    target?: ModifierTarget;

    public constructor(data: StatsModifierData, conditions: ConditionData[] = []) {
        super(conditions);
        this.attributes = data.attributes ? new Attributes(data.attributes) : undefined;
        this.subStats = data.subStats ? new CharacterSubStats(data.subStats) : undefined;
        this.attackMultipliers = data.attackMultipliers ? new AttackMultipliers(data.attackMultipliers) : undefined;
        this.target = data.target;
    }

    apply(data: ModifierApplyData) {
        if (this.shouldApply(data)) {
            if (this.attributes) data.summary.attributes.sum(this.attributes.mul(data.multiplier ?? 1), true)
            if (this.subStats) data.summary.subStats.sum(this.subStats.mul(data.multiplier ?? 1), true)
            if (this.attackMultipliers) data.summary.attackMultipliers.sum(this.attackMultipliers.mul(data.multiplier ?? 1), true);
        }
    }

    shouldApply(data: ModifierApplyData) {
        if (this.target == null) return true;

        if (this.target.attackType && (data.summary.attackInfo.attackType & this.target.attackType) === 0) {
            return false;
        }
        if (this.target.attackElement && (data.summary.attackInfo.element & this.target.attackElement) === 0) {
            return false;
        }
        if (this.target.attackRangeType != null) {
            if (data.summary.attackInfo.attackRange == null || (data.summary.attackInfo.attackRange & this.target.attackRangeType) === 0) {
                return false;
            }
        }
        if (this.target.target) {
            if (this.target.target.race && (data.summary.target.race & this.target.target.race) === 0) {
                return false;
            }
            if (this.target.target.size && (data.summary.target.size & this.target.target.size) === 0) {
                return false;
            }
            if (this.target.target.element && (data.summary.target.element & this.target.target.element) === 0) {
                return false;
            }
            if (this.target.target.type && (data.summary.target.type & this.target.target.type) === 0) {
                return false;
            }
        }
        return true;
    }
}
