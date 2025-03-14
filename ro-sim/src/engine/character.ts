import { iAttributes } from "@/types/attributes";
import { iCard } from "@/types/card";
import { CharacterData, iCharacter } from "@/types/character";
import { iAttackModifiers, iCharacterModifiers, ItemLocations, iWeapon, ModifierApplyData } from "@/types/equipment";
import { iEquipmentInstance } from "@/types/equipmentInstance";
import { Job } from "@/types/jobs";
import { iSkillInstance } from "@/types/skills";
import { iTarget } from "@/types/target";
import { AttackInfo, Simulate, SimulationSummary } from "./simulation";
import { Attributes } from "./attributes";
import { AttackRangeTypes, AttackTypes } from "@/types/attackMultiplier";
import { ElementTypes } from "@/types/element";
import { CharacterModifiers } from "./modifiers/characterModifiers";
import { CharacterSubStats } from "./subStats";
import { AttackMultipliers } from "./attackMultipliers";
import { AttackModifiers } from "./attackModifiers";
import { newModifier } from "./modifiers/utils";
import { Novice } from "./jobs/novice";
import { EquipmentSet } from "@/types/condition";

export class Character implements iCharacter {
    level: number;
    baseAttrs: iAttributes;
    equipments: iEquipmentInstance[];
    job: Job;

    public constructor(data?: CharacterData){
        this.level = data?.level ?? 1;
        this.baseAttrs = new Attributes(data?.baseAttrs);
        this.equipments = data?.equipments ?? [];
        this.job = data?.job ?? Novice;
    }

    findSkill(){
        // TODO: Implement this.
        return undefined;
    }

    findEquipmentByName(name: string){
        return this.equipments.find(e => e.equipment.name === name);
    }

    findEquipmentByLocation(location: ItemLocations){
        return this.equipments.find(e => (e.sourceLocation & location) != 0);
    }

    findCardByName(name: string): { slot: iCard; equipmentInstance: iEquipmentInstance; } | undefined {
        return this.cardsList().find(({slot}) => slot.name === name);
    }
    
    cardsList(): { slot: iCard, equipmentInstance: iEquipmentInstance}[] {
        return this.equipments.flatMap(e => e.slots.flatMap(slot => ({slot: slot, equipmentInstance: e})))
    }

    activeModifiers(element: ElementTypes, target: iTarget, skill?: iSkillInstance): {eqp: iEquipmentInstance, charModifiers: iCharacterModifiers}[] {
        const sets: EquipmentSet[] = [];
        // Run through all Equipments and Cards modifiers and call their `.getModifier` method to check if they are valid or not
        // returning the sum of all modifiers per equipment.
        // NOTE: It may be interesting to split this between equipment and card modifiers when thinking about the presentation layer.
        return this.equipments.map(eqp => {
            const applyData: ModifierApplyData = {
                character: this,
                sets: sets,
                target: target,
                attackInfo: {
                    element: element,
                    attackType: skill?.skill.attackType ?? AttackTypes.Physical,
                    attackRangeType: skill?.skill.attackRangeType ?? AttackRangeTypes.Melee,
                },
                source: {
                    instance: eqp,
                    location: eqp.location
                }
            }
            
            const equipmentModifiers = eqp.equipment.modifiers
                ?.map(mod => newModifier(mod).getModifier(applyData))
                ?.filter(m => m != null) ?? []

            const cardsModifiers = eqp.slots.flatMap(slot => 
                slot.modifiers
                    ?.map(mod => newModifier(mod).getModifier(applyData))
                    ?.filter(m => m != null) ?? []
            );
            if (equipmentModifiers.length > 0 || cardsModifiers.length > 0) {
                let modifiers: iCharacterModifiers = new CharacterModifiers()
                if (equipmentModifiers.length > 0) modifiers = modifiers.sum(equipmentModifiers.reduce((l, r) => l.sum(r)));
                if (cardsModifiers.length > 0) modifiers = modifiers.sum(cardsModifiers.reduce((l, r) => l.sum(r)));
                return {eqp: eqp, charModifiers: modifiers}
            }
            return
            
        }).filter(m => m != null);
    }

    simulate(element: ElementTypes, target: iTarget, skill?: iSkillInstance){
        let charModifiers = new CharacterModifiers({
            attributes: this.baseAttrs,
            subStats: new CharacterSubStats(),
            attackMultipliers: new AttackMultipliers(),
            attackModifiers: new AttackModifiers()
        })
        const mods = this.activeModifiers(element, target, skill)
        if (mods.length > 0) {
            charModifiers = mods.map(m => m.charModifiers).reduce((l, r) => l.sum(r), charModifiers);
        }
        
        const summary: SimulationSummary = {
            level: this.level,
            target: target,
            attackInfo: this.attackInfo(element, charModifiers.attackModifiers, skill),
            attackMultipliers: charModifiers.attackMultipliers,
            attributes: charModifiers.attributes,
            subStats: charModifiers.subStats,
        }
        return Simulate(summary);
    }

    private attackInfo(element: ElementTypes, attackModifiers: iAttackModifiers, skill?: iSkillInstance): AttackInfo {
        const rightHand = this.findEquipmentByLocation(ItemLocations.RightHand);
        const leftHand = this.findEquipmentByLocation(ItemLocations.LeftHand);

        return {
            attackType: skill?.skill.attackType ?? AttackTypes.Physical,
            critable: skill?.skill.critable ?? true,
            element: element,
            skill: skill != null,
            attackRange: skill?.skill.attackRangeType ?? AttackRangeTypes.Melee,
            defBypass: skill?.skill.defBypass ?? attackModifiers.defBypass,
            defMBypass: skill?.skill.defMBypass ?? attackModifiers.defMBypass,
            thanatosEffect: skill?.skill.thanatosEffect ?? attackModifiers.thanatosEffect,
            rightWeapon: {
                refinement: this.findEquipmentByLocation(ItemLocations.RightHand)?.refinement ?? 0,
                wAtk: (rightHand?.equipment as iWeapon)?.weaponAtk ?? 0,
                wMAtk: (rightHand?.equipment as iWeapon)?.weaponMAtk ?? 0,
                weaponLevel: (rightHand?.equipment as iWeapon)?.weaponLevel ?? 0,
            },
            sizePenalty: attackModifiers.sizePenalty != 0 ? attackModifiers.sizePenalty : 1.0, // TODO: Implement size-penalty method from the weapon type
            leftWeapon: leftHand ? {
                refinement: leftHand?.refinement ?? 0,
                wAtk: (leftHand?.equipment as iWeapon)?.weaponAtk ?? 0,
                wMAtk: (leftHand?.equipment as iWeapon)?.weaponMAtk ?? 0,
                weaponLevel: (leftHand?.equipment as iWeapon)?.weaponLevel ?? 0,
            } : undefined,
        }
    }

}