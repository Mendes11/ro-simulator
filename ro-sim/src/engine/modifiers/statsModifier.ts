import { iAttackModifiers, iCharacterModifiers } from "@/types/equipment";
import {  iCharacterSubStats } from "@/types/stats";
import {  iAttributes } from "@/types/attributes";
import { iAttackMultipliers } from "@/types/attackMultiplier";
import { Attributes, AttributesData } from "../attributes";
import { CharacterSubStats, CharacterSubStatsData } from "../subStats";
import { AttackMultipliers, AttackMultipliersData } from "../attackMultipliers";
import { BaseModifier } from "./base";
import { ConditionData } from "@/types/condition";
import { AttackModifiers, AttackModifiersData } from "../attackModifiers";
import { CharacterModifiers } from "./characterModifiers";

export interface StatsModifierData {
    attributes?: AttributesData;
    subStats?: CharacterSubStatsData;
    attackMultipliers?: AttackMultipliersData;
    attackModifiers?: AttackModifiersData;
}

export class StatsModifier extends BaseModifier {
    attributes?: iAttributes;
    subStats?: iCharacterSubStats;
    attackMultipliers?: iAttackMultipliers;
    attackModifiers?: iAttackModifiers;

    public constructor(data: StatsModifierData, conditions: ConditionData[] = []) {
        super(conditions);
        this.attributes = data.attributes ? new Attributes(data.attributes) : undefined;
        this.subStats = data.subStats ? new CharacterSubStats(data.subStats) : undefined;
        this.attackMultipliers = data.attackMultipliers ? new AttackMultipliers(data.attackMultipliers) : undefined;
        this.attackModifiers = data.attackModifiers ? new AttackModifiers(data.attackModifiers) : undefined;
    }

    public mountModifier(): iCharacterModifiers | undefined {
        return new CharacterModifiers({
            attributes: this.attributes ?? new Attributes(), 
            subStats: this.subStats ?? new CharacterSubStats(), 
            attackMultipliers: this.attackMultipliers ?? new AttackMultipliers(), 
            attackModifiers: this.attackModifiers ?? new AttackModifiers(),
        })
    }
}
