import { AttributesData } from "@/engine/types/attributes";
import { iSkill } from "./skills";
import { JobIds } from "@/engine/types/enums";

export interface Job {
    id: JobIds,
    name: string;
    dualWield: boolean;
    transcendent: boolean;
    maxJobAttributes: AttributesData;
    skills: iSkill[];
}