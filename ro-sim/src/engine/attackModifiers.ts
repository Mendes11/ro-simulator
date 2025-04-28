import { iAttackModifiers } from "./types/attackModifier";
import { AttackModifiersData } from "./types/config";

export class AttackModifiers implements iAttackModifiers {
    defBypass: number = 0;
    defMBypass: number = 0;
    sizePenalty: number = 0;
    thanatosEffect: boolean = false;

    public constructor(data?: AttackModifiersData){
        this.defBypass = data?.defBypass ?? 0;
        this.defMBypass = data?.defMBypass ?? 0;
        this.sizePenalty = data?.sizePenalty ?? 0;
        this.thanatosEffect = data?.thanatosEffect ?? false;
    }

    sum(other: iAttackModifiers) {
        return new AttackModifiers({
            defBypass: this.defBypass + other.defBypass,
            defMBypass: this.defMBypass + other.defMBypass,
            sizePenalty: this.sizePenalty + other.sizePenalty,
            thanatosEffect: this.thanatosEffect || other.thanatosEffect,
        })
    }
    mul(n: number) {
        return new AttackModifiers({
            defBypass: this.defBypass * n,
            defMBypass: this.defMBypass * n,
            sizePenalty: this.sizePenalty * n,
            thanatosEffect: this.thanatosEffect,
        })
    }
}