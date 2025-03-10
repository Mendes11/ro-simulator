import { ComparisonConditions } from "@/types/condition";

export const compareValues = (value: number, operator: ComparisonConditions, target: number) => {
    switch(operator) {
        case ComparisonConditions.EQ:
            return value === target;
        case ComparisonConditions.GT:
            return value > target;
        case ComparisonConditions.GTE:
            return value >= target;
        case ComparisonConditions.LT:
            return value <  target;
        case ComparisonConditions.LTE:
            return value <= target;
        case ComparisonConditions.NEQ:
            return value !== target;
        default:
            return false
    }
}