import { iCard } from "@/engine/types/card";
import { CardSearchArgs } from "@/engine/types/repositories";
import fs from "fs";

export async function loadCardsFileAsync(): Promise<string> {
    'use server'
    return fs.readFileSync(process.cwd() + "/src/lib/repositories/local/cards.json", 'utf-8');
}

function loadCardsFile(): string {
    return fs.readFileSync(process.cwd() + "/src/lib/repositories/local/cards.json", 'utf-8');
}
export class LocalCardRepository {
    cards: {[k: string]: iCard}

    public constructor() {
        this.cards = JSON.parse(loadCardsFile());
        console.log(`Loaded ${Object.keys(this.cards).length} cards`)
        console.log("Indexing Cards...");
        console.log("Finished Indexing Equipments.");

    }

    async Find(id: number): Promise<iCard> {
        return this.cards[id.toString()];
    }

    async Search(query: CardSearchArgs): Promise<iCard[]> {
        return Object.values(this.cards).filter(card => {
            if (query.name && !(new RegExp(query.name!, "gi").test(card.name))) return false;
            if (query.targetTypes && !query.targetTypes.includes(card.targetType)) return false;
            if (query.targetSubTypes && !(card.targetSubTypes?.some(subType => query.targetSubTypes?.includes(subType)))) return false;

            return true
        })
    }
}
