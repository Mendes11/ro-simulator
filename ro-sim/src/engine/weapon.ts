import { Equipment } from "./equipment";
import { iWeapon, WeaponData } from "./types/equipment";
import { AttackRangeTypes } from "./types/config";

export class Weapon extends Equipment implements iWeapon {
    weaponLevel: number;
    weaponAtk?: number;
    weaponMAtk?: number;
    attackRange: AttackRangeTypes;

    constructor(data: WeaponData) {
        super(data);
        this.weaponLevel = data.weaponLevel;
        this.weaponAtk = data.weaponAtk;
        this.weaponMAtk = data.weaponMAtk;
        this.attackRange = data.attackRange;
    }
}


