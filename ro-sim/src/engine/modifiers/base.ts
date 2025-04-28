import { iCondition } from "./conditions/types/engine";
import { ConditionData } from "./conditions/types/config";
import { EquipmentSet } from "./conditions/types/config";
import { iCharacterModifiers, ModifierApplyData } from "../types/equipment";
import { iModifier } from "./types/engine";
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
                    return data.sets.find(s => 
                        (s.condition !== c) 
                        && (s.source.name === set.source.name) 
                        && this.compareArray(s.targets.map(t => t.name), set.targets.map(t => t.name))
                    ) != null
                },
                addSet: (set: EquipmentSet) => {
                    data.sets.push(set);
                }
            })
        );
    }

    private compareArray(a: string[], b: string[]){
        b.sort();
        a.sort();
        return a.every((v, idx) => b[idx] == v);
    }
}