import { iCondition } from "./types/engine";
import { ConditionCheckData } from "./types/engine";
import { ComparisonConditions } from "./types/config";
import { compareValues } from "./utils";
import { AttributeConditionData } from "./types/config";
import { AttributesData } from "@/engine/types/attributes";

export class AttributeCondition implements iCondition {
    attribute: keyof AttributesData;
    value: number;
    operator: ComparisonConditions;

    public constructor(data: AttributeConditionData) {
        this.attribute = data.attribute;
        this.value = data.value;
        this.operator = data.operator;
    }

    check(data: ConditionCheckData) {
        return compareValues(data.character.baseAttrs[this.attribute], this.operator, this.value);
    }
}
