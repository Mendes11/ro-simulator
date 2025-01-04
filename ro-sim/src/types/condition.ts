import { iCharacter } from "./character"
import { iEquipmentInstance } from "./equipmentInstance"
import { Jobs } from "./jobs"
import { SkillNames } from "./skills"

export enum ConditionTypes {
    Refinement,
    Equipment,
    Level,
    Card,
    Job,
    Enchant,
    Skill // Skill level
}

export enum ComparisonConditions {
    EQ,
    GT,
    GTE,
    LT,
    LTE,
    NEQ
}
