import { Simulate } from "@/engine/simulation";
import { AttackRangeTypes, AttackTypes } from "@/types/attackMultiplier";

const charSummary = {
    level: 99,
    attributes: {
        for: 99,
        dex: 16,
        luck: 68,
        int: 91,
        vit: 1,
        agi: 50,
    },
    stats: {
        eAtk: 627,
        eMatk: 430,
        crit: 190,
        precision: 400,
        perfectPrecision: 0,
        softDef: 0,
        hardDef: 0,
        aspdPercent: 0,
        aspdUnit: 0,
    },
    attackInfo: {
        defBypass: 0,
        defMBypass: 0,
        sizePenalty: 1,
        thanatosEffect: false,
        rightWeapon: {
            wAtk: 130,
            wMAtk: 100,
            attackType: AttackTypes.Physical,
            attackRangeType: AttackRangeTypes.Melee,
            refinement: 15,
            weaponLevel: 4,
        },
        leftWeapon: {
            wAtk: 130,
            wMAtk: 100,
            attackType: AttackTypes.Physical,
            attackRangeType: AttackRangeTypes.Melee,
            refinement: 15,
            weaponLevel: 4,
        },
        skill: {
            attackType: AttackTypes.Physical,
            attackMultiplier: 15.74,
            bonusMultiplier: 0,
            critable: true,
        }
    },
    masteryAtk: 0,
    target: {
        softDef: 65,
        hardDef: 0,
        softDefM: 65,
        hardDefM: 0,
        reductions: {
            race: 0,
            size: 0,
            attackElement: 0,
            targetElement: 0,
            default: 0,
            range: 0,
        }
    },
    multipliers: {
        weaponAtk: 0.32,
        race: 0.5,
        size: 0.63,
        attackElement: 0.0,
        targetElement: 0.39,
        default: 0.3,
        range: 1.24,
        crit: 0.65,
        damage: 1.0,
        weaponDamage: 0.25, // EDP
        groupB: 3.0, // EDP
        finalDamage: 0,
    }
}

const res = Simulate(charSummary)


console.log("Result: ")
console.log(res);
