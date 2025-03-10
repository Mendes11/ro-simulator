import { ConditionCheckData, iCondition } from "@/types/condition";


export interface EquipmentSetConditionData {
    name: string;
}

// EquipmentSetCondition is used for combos that make a set with other equipments
// eg: Such as "Conjunto com [Anel dos Orcs]"
// These types of sets can only be applied once, so we "lock" it by pushing this set information to the
// "set" attribute in ConditionCheckData
export class EquipmentSetCondition implements iCondition{
    equipmentName: string

    public constructor(data: EquipmentSetConditionData) {
        this.equipmentName = data.name;
    }

    check(data: ConditionCheckData) {
        const targetEquipment = data.character.findEquipmentByName(this.equipmentName);
        if (targetEquipment == null) return false;
        const equipmentSet = {source: data.source.instance.equipment, target: targetEquipment?.equipment, condition: this}
        if (data.setAlreadyInUse(equipmentSet)) return false;
        data.addSet(equipmentSet);
        return true;        
    }
}