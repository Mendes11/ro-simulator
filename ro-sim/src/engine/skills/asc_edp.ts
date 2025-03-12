import { iSkill, SkillTypes } from "@/types/skills";
import { CharacterModifiers } from "../modifiers/characterModifiers";
import { AttackMultipliers } from "../attackMultipliers";

export const ASC_EDP: iSkill = {
    id: "ASC_EDP",
    name: "Encantar com Veneno Mortal",
    maxLevel: 10,
    skillType: SkillTypes.BuffSkill,
    getModifier: (skillLevel: number) => {
        return new CharacterModifiers({
            attackMultipliers: new AttackMultipliers({
                weaponDamage: 0.25,
                groupB: ((skillLevel * 50) + 50) / 100.0 // I've reduced it by 100% due to the (1 + x%) computation.
            })
        })
    }
}
