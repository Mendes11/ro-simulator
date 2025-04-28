import { iCondition } from "./types/engine";
import { ConditionCheckData } from "./types/engine";
import { EquipmentSetConditionData } from "./types/config";


// EquipmentSetCondition is used for combos that make a set with other equipments
// eg: Such as "Conjunto com [Anel dos Orcs]"
// These types of sets can only be applied once, so we "lock" it by pushing this set information to the
// "set" attribute in ConditionCheckData
export class EquipmentSetCondition implements iCondition{
    equipmentNames: string[]

    public constructor(data: EquipmentSetConditionData) {
        this.equipmentNames = data.names;
    }

    check(data: ConditionCheckData) {
        const targetEquipments = data.character.equipments.filter(e => this.equipmentNames.includes(e.equipment.name))
        if (targetEquipments.length != this.equipmentNames.length) return false;

        const equipmentSet = {source: data.source.instance.equipment, targets: targetEquipments.map(e => e.equipment), condition: this}
        if (data.setAlreadyInUse(equipmentSet)) return false;
        data.addSet(equipmentSet);
        return true;        
    }
}