import { iCondition } from "./types/engine";
import { ConditionCheckData } from "./types/engine";

import { ElementTypes, RaceTypes } from "@/engine/types/enums";
import { SizeTypes } from "@/engine/types/enums";
import { TargetTypes } from "@/engine/types/enums";
import { TargetConditionData } from "./types/config";

// TargetCondition checks the given target against specific attributes such as race, size, element, and target-type
export class TargetCondition implements iCondition {
    race?: RaceTypes;
    size?: SizeTypes;
    element?: ElementTypes;
    type?: TargetTypes;

    public constructor(data: TargetConditionData) {
        this.race = data.race;
        this.size = data.size;
        this.element = data.element;
        this.type = data.type;
    }

    check(data: ConditionCheckData) {
        if (this.race && (data.target.race & this.race) === 0) {
            return false;
        }
        if (this.size && (data.target.size & this.size) === 0) {
            return false;
        }
        if (this.element && (data.target.element & this.element) === 0) {
            return false;
        }
        if (this.type && (data.target.type & this.type) === 0) {
            return false;
        }
        return true;
    }
}
