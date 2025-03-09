import { ConditionCheckData, EquipmentSetConditionData, iCondition } from "@/types/condition";

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

        const existingSet = data.sets.find(set => 
            set.source.name === data.source.instance.equipment.name 
            && set.target.name == this.equipmentName
        )
        if (existingSet != null) return false;
        
        data.sets.push({source: data.source.instance.equipment, target: targetEquipment?.equipment})
        return true;        
    }

}