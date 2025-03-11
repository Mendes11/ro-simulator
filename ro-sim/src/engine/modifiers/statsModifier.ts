import { iAttackModifiers, iCharacterModifiers, iModifier, ModifierApplyData } from "@/types/equipment";
import {  iCharacterSubStats, SubStatTypes } from "@/types/stats";
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

    public mountModifier(data: ModifierApplyData): iCharacterModifiers | undefined {
        return new CharacterModifiers(
            this.attributes ?? new Attributes(), 
            this.subStats ?? new CharacterSubStats(), 
            this.attackMultipliers ?? new AttackMultipliers(), 
            this.attackModifiers ?? new AttackModifiers(),
        )
    }
}
