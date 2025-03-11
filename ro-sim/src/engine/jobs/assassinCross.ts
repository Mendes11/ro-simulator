import { ASC_BREAKER } from "../skills/asc_breaker";
import { ASC_METEORASSAULT } from "../skills/asc_meteorassault";
import { Assassin } from "./assassin";
import { ASC_EDP } from "../skills/asc_edp";
import { JobIds } from "@/types/jobs";

export const AssassinCross = {
    id: JobIds.AssassinCross,
    name: "Algoz",
    dualWield: true,
    transcendent: true,
    maxJobAttributes: {
        str: 9,
        agi: 15,
        vit: 3,
        int: 0,
        dex: 10,
        luk: 8, 
    },
    skills: [
        ASC_BREAKER,
        ASC_METEORASSAULT,
        ASC_EDP,
    ].concat(Assassin.skills),
}