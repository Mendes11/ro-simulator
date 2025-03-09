export enum AttributeTypes {
    FOR,
    AGI,
    VIT,
    INT,
    DEX,
    LUCK,
}

export type AttributesData = {
    str: number;
    agi: number;
    vit: number;
    int: number;
    dex: number;
    luk: number;
}

export interface iAttributes extends AttributesData {
    sum: (other: iAttributes, inplace?: boolean) => iAttributes;
    mul: (n: number, inplace?: boolean) => iAttributes;
}
