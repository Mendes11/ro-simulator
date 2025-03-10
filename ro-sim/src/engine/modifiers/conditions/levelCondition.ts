import { ComparisonConditions, ConditionCheckData, iCondition } from "@/types/condition";
import { compareValues } from "./utils";

export type LevelConditionData = {
    level: number;
    operator: ComparisonConditions;
}

export class LevelCondition implements iCondition {
    level: number;
    operator: ComparisonConditions;

    public constructor(data: LevelConditionData) {
        this.level = data.level;
        this.operator = data.operator;
    }

    check(data: ConditionCheckData) {
        return compareValues(data.character.level, this.operator, this.level);
    }
}