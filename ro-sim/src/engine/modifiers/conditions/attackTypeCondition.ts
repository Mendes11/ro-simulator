import { AttackRangeTypes, AttackTypes } from "@/types/attackMultiplier";
import { ConditionCheckData, iCondition } from "@/types/condition";
import { ElementTypes } from "@/types/element";

export type AttackTypeConditionData = {
    attackType?: AttackTypes;
    attackRangeType?: AttackRangeTypes;
    attackElement?: ElementTypes;
}

export class AttackTypeCondition implements iCondition {
    attackType?: AttackTypes;
    attackRangeType?: AttackRangeTypes;
    attackElement?: ElementTypes;

    public constructor(data: AttackTypeConditionData){
        this.attackType = data.attackType;
        this.attackRangeType = data.attackRangeType;
        this.attackElement = data.attackElement;
    }

    check(data: ConditionCheckData) {
        if (this.attackType && (data.attackInfo.attackType & this.attackType) === 0) {
            return false;
        }
        if (this.attackElement && (data.attackInfo.element & this.attackElement) === 0) {
            return false;
        }
        if (this.attackRangeType != null) {
            if (data.attackInfo.attackRange == null || (data.attackInfo.attackRange & this.attackRangeType) === 0) {
                return false;
            }
        }
        return true;
    }
}