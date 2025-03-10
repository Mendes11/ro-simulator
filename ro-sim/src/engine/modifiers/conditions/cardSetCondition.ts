import { ConditionCheckData, iCondition } from "@/types/condition";


export interface CardSetConditionData {
    name: string;
}

// CardSetCondition is used for combos that make a set with cards
// eg: Such as "Conjunto com [Carta Freeoni]"
// These types of sets can only be applied once, so we "lock" it by pushing this set information to the
// "set" attribute in ConditionCheckData
export class CardSetCondition implements iCondition{
    cardName: string

    public constructor(data: CardSetConditionData) {
        this.cardName = data.name;
    }

    check(data: ConditionCheckData) {
        const targetCard = data.character.findCardByName(this.cardName);
        if (targetCard == null) return false;
        const equipmentSet = {source: data.source.instance.equipment, target: targetCard.slot, condition: this}
        if (data.setAlreadyInUse(equipmentSet)) return false;
        data.addSet(equipmentSet);
        return true;        
    }
}