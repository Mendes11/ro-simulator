import { SimulationSummary } from "@/engine/simulation";
import { AttackTypes, AttackRangeTypes } from "./attackMultiplier"

export enum SkillTypes {
    AttackSkill,
    BuffSkill,
}

export interface iSkill {
    id: string;
    name: string;
    maxLevel: number;
    skillType: SkillTypes;

    // For Active-type Skills
    attackType?: AttackTypes;
    attackRangeType?: AttackRangeTypes;
    critable?: boolean;
    defBypass?: number;
    defMBypass?: number;
    thanatosEffect?: boolean;

    // attackMultiplier is the percentage over the attack
    attackMultiplier?: (skillLevel: number, summary: SimulationSummary) => number;
    // Apply in-place to the summary
    apply?: (skillLevel: number, summary: SimulationSummary) => void;
}

export interface iSkillInstance {
    skill: iSkill
    level: number
}
