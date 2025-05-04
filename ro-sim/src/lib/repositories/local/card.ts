import { iCard } from "@/engine/types/card";
import { CardSearchArgs } from "@/engine/types/repositories";
import { loadCardsFile, loadModifiersFile } from "./utils";


export class LocalCardRepository {
    cards: {[k: string]: iCard}

    public constructor() {
        this.cards = JSON.parse(loadCardsFile());
        const modifiers = JSON.parse(loadModifiersFile());
        Object.keys(modifiers).forEach(id => {
            if (this.cards[id] && modifiers[id].status != "failed") {
                this.cards[id].modifiers = modifiers[id].modifiers;
            }
        })  
        console.log(`Loaded ${Object.keys(this.cards).length} cards`)
        console.log("Indexing Cards...");
        console.log("Finished Indexing Cards.");

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
