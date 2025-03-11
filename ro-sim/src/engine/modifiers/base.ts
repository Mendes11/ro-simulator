import { ConditionCheckData, ConditionData, EquipmentSet, iCondition } from "@/types/condition";
import { iCharacterModifiers, iModifier, ModifierApplyData } from "@/types/equipment";
import { newCondition } from "./utils";

export abstract class BaseModifier implements iModifier {
    conditions: iCondition[];

    public constructor(conditions: ConditionData[] = []) {
        this.conditions = conditions.map(c => newCondition(c)) ?? []
    }

    getModifier(data: ModifierApplyData): iCharacterModifiers | undefined {
        return this.checkConditions(data) ? this.mountModifier(data) : undefined;        
    }

    public abstract mountModifier(data: ModifierApplyData): iCharacterModifiers | undefined;    

    checkConditions(data: ModifierApplyData) {
        if (this.conditions.length === 0) return true;
        
        return this.conditions.every(
            c => c.check({
                source: data.source, 
                character: data.character, 
                target: data.target, 
                attackInfo: data.attackInfo,
                setAlreadyInUse: (set: EquipmentSet) => {
                    return data.sets.find(s => (s.condition !== c) && (s.source.name === set.source.name) && s.target.name === set.target.name) != null
                },
                addSet: (set: EquipmentSet) => {
                    data.sets.push(set);
                }
            })
        );
    }
}