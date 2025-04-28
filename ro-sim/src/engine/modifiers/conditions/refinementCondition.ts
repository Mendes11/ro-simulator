import { iCondition } from "./types/engine";
import { ConditionCheckData } from "./types/engine";
import { ComparisonConditions } from "./types/config";
import { ItemLocations } from "@/engine/types/enums";
import { compareValues } from "./utils";
import { RefinementConditionData } from "./types/config";

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
