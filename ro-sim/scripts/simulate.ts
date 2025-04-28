import { AttackMultipliers } from "@/engine/attackMultipliers";
import { Attributes } from "@/engine/attributes";
import { SimulationSummary, Simulate } from "@/engine/simulation";
import { CharacterSubStats } from "@/engine/subStats";
import { AttackRangeTypes, AttackTypes } from "@/engine/types/config";
import { ElementTypes } from "@/engine/types/config/element";
import { RaceTypes } from "@/engine/types/enums";
import { SizeTypes } from "@/engine/types/enums";
import { TargetTypes } from "@/engine/types/enums";

const charSummary: SimulationSummary = {
    level: 99,
    attributes: new Attributes({
        str: 99,
        dex: 16,
        luk: 68,
        int: 91,
        vit: 1,
        agi: 50,
    }),
    subStats: new CharacterSubStats({
        eAtk: 627,
        eMatk: 430,
        crit: 190,
        precision: 400,
        perfectPrecision: 0,
        softDef: 0,
        hardDef: 0,
        aspdPercent: 0,
        aspdUnit: 0,
        masteryAtk: 0,
    }),
    attackInfo: {
        element: ElementTypes.Neutral,
        defBypass: 0,
        defMBypass: 0,
        sizePenalty: 1,
        thanatosEffect: false,
        critable: true,
        skill: true,
        attackType: AttackTypes.Physical,
        rightWeapon: {
            wAtk: 130,
            wMAtk: 100,
            refinement: 15,
            weaponLevel: 4,
        },
        leftWeapon: {
            wAtk: 130,
            wMAtk: 100,
            refinement: 15,
            weaponLevel: 4,
        },
    },
    target: {
        element: ElementTypes.Neutral,
        race: RaceTypes.Human,
        size: SizeTypes.Medium,
        type: TargetTypes.Normal,
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
    attackMultipliers: new AttackMultipliers({
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
        skill: 1,
        skillAtk: 15.74,
    })
}

const res = Simulate(charSummary)


console.log("Result: ")
console.log(res);
