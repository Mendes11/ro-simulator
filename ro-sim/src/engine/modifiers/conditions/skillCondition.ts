import { iCondition } from "./types/engine";
import { ConditionCheckData } from "./types/engine";
import { ComparisonConditions } from "./types/config";
import { compareValues } from "./utils";
import { SkillConditionData } from "./types/config";

export class SkillCondition implements iCondition {
    skillId: string;
    level?: number;
    levelComparisonOperator?: ComparisonConditions;
    
    public constructor(data: SkillConditionData) {
        this.skillId = data.id;
        this.level = data.level;
        this.levelComparisonOperator = data.levelComparisonOperator;
    }

    check(data: ConditionCheckData) {
        const skill = data.character.findSkill(this.skillId);
        if (skill == null) return false;
        if (this.level != null && this.levelComparisonOperator != null) {
            return compareValues(skill.level, this.levelComparisonOperator, this.level);
        }
        return false;

    }
}