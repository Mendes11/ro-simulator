import { SimulationSummary } from "@/engine/simulation";
import { AttackTypes, AttackRangeTypes } from "./attackMultiplier"
import { iCharacterModifiers } from "./equipment";
import { iCharacter } from "./character";
import { iTarget } from "./target";
import { ElementTypes } from "./element";

export enum SkillTypes {
    AttackSkill,
    BuffSkill,
}

export type GetSkillModifierData = {
    character: iCharacter,
    target: iTarget,
    attackInfo: {
        element: ElementTypes;
        attackType: AttackTypes;
        attackRangeType: AttackRangeTypes;
    },
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

    getModifier: (skillLevel: number, data: GetSkillModifierData) => iCharacterModifiers | undefined;
}

export interface iSkillInstance {
    skill: iSkill
    level: number
}
