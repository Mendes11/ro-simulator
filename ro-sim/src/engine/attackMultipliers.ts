
import { iAttackMultipliers } from "./types/attackMultiplier";
import { AttackMultipliersData } from "./types/config";

export class AttackMultipliers implements iAttackMultipliers {
    weaponAtk = 0.0; // Weapon Atk%
    race = 0.0;
    size = 0.0;
    attackElement = 0.0;
    targetElement = 0.0;
    default = 0.0;
    range = 0.0;
    crit = 0.0;
    damage = 0.0; // Or 0 and use (1 + x) in the formula. -- Frenesi / Força violentíssima
    finalDamage = 0.0;
    weaponDamage = 0.0; // Eg = 0.0, MagnumBreak
    groupB = 0.0; // Eg = 0.0
    skillAtk = 0.0; // This is the percentage of ATK from a skill -- From iSkill's attackMultiplier
    skill = 0.0; // This is a multiplier over the skill's attack multiplier -- eg: "Increases damage of <skill> by 10%"

    public constructor(data?: AttackMultipliersData){
        this.setData(data);
    }

    setData(data?: AttackMultipliersData) {
        this.weaponAtk = data?.weaponAtk ?? 0;
        this.race = data?.race ?? 0;
        this.size = data?.size ?? 0;
        this.attackElement = data?.attackElement ?? 0;
        this.targetElement = data?.targetElement ?? 0;
        this.default = data?.default ?? 0;
        this.range = data?.range ?? 0;
        this.crit = data?.crit ?? 0;
        this.damage = data?.damage ?? 0;
        this.finalDamage = data?.finalDamage ?? 0;
        this.weaponDamage = data?.weaponDamage ?? 0;
        this.groupB = data?.groupB ?? 0;
        this.skillAtk = data?.skillAtk ?? 0;
        this.skill = data?.skill ?? 0;
    }

    sum(other: iAttackMultipliers){
        return new AttackMultipliers({
            weaponAtk: this.weaponAtk + other.weaponAtk,
            race: this.race + other.race,
            size: this.size + other.size,
            attackElement: this.attackElement + other.attackElement,
            targetElement: this.targetElement + other.targetElement,
            default: this.default + other.default,
            range: this.range + other.range,
            crit: this.crit + other.crit,
            damage: this.damage + other.damage,
            finalDamage: this.finalDamage + other.finalDamage,
            weaponDamage: this.weaponDamage + other.weaponDamage,
            groupB: this.groupB + other.groupB,
            skillAtk: this.skillAtk + other.skillAtk,
            skill: this.skill + other.skill,
        })
    }

    mul(n: number) {
        return new AttackMultipliers({
            weaponAtk: this.weaponAtk * n,
            race: this.race * n,
            size: this.size * n,
            attackElement: this.attackElement * n,
            targetElement: this.targetElement * n,
            default: this.default * n,
            range: this.range * n,
            crit: this.crit * n,
            damage: this.damage * n,
            finalDamage: this.finalDamage * n,
            weaponDamage: this.weaponDamage * n,
            groupB: this.groupB * n,
            skillAtk: this.skillAtk * n,
            skill: this.skill * n,
        })
    }
}
