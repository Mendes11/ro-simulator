import { iSkill, SkillTypes } from "@/types/skills";
import { SimulationSummary } from "../simulation";

export const ASC_EDP: iSkill = {
    id: "ASC_EDP",
    name: "Encantar com Veneno Mortal",
    maxLevel: 10,
    skillType: SkillTypes.BuffSkill,
    apply: (skillLevel: number, summary: SimulationSummary) => {
        summary.attackMultipliers.weaponDamage = 0.25;
        summary.attackMultipliers.groupB += ((skillLevel * 50) + 50) / 100.0; // I've reduced it by 100% due to the (1 + x%) computation.
    }
}
