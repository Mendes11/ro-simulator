import { iCharacterModifiers, iEquipment, ModifierApplyData, ModifierResult } from "./types/equipment";
import { ItemLocations } from "./types/enums";
import { ActiveInstanceModifiersData, EquipmentInstanceData, iEquipmentInstance, InstanceActiveModifiers } from "./types/equipmentInstance";
import { iCard } from "./types/card";
import { CharacterModifiers } from "./modifiers/characterModifiers";
import { newModifierApplyData, newModifier } from "./modifiers/utils";


export class EquipmentInstance implements iEquipmentInstance {
    equipment: iEquipment;
    sourceLocation: ItemLocations;
    slots: iCard[];
    location: ItemLocations;
    refinement: number;

    constructor(data: EquipmentInstanceData) {
        this.equipment = data.equipment;
        this.sourceLocation = data.sourceLocation;
        this.slots = data.slots;
        this.location = data.location;
        this.refinement = data.refinement;
    }

    resolveModifiers(data: ActiveInstanceModifiersData): InstanceActiveModifiers {
        const applyData = newModifierApplyData(data.character, this, data.element, data.target, data.sets, data.skill);

        const equipmentModifiers = this.equipment.resolveModifiers(applyData);
        const cardsModifiers = this.resolveCardsModifiers(applyData);

        const equipmentSum = equipmentModifiers.map(e => e.result).filter(r => r != null).reduce((l, r) => l.sum(r), new CharacterModifiers());
        const cardsSum = cardsModifiers.map(e => e.result).filter(e => e != null).reduce((l, r) => l.sum(r), new CharacterModifiers());
        const finalModifier: iCharacterModifiers = new CharacterModifiers()
            .sum(equipmentSum)
            .sum(cardsSum);

        return {
            equipmentModifiers: equipmentModifiers,
            cardsModifiers: cardsModifiers,
            finalModifier: finalModifier
        };
    }

    private resolveCardsModifiers(applyData: ModifierApplyData): ModifierResult[] {
        return this.slots.flatMap(slot => {
            if (slot.modifiers == null) {
                console.log("Item missing modifiers!");
                return [];
            }
            const modifiers = slot.modifiers.map(mod => newModifier(mod)).map(m => ({
                modifier: m,
                result: m.getModifier(applyData)
            }));
            return modifiers;
        });
    }
}
