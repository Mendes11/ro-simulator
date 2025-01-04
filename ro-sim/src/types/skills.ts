import { AttackTypes, AttackRangeTypes } from "./attackMultiplier"
import { iCharacter } from "./character"

export enum SkillNames {
    SoulBreaker
}

export enum SkillTypes {
    Damage,
    Defensive,
}

export interface iSkill {
    name: SkillNames
    type: SkillTypes
    maxLevel: number

    // For Active-type Skills
    attackType?: AttackTypes
    attackSubType?: AttackRangeTypes
}

export interface iSkillInstance {
    skill: iSkill
    level: number
}
