
import { AttackMultipliers } from "@/engine/attackMultipliers";
import { Attributes } from "@/engine/attributes";
import { Character } from "@/engine/character";
import { Jobs } from "@/engine/jobs";
import { SimulationSummary } from "@/engine/simulation";
import { CharacterSubStats } from "@/engine/subStats";
import { AttackRangeTypes, AttackTypes } from "@/types/attackMultiplier";
import { iCharacter } from "@/types/character";
import { ElementTypes } from "@/types/element";
import { ItemLocations, ItemTypes, ModifierApplyData, ModifierSourceData, WeaponSubTypes } from "@/types/equipment";
import { RaceTypes } from "@/types/race";
import { SizeTypes } from "@/types/size";
import { iTarget, TargetTypes } from "@/types/target";
import { test } from "vitest";

interface MyFixtures {
    baseCharacter: iCharacter;
    baseSource: ModifierSourceData;
    summary: SimulationSummary;
    target: iTarget;
    applyData: ModifierApplyData;
}

export const engineTest = test.extend<MyFixtures>({
    baseCharacter: async (_, use) => {
        const character = new Character({
            level: 1,
            baseAttrs: Attributes.NewCharacterAttrs(),
            equipments: [],
            job: Jobs[0],
        })
        await use(character);

    },
    baseSource: async(_, use) => {
        const baseSource = {
            location: ItemLocations.RightHand,
            sourceLocation: ItemLocations.RightHand,
            instance: {
                refinement: 0,
                equipment: {
                    type: ItemTypes.Weapon,
                    subType: WeaponSubTypes.Dagger,
                    id: 1,
                    name: "DefaultWeapon",
                    description: "",
                    slots: 0,
                    weight: 0,
                    minLevel: 0,
                }
            }
        }
        use(baseSource);
    },
    summary: async (_, use) => {
        const summary = {
            level: 1,
            attributes: Attributes.NewCharacterAttrs(),
            subStats: new CharacterSubStats(),
            attackInfo: {
                element: ElementTypes.Neutral,
                defBypass: 0,
                defMBypass: 0,
                sizePenalty: 1.0,
                thanatosEffect: false,
                critable: true,
                skill: false,
                attackType: AttackTypes.Physical,
                rightWeapon: {
                    wAtk: 0,
                    wMAtk: 0,
                    refinement: 0,
                    weaponLevel: 1,
                },
                leftWeapon: undefined,
            },
            attackMultipliers: new AttackMultipliers(),
            target: {
                race: RaceTypes.Human,
                size: SizeTypes.Medium,
                element: ElementTypes.Neutral,
                type: TargetTypes.Boss, 
                softDef: 10, 
                hardDef: 10, 
                softDefM: 10,
                hardDefM: 10,
                reductions: {
                    race: 0, 
                    size: 0,
                    attackElement: 0,
                    targetElement: 0,
                    default: 0,
                    range: 0
                }
            }
        }
        await use(summary);
    },
    target: async (_, use) => {
        const target = {
            race: RaceTypes.Human,
            element: ElementTypes.Neutral,
            size: SizeTypes.Medium,
            type: TargetTypes.Boss,
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
        }
        await use(target);
    },
    applyData: async({baseSource, baseCharacter, target}, use) => {
        await use({
            source: baseSource, 
            character: baseCharacter, 
            attackInfo: {
                attackRangeType: AttackRangeTypes.Melee, 
                attackType: AttackTypes.Physical,
                element: ElementTypes.Neutral,
            },
            target: target,
            sets: []
        });
    }
})
