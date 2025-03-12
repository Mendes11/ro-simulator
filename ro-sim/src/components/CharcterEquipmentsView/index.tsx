import { AllWeaponSubTypes, EquipmentSubTypes, ItemLocations, ItemSubTypes, ItemTypes } from "@/types/equipment";
import { iEquipmentInstance } from "@/types/equipmentInstance";
import CharacterEquipmentCard from "../CharacterEquipmentCard";

type CharacterEquipmentsProps = {
    equipments: iEquipmentInstance[];
    onEquipmentAdded(equipment: iEquipmentInstance): void;
    onEquipmentRemoved(equipment: iEquipmentInstance): void;
    // onEquipmentsChanged(equipments: CharacterEquipsType): void;
    // onEquipmentChanged(position: keyof CharacterEquipsType, item?: iEquipmentInstance): void;
}

export const CharacterEquipmentsView = ({
    equipments, onEquipmentAdded, onEquipmentRemoved
}: CharacterEquipmentsProps) => {
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
                    title="Topo"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Headgear]}
                    location={ItemLocations.HeadUpper}
                    enabled={(findEquipment(ItemLocations.HeadUpper)?.sourceLocation || ItemLocations.HeadUpper) === ItemLocations.HeadUpper}
                    equippedItem={findEquipment(ItemLocations.HeadUpper)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.HeadUpper)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.HeadUpper)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Meio"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Headgear]}
                    location={ItemLocations.HeadMid}
                    enabled={(findEquipment(ItemLocations.HeadMid)?.sourceLocation || ItemLocations.HeadMid) === ItemLocations.HeadMid}
                    equippedItem={findEquipment(ItemLocations.HeadMid)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.HeadMid)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.HeadMid)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Baixo"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Headgear]}
                    location={ItemLocations.HeadBottom}
                    enabled={(findEquipment(ItemLocations.HeadBottom)?.sourceLocation || ItemLocations.HeadBottom) === ItemLocations.HeadBottom}
                    equippedItem={findEquipment(ItemLocations.HeadBottom)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.HeadBottom)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.HeadBottom)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Mão Direita"
                    allowedTypes={[ItemTypes.Weapon]}
                    allowedSubTypes={AllWeaponSubTypes}
                    location={ItemLocations.RightHand}
                    enabled={(findEquipment(ItemLocations.RightHand)?.sourceLocation || ItemLocations.RightHand) === ItemLocations.RightHand}
                    equippedItem={findEquipment(ItemLocations.RightHand)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.RightHand)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.RightHand)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Mão Esquerda"
                    allowedTypes={[ItemTypes.Armor, ItemTypes.Weapon]}
                    allowedSubTypes={(AllWeaponSubTypes as ItemSubTypes[]).concat([EquipmentSubTypes.Shield])}
                    location={ItemLocations.LeftHand}
                    enabled={(findEquipment(ItemLocations.LeftHand)?.sourceLocation || ItemLocations.LeftHand) === ItemLocations.LeftHand}
                    equippedItem={findEquipment(ItemLocations.LeftHand)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.LeftHand)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.LeftHand)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Armadura"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Armor]}
                    location={ItemLocations.Armor}
                    enabled={(findEquipment(ItemLocations.Armor)?.sourceLocation || ItemLocations.Armor) === ItemLocations.Armor}
                    equippedItem={findEquipment(ItemLocations.Armor)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.Armor)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.Armor)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Capa"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Garment]}
                    location={ItemLocations.Garment}
                    enabled={(findEquipment(ItemLocations.Garment)?.sourceLocation || ItemLocations.Garment) === ItemLocations.Garment}
                    equippedItem={findEquipment(ItemLocations.Garment)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.Garment)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.Garment)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Botas"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Shoes]}
                    location={ItemLocations.Shoes}
                    enabled={(findEquipment(ItemLocations.Shoes)?.sourceLocation || ItemLocations.Shoes) === ItemLocations.Shoes}
                    equippedItem={findEquipment(ItemLocations.Shoes)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.Shoes)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.Shoes)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Accessório Direito"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.AccessoryRight, EquipmentSubTypes.Accessory]}
                    location={ItemLocations.RightAccessory}
                    enabled={(findEquipment(ItemLocations.RightAccessory)?.sourceLocation || ItemLocations.RightAccessory) === ItemLocations.RightAccessory}
                    equippedItem={findEquipment(ItemLocations.RightAccessory)}
                    onItemChanged={newEquipChangeHandler(ItemLocations.RightAccessory)}
                    onItemRemoved={newEquipChangeHandler(ItemLocations.RightAccessory)}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Acessório Esquerdo"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.AccessoryLeft, EquipmentSubTypes.Accessory]}
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
