import { ConditionCheckData, ConditionData, iCondition } from "@/types/condition";
import { iModifier, ModifierApplyData } from "@/types/equipment";
import { newCondition } from "./utils";

export class BaseModifier implements iModifier {
    conditions: iCondition[];

    public constructor(conditions: ConditionData[] = []) {
        this.conditions = conditions.map(c => newCondition(c)) ?? []
    }

    apply(data: ModifierApplyData){
        throw 'NotImplemented';
    }

    check(data: ConditionCheckData) {
        return this.conditions.every(c => c.check(data));
    }
}