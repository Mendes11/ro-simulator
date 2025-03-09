import { AttackRangeTypes, AttackTypes, iAttackMultipliers } from "@/types/attackMultiplier";
import { AttributesData, iAttributes } from "@/types/attributes"
import { ElementTypes } from "@/types/element";
import { iCharacterSubStats } from "@/types/stats"
import { iTarget } from "@/types/target";

const BaseCriticalMultiplier = 1.4;


export type WeaponInfo = {
    wAtk: number;
    wMAtk: number;
    refinement: number;
    weaponLevel: number;
}

export type AttackInfo = {
    element: ElementTypes;
    attackRange?: AttackRangeTypes;
    rightWeapon: WeaponInfo;
    leftWeapon?: WeaponInfo;
    attackType: AttackTypes;
    critable: boolean;
    skill: boolean;
    defBypass: number;
    defMBypass: number;
    sizePenalty: number; // 1.0 for 100% damage
    thanatosEffect: boolean;
}

export type SimulationSummary = {
    level: number;
    attributes: iAttributes;
    subStats: iCharacterSubStats;
    attackInfo: AttackInfo;
    target: iTarget;
    attackMultipliers: iAttackMultipliers;
}


function statusAtk(level: number, attrs: AttributesData) {
    return (level / 4) + attrs.str + (attrs.dex / 5) + (attrs.luk / 3)
}


function weaponAtk(summary: SimulationSummary, maxVariance=true) {
    // TODO: Missing MAtk here...

    let atk = summary.attackInfo.rightWeapon.wAtk ?? 0;

    const variance = weaponLevelVariance(summary.attackInfo.rightWeapon);
    atk += maxVariance ? variance : -variance;
    atk += statBonus(summary.attributes, summary.attackInfo.rightWeapon);
    atk += refinementBonus(summary.attackInfo.rightWeapon);
    if (maxVariance) {
        atk += overUpgradeBonus(summary.attackInfo.rightWeapon);
    }
    atk *= summary.attackInfo.sizePenalty;
    atk *= (1 + summary.attackMultipliers.weaponDamage);

    return atk;
}

function weaponLevelVariance(weapon: WeaponInfo) {
    return (weapon.weaponLevel ?? 1) * (weapon.wAtk ?? 0) * 0.05;
}

function statBonus(attrs: AttributesData, weapon: WeaponInfo) {
    return ((weapon.wAtk ?? 0) * attrs.str) / 200;
}

function refinementBonus(weapon: WeaponInfo) {
    const bonuses = {
        1: 2,
        2: 3,
        3: 5,
        4: 7,
    };
    if (weapon.weaponLevel != null) {
        // @ts-expect-error 7053
        return (bonuses[weapon.weaponLevel] ?? 0) * weapon.refinement;
    }
    return 0;
}

function overUpgradeBonus(weapon: WeaponInfo) {
    if (weapon.weaponLevel === 1) {
        let bonus = 0;
        if (weapon.refinement >= 8) {
            bonus += (2 * (weapon.refinement - 7));
        }
        if (weapon.refinement >= 16) {
            bonus += weapon.refinement;
        }
        return bonus;

    } else if (weapon.weaponLevel === 2) {
        let bonus = 0;
        if (weapon.refinement >= 7) {
            bonus += (5 * (weapon.refinement - 6));
        }
        if (weapon.refinement >= 16) {
            bonus += weapon.refinement * 2;
        }
        return bonus;

    } else if (weapon.weaponLevel === 3) {
        let bonus = 0;
        if (weapon.refinement >= 6) {
            bonus += (8 * (weapon.refinement - 5));
        }
        if (weapon.refinement >= 16) {
            bonus += weapon.refinement * 2;
        }
        return bonus;

    } else if (weapon.weaponLevel === 4) {
        let bonus = 0;
        if (weapon.refinement >= 5) {
            bonus += (14 * (weapon.refinement - 4));
        }
        if (weapon.refinement >= 16) {
            bonus += weapon.refinement * 3;
        }
        return bonus;
    }
    return 0;
}

function hardDefReduction(def: number, bypass: number) {
    return ((4000+def)/(4000 + (def * 10))) * (1 - bypass)
}

function hardDefMReduction(defM: number, bypass: number) {
    return ((1000+defM)/(1000+defM*10)) * (1 - bypass)
}

type SimulationResult = {
    damage: number;
    criticalDamage?: number;
    hardReduction: number;
    softReduction: number;
    finalReductions: number;
    groupA: number;
    groupB: number;
    sAtk: number;
    atk: number;
}

// TODO: mAtk is missing some things
// TODO: Missing consumableAtk + Ammunition Atk + PseudoBuffAtk
// TODO: I'm not sure about the reductions part.
function simulate(summary: SimulationSummary, maxVariance=true): SimulationResult {
    const attackType = summary.attackInfo.attackType;
    let hardReduction = attackType === AttackTypes.Physical ?
        hardDefReduction(summary.target.hardDef, summary.attackInfo.defBypass)
        : hardDefMReduction(summary.target.hardDefM, summary.attackInfo.defMBypass);
    let softReduction = attackType === AttackTypes.Physical ?
        summary.target.softDef
        : summary.target.softDefM;

    const sAtk = statusAtk(summary.level, summary.attributes);
    const wAtk = weaponAtk(summary, maxVariance);
    let eAtk = summary.subStats.eAtk;

    if (summary.attackInfo.thanatosEffect) {
        eAtk += Math.floor(hardReduction / 2.0)
        hardReduction = 1.0;
        softReduction = 0; // TODO: confirm this. Should it get added to eAtk as well?
    }

    const extraAtk = eAtk; // + consumable Atk + Ammunition Atk + PseudoBuffAtk

    const groupA = (wAtk + extraAtk) * summary.attackMultipliers.weaponAtk; // TODO: Validar se não é (1 + wAtk%)
    const groupB = (
        (wAtk + extraAtk)
        * (1 + summary.attackMultipliers.race)
        * (1 + summary.attackMultipliers.size)
        * (1 + summary.attackMultipliers.attackElement)
        * (1 + summary.attackMultipliers.targetElement)
        * (1 + summary.attackMultipliers.default)
        * (1 + summary.attackMultipliers.groupB)
    )

    let atk = (sAtk * 2) + groupA + groupB + summary.subStats.masteryAtk;
    let atkCrit = 0;

    let includeCrit = true;

    if (summary.attackInfo.skill) {
        // Skill Damage
        includeCrit = false;

        atk *= summary.attackMultipliers.skillAtk;
        atk *= (1 + summary.attackMultipliers.skill);
        if (summary.attackInfo.attackType === AttackTypes.Physical) {
            atk *= (1 + summary.attackMultipliers.range);
        }
        if (summary.attackInfo.critable) {
            includeCrit = true;
            atkCrit = atk * (1 + summary.attackMultipliers.crit);
        }

    } else {
        atk *= (1 + summary.attackMultipliers.range);
        atkCrit = atk * (1 + summary.attackMultipliers.crit);
    }

    atk = Math.floor(Math.floor(atk) * (1 + summary.attackMultipliers.damage));
    atkCrit = Math.floor(Math.floor(atkCrit) * (1 + summary.attackMultipliers.damage));

    // Damage Reduction Part
    atk = Math.floor(Math.floor(atk * hardReduction) - softReduction)
    atkCrit = Math.floor(Math.floor(atkCrit * hardReduction) - softReduction)

    // Final Damage Multiplier
    atk = Math.floor(atk * (1 + summary.attackMultipliers.finalDamage));
    atkCrit = Math.floor(atkCrit * (1 + summary.attackMultipliers.finalDamage));

    // Crit Damage Multiplier
    atkCrit = Math.floor(atkCrit * BaseCriticalMultiplier);

    const totalReductions = (
        (1 - summary.target.reductions.default)
        * (1 - summary.target.reductions.attackElement)
        * (1 - summary.target.reductions.race)
        * (1 - summary.target.reductions.size)
        * (1 - summary.target.reductions.targetElement)
    )

    atk = Math.floor(atk * (totalReductions));
    atkCrit = Math.floor(atkCrit * (totalReductions));

    return {
        damage: atk,
        criticalDamage: includeCrit ? atkCrit : undefined,
        hardReduction: 1 - hardReduction,
        softReduction: softReduction,
        finalReductions: 1 - totalReductions,
        groupA: groupA,
        groupB: groupB,
        sAtk: sAtk,
        atk: (sAtk * 2) + groupA + groupB + summary.subStats.masteryAtk,
    };
}


export type SimulateResult = {
    upperBound: SimulationResult;
    lowerBound: SimulationResult;
}
export function Simulate(summary: SimulationSummary): SimulateResult {
    return {
        upperBound: simulate(summary, true),
        lowerBound: simulate(summary, false),
    }
}
