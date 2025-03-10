import { iAttackMultipliers } from "@/types/attackMultiplier";
import { iAttributes } from "@/types/attributes";
import { iAttackModifiers, iCharacterModifiers } from "@/types/equipment";
import { iCharacterSubStats } from "@/types/stats";

export class CharacterModifiers implements iCharacterModifiers {
    attributes: iAttributes;
    subStats: iCharacterSubStats;
    attackMultipliers: iAttackMultipliers;
    attackModifiers: iAttackModifiers;
    
    public constructor(
        attributes: iAttributes, 
        subStats: iCharacterSubStats, 
        attackMultipliers: iAttackMultipliers, 
        attackModifiers: iAttackModifiers
    ){
        this.attributes = attributes;
        this.subStats = subStats;
        this.attackMultipliers = attackMultipliers;
        this.attackModifiers = attackModifiers;
    }

    sum(other: iCharacterModifiers){
        return new CharacterModifiers(
            this.attributes.sum(other.attributes),
            this.subStats.sum(other.subStats),
            this.attackMultipliers.sum(other.attackMultipliers),
            this.attackModifiers.sum(other.attackModifiers)
        )
    }

    mul(n: number){
        return new CharacterModifiers(
            this.attributes.mul(n),
            this.subStats.mul(n),
            this.attackMultipliers.mul(n),
            this.attackModifiers.mul(n)
        )
    }

}