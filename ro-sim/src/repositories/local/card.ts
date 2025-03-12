import { iCard } from "@/types/card";
import { CardSearchArgs } from "@/types/repositories"
import { promises as fs } from "fs";
import path from "path";

let file: string;

if (process.env.NODE_ENV === "production") {
    console.log("Loading cards.json from Bucket");
    const url = "https://uhajjqevycyljnw0.public.blob.vercel-storage.com/cards-plaQctXTUfgv0sSni9e4qfYbWLxeXa.json"
    file = await fetch(url).then(res => res.text())
} else {
    file = await fs.readFile(path.join(process.cwd(), "cards.json"), 'utf-8');
}

export class LocalCardRepository {
    cards: {[k: string]: iCard}

    public constructor() {
        this.cards = JSON.parse(file);
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
