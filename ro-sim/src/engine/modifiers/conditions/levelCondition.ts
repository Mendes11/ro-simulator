import { iCondition } from "./types/engine";
import { ConditionCheckData } from "./types/engine";
import { ComparisonConditions } from "./types/config";
import { compareValues } from "./utils";
import { LevelConditionData } from "./types/config";

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