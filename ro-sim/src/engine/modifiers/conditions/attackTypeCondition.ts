import { AttackRangeTypes, AttackTypes } from "@/engine/types/config";
import { iCondition } from "./types/engine";
import { ConditionCheckData } from "./types/engine";
import { ElementTypes } from "@/engine/types/config/element";
import { AttackTypeConditionData } from "./types/config";

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
            if (data.attackInfo.attackRangeType == null || (data.attackInfo.attackRangeType & this.attackRangeType) === 0) {
                return false;
            }
        }
        return true;
    }
}