import { Equipment } from "./equipment";
import { iArmor, ArmorData } from "./types/equipment";


export class Armor extends Equipment implements iArmor {
    equipDef?: number;
    equipMDef?: number;

    constructor(data: ArmorData) {
        super(data);
        this.equipDef = data.equipDef;
        this.equipMDef = data.equipMDef;
    }
}
