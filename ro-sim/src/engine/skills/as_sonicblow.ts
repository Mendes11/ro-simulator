import { AttackRangeTypes, AttackTypes } from "@/types/attackMultiplier";
import { iSkill, SkillTypes } from "@/types/skills";
import { SimulationSummary } from "../simulation";

export const AS_SONICBLOW: iSkill = {
    id: "AS_SONICBLOW",
    name: "Lâminas Destruidoras",
    skillType: SkillTypes.AttackSkill,
    attackMultiplier: (skillLevel: number, characterInfo: SimulationSummary) => {
        return ((skillLevel * 100) + 200) / 100.0;
    },
    maxLevel: 10,
    attackType: AttackTypes.Physical,
    attackRangeType: AttackRangeTypes.Melee,
};
