import { ComparisonConditions, ConditionCheckData, iCondition, RefinementConditionData } from "@/types/condition";
import { ItemLocations } from "@/types/equipment";

export class RefinementCondition implements iCondition{
    location?: ItemLocations;
    refinement: number;
    condition: ComparisonConditions;

    public constructor(data: RefinementConditionData) {
        this.location = data.location;
        this.refinement = data.refinement;
        this.condition = data.condition;
    }

    check(data: ConditionCheckData) {
        if (this.location != null) {
            // TODO: Find Equipment by location -- Implement a Character class to deal with find methods there.
            return false
        }
        return this.checkCondition(data.source.instance.refinement);
    };

    checkCondition(value: number) {
        switch(this.condition) {
            case ComparisonConditions.EQ:
                return value === this.refinement;
            case ComparisonConditions.GT:
                return value > this.refinement;
            case ComparisonConditions.GTE:
                return value >= this.refinement;
            case ComparisonConditions.LT:
                return value <  this.refinement;
            case ComparisonConditions.LTE:
                return value <= this.refinement;
            case ComparisonConditions.NEQ:
                return value !== this.refinement;
        }
    }

}
