import { iAttackMultipliers } from "../types/attackMultiplier";
import { iAttributes } from "../types/attributes";
import { iCharacterModifiers } from "../types/equipment";
import { iAttackModifiers } from "../types/attackModifier";
import { iCharacterSubStats } from "../types/stats";
import { Attributes } from "../attributes";
import { CharacterSubStats } from "../subStats";
import { AttackMultipliers } from "../attackMultipliers";
import { AttackModifiers } from "../attackModifiers";

export class CharacterModifiers implements iCharacterModifiers {
    attributes: iAttributes;
    subStats: iCharacterSubStats;
    attackMultipliers: iAttackMultipliers;
    attackModifiers: iAttackModifiers;
    
    public constructor(data?: {
        attributes?: iAttributes, 
        subStats?: iCharacterSubStats, 
        attackMultipliers?: iAttackMultipliers, 
        attackModifiers?: iAttackModifiers
    }){
        this.attributes = data?.attributes ?? new Attributes();
        this.subStats = data?.subStats ?? new CharacterSubStats();
        this.attackMultipliers = data?.attackMultipliers ?? new AttackMultipliers();
        this.attackModifiers = data?.attackModifiers ?? new AttackModifiers();
    }

    sum(other: iCharacterModifiers){
        return new CharacterModifiers({
            attributes: this.attributes.sum(other.attributes),
            subStats: this.subStats.sum(other.subStats),
            attackMultipliers: this.attackMultipliers.sum(other.attackMultipliers),
            attackModifiers: this.attackModifiers.sum(other.attackModifiers)
        })
    }

    mul(n: number){
        return new CharacterModifiers({
            attributes: this.attributes.mul(n),
            subStats: this.subStats.mul(n),
            attackMultipliers: this.attackMultipliers.mul(n),
            attackModifiers: this.attackModifiers.mul(n)
        })
    }

}