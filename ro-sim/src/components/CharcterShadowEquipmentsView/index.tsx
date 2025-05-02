import { ItemTypes, ShadowEquipmentSubTypes } from "@engine/types/equipment";
import { ItemLocations } from "@/engine/types/enums";
import { iEquipmentInstance } from "@engine/types/equipmentInstance";
import CharacterEquipmentCard from "../CharacterEquipmentCard";

type CharacterShadowEquipmentsProps = {
    equipments: iEquipmentInstance[];
    onEquipmentAdded(equipment: iEquipmentInstance): void;
    onEquipmentRemoved(equipment: iEquipmentInstance): void;
}

export const CharacterShadowEquipmentsView = ({
    equipments, onEquipmentAdded, onEquipmentRemoved
}: CharacterShadowEquipmentsProps) => {
    const newEquipChangeHandler = (location: ItemLocations) => {
        return (item?: iEquipmentInstance) => {
            if (item == null) {
                const removedEquip = equipments.find(e => (e.sourceLocation & location) != 0)
                if (removedEquip) onEquipmentRemoved(removedEquip);
                return
            }
            equipments.filter(e => (e.location & item.location) !== 0).forEach(e => onEquipmentRemoved(e))
            onEquipmentAdded(item);
        };
    }

    const equipmentsMap: {[k in ItemLocations]?: iEquipmentInstance} = {};
    equipments.forEach(e => {
        equipmentsMap[e.location] = e;
    })

    const findEquipment = (location: ItemLocations) => {
        return equipments.find(e => (e.location & location) != 0);
    }


    return (
        <div className="flex flex-row flex-wrap p-2 mt-1">
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Luva Sombria"
                    allowedTypes={[ItemTypes.ShadowEquipment]}
                    allowedSubTypes={[ShadowEquipmentSubTypes.ShadowWeapon]}
                    location={ItemLocations.RightHand}
                    enabled={(findEquipment(ItemLocations.RightHand)?.sourceLocation || ItemLocations.RightHand) === ItemLocations.RightHand}
                    equippedItem={findEquipment(ItemLocations.RightHand)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.RightHand)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.RightHand)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Escudo Sombrio"
                    allowedTypes={[ItemTypes.ShadowEquipment]}
                    allowedSubTypes={[ShadowEquipmentSubTypes.ShadowShield]}
                    location={ItemLocations.LeftHand}
                    enabled={(findEquipment(ItemLocations.LeftHand)?.sourceLocation || ItemLocations.LeftHand) === ItemLocations.LeftHand}
                    equippedItem={findEquipment(ItemLocations.LeftHand)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.LeftHand)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.LeftHand)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Armadura Sombria"
                    allowedTypes={[ItemTypes.ShadowEquipment]}
                    allowedSubTypes={[ShadowEquipmentSubTypes.ShadowArmor]}
                    location={ItemLocations.Armor}
                    enabled={(findEquipment(ItemLocations.Armor)?.sourceLocation || ItemLocations.Armor) === ItemLocations.Armor}
                    equippedItem={findEquipment(ItemLocations.Armor)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.Armor)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.Armor)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Botas Sombrias"
                    allowedTypes={[ItemTypes.ShadowEquipment]}
                    allowedSubTypes={[ShadowEquipmentSubTypes.ShadowShoes]}
                    location={ItemLocations.Shoes}
                    enabled={(findEquipment(ItemLocations.Shoes)?.sourceLocation || ItemLocations.Shoes) === ItemLocations.Shoes}
                    equippedItem={findEquipment(ItemLocations.Shoes)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.Shoes)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.Shoes)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Brinco Sombrio"
                    allowedTypes={[ItemTypes.ShadowEquipment]}
                    allowedSubTypes={[ShadowEquipmentSubTypes.ShadowRightAcessory]}
                    location={ItemLocations.RightAccessory}
                    enabled={(findEquipment(ItemLocations.RightAccessory)?.sourceLocation || ItemLocations.RightAccessory) === ItemLocations.RightAccessory}
                    equippedItem={findEquipment(ItemLocations.RightAccessory)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.RightAccessory)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.RightAccessory)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Colar Sombrio"
                    allowedTypes={[ItemTypes.ShadowEquipment]}
                    allowedSubTypes={[ShadowEquipmentSubTypes.ShadowLeftAccessory]}
                    location={ItemLocations.LeftAccessory}
                    enabled={(findEquipment(ItemLocations.LeftAccessory)?.sourceLocation || ItemLocations.LeftAccessory) === ItemLocations.LeftAccessory}
                    equippedItem={findEquipment(ItemLocations.LeftAccessory)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.LeftAccessory)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.LeftAccessory)}
                />
            </div>
        </div>
    )
}
