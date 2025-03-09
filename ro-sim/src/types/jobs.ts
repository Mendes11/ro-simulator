import { AttributesData } from "./attributes";
import { iSkill } from "./skills";

export enum Jobs {
    Novice,
}


export interface Job {
    id: string,
    name: string;
    dualWield: boolean;
    transcendent: boolean;
    maxJobAttributes: AttributesData;
    skills: iSkill[];
}