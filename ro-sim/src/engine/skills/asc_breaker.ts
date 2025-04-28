import { AttackRangeTypes, AttackTypes } from "../types/config";
import { iSkill, SkillTypes } from "@engine/types/skills";
import { SimulationSummary } from "../simulation";

export const ASC_BREAKER: iSkill = {
    id: "ASC_BREAKER",
    name: "Destruidor de Almas",
    skillType: SkillTypes.AttackSkill,
    attackMultiplier: (skillLevel: number, characterInfo: SimulationSummary) => {
        return (
            ((skillLevel * 140) + characterInfo.attributes.int + characterInfo.attributes.str) * (characterInfo.level / 100.0)
        ) / 100.0;
    },
    getModifier() {
        return undefined;
    },
    maxLevel: 10,
    attackType: AttackTypes.Physical,
    attackRangeType: AttackRangeTypes.Distance,
};
