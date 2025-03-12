import { ComparisonConditions, ConditionCheckData, iCondition } from "@/types/condition";
import { ItemLocations } from "@/types/equipment";
import { compareValues } from "./utils";

export interface RefinementConditionData {
    // If the condition is on another equipment
    // Use location to point to it.
    location?: ItemLocations
    refinement: number
    condition: ComparisonConditions
}

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
        let equipment = data.source.instance;
        if (this.location != null) {
            equipment = data.character.findEquipmentByLocation(this.location)!
        }
        if (equipment != null) {
            return this.checkCondition(equipment.refinement)
        }
        return false;
    };

    checkCondition(value: number) {
        return compareValues(value, this.condition, this.refinement);
    }
}
