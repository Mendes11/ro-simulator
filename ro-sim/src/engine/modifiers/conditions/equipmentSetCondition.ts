import { iCondition } from "./types/engine";
import { ConditionCheckData } from "./types/engine";
import { EquipmentSetConditionData } from "./types/config";
import { iCard } from "@/engine/types/card";
import { iEquipment } from "@/engine/types/equipment";


// EquipmentSetCondition is used for combos that make a set with other equipments or cardss
// eg: Such as "Conjunto com [Anel dos Orcs]"
// These types of sets can only be applied once, so we "lock" it by pushing this set information to the
// "set" attribute in ConditionCheckData
export class EquipmentSetCondition implements iCondition{
    equipmentNames: string[]

    public constructor(data: EquipmentSetConditionData) {
        this.equipmentNames = data.names;
    }

    check(data: ConditionCheckData) {
        const targetEquipments = this.equipmentNames.map(name => data.character.findEquipmentByName(name)).filter(e => e != null);
        const targetCards = this.equipmentNames.map(name => data.character.findCardByName(name)).filter(c => c != null);

        if ((targetEquipments.length + targetCards.length) != this.equipmentNames.length) return false;
        const targets: (iEquipment | iCard)[] = [
            ...targetEquipments.map(e => e.equipment),
            ...targetCards.map(c => c.slot)
        ];
        const equipmentSet = {source: data.source.instance.equipment, targets: targets, condition: this}
        if (data.setAlreadyInUse(equipmentSet)) return false;
        data.addSet(equipmentSet);
        return true;
    }
}
