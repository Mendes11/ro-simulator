import { iAttributes } from "./types/attributes";
import { AttributesData } from "./types/config";

export class Attributes implements iAttributes {
    str: number = 0;
    agi: number = 0;
    vit: number = 0;
    int: number = 0;
    dex: number = 0;
    luk: number = 0;

    public constructor(data?: AttributesData) {
        this.setData(data);
    }

    // Initializes Attributes with all values default to 1
    // TODO: Move this to its own CharacterAttributes object
    public static NewCharacterAttrs() {
        return new Attributes({
            str: 1,
            agi: 1,
            vit: 1,
            int: 1,
            dex: 1,
            luk: 1,
        })
    }

    setData(data?: AttributesData) {
        this.str = data?.str ?? 0;
        this.agi = data?.agi ?? 0;
        this.vit = data?.vit ?? 0;
        this.int = data?.int ?? 0;
        this.dex = data?.dex ?? 0;
        this.luk = data?.luk ?? 0;
    }

    sum(other: iAttributes) {
        return new Attributes({
            str: this.str + other.str,
            agi: this.agi + other.agi,
            dex: this.dex + other.dex,
            vit: this.vit + other.vit,
            int: this.int + other.int,
            luk: this.luk + other.luk,
        });
    }

    mul(n: number) {
        return new Attributes({
            str: this.str * n,
            agi: this.agi * n,
            dex: this.dex * n,
            vit: this.vit * n,
            int: this.int * n,
            luk: this.luk * n,
        });
    }
}
