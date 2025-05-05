import { CardData } from "@/engine/types/card";
import { CardSearchArgs } from "@/engine/types/repositories";
import { loadCardsFile, loadModifiersFile } from "./utils";
import { ModifierData } from "@/engine/modifiers/types/config";


export class LocalCardRepository {
    cards: {[k: string]: CardData}

    public constructor() {
        this.cards = JSON.parse(loadCardsFile());
        const modifiers = JSON.parse(loadModifiersFile());
        Object.entries(modifiers).forEach(([id, modifiers]) => {
            if (this.cards[id] && modifiers != null) {
                this.cards[id].modifiers = modifiers as ModifierData[];
            }
        })
        console.log(`Loaded ${Object.keys(this.cards).length} cards`)
        console.log("Indexing Cards...");
        console.log("Finished Indexing Cards.");

    }

    async Find(id: number): Promise<CardData> {
        return this.cards[id.toString()];
    }

    async Search(query: CardSearchArgs): Promise<CardData[]> {
        return Object.values(this.cards).filter(card => {
            if (query.name && !(new RegExp(query.name!, "gi").test(card.name))) return false;
            if (query.targetTypes && !query.targetTypes.includes(card.targetType)) return false;
            if (query.targetSubTypes && !(card.targetSubTypes?.some(subType => query.targetSubTypes?.includes(subType)))) return false;

            return true
        })
    }
}
