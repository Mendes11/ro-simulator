import { iSkill, SkillTypes } from "@/types/skills";
import { SimulationSummary } from "../simulation";
import { AttackRangeTypes, AttackTypes } from "@/types/attackMultiplier";

export const ASC_METEORASSAULT: iSkill = {
    id: "ASC_METEORASSAULT",
    name: "Impacto Meteoro",
    skillType: SkillTypes.AttackSkill,
    attackMultiplier: (skillLevel: number, characterInfo: SimulationSummary) => {
        return ((((skillLevel * 120) + 200) + (characterInfo.attributes.str * 5)) * (characterInfo.level / 100.0)) / 100.0;
    },
    getModifier(){
        return undefined;
    },
    maxLevel: 10,
    attackType: AttackTypes.Physical,
    attackRangeType: AttackRangeTypes.Melee,
};
