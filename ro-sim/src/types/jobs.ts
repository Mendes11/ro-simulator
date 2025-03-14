import { AttributesData } from "./attributes";
import { iSkill } from "./skills";

export enum JobIds {
    Novice = "Novice",
    Assassin = "Assassin",
    AssassinCross = "AssassinCross"
}


export interface Job {
    id: JobIds,
    name: string;
    dualWield: boolean;
    transcendent: boolean;
    maxJobAttributes: AttributesData;
    skills: iSkill[];
}