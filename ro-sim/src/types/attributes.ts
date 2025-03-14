export type AttributesData = {
    str: number; // Maps to FOR
    agi: number; // Maps to AGI
    vit: number; // Maps to VIT
    int: number; // Maps to INT
    dex: number; // Maps to DES
    luk: number; // Maps to SOR
}

export interface iAttributes extends AttributesData {
    sum: (other: iAttributes) => iAttributes;
    mul: (n: number) => iAttributes;
}
