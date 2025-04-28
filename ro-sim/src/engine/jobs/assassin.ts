import { JobIds } from "../types/enums";
import { AS_SONICBLOW } from "../skills/as_sonicblow";

export const Assassin = {
    id: JobIds.Assassin,
    name: "Mercenário",
    dualWield: true,
    transcendent: false,
    maxJobAttributes: {
        str: 6,
        agi: 10,
        vit: 2,
        int: 4,
        dex: 8,
        luk: 0, 
    },
    skills: [
        AS_SONICBLOW,
    ],
}