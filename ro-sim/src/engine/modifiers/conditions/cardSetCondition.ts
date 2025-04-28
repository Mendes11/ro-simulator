import { iCondition } from "./types/engine";
import { ConditionCheckData } from "./types/engine";
import { CardSetConditionData } from "./types/config";


// CardSetCondition is used for combos that make a set with cards
// eg: Such as "Conjunto com [Carta Freeoni]"
// These types of sets can only be applied once, so we "lock" it by pushing this set information to the
// "set" attribute in ConditionCheckData
export class CardSetCondition implements iCondition{
    cardNames: string[]

    public constructor(data: CardSetConditionData) {
        this.cardNames = data.names;
    }

    check(data: ConditionCheckData) {
        const targetCards = this.cardNames.map(cardName => data.character.findCardByName(cardName)).filter(c => c != null);
        if (targetCards.length != this.cardNames.length) return false;

        const equipmentSet = {source: data.source.instance.equipment, targets: targetCards.map(c => c.slot), condition: this}
        if (data.setAlreadyInUse(equipmentSet)) return false;
        data.addSet(equipmentSet);
        return true;        
    }
}