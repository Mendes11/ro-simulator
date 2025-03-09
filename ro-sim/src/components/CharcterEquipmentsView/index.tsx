import { CharacterEquipments as CharacterEquipsType } from "@/types/character"
import { AllWeaponSubTypes, EquipmentSubTypes, ItemLocations, ItemSubTypes, ItemTypes } from "@/types/equipment";
import { iEquipmentInstance } from "@/types/equipmentInstance";
import { PositionsState } from "./positionsState";
import CharacterEquipmentCard from "../CharacterEquipmentCard";

type CharacterEquipmentsProps = {
    equipments: CharacterEquipsType;
    onEquipmentsChanged(equipments: CharacterEquipsType): void;
    // onEquipmentChanged(position: keyof CharacterEquipsType, item?: iEquipmentInstance): void;
}

export const CharacterEquipmentsView = ({
    equipments, onEquipmentsChanged
}: CharacterEquipmentsProps) => {
    // This variable controls what we display, and the components rules
    const positionsState: PositionsState = {
        top: {
          inUseByPosition: undefined,
          allowedSubTypes: [EquipmentSubTypes.Headgear],
          location: ItemLocations.HeadUpper,
        },
        mid: {
          inUseByPosition: undefined,
          allowedSubTypes: [EquipmentSubTypes.Headgear],
          location: ItemLocations.HeadMid,
        },
        bottom: {
          inUseByPosition: undefined,
          allowedSubTypes: [EquipmentSubTypes.Headgear],
          location: ItemLocations.HeadBottom,
        },
        armor: {
          inUseByPosition: undefined,
          allowedSubTypes: [EquipmentSubTypes.Armor],
          location: ItemLocations.Armor,
        },
        rightHand: {
          inUseByPosition: undefined,
          allowedSubTypes: AllWeaponSubTypes,
          location: ItemLocations.RightHand,
        },
        leftHand: {
          inUseByPosition: undefined,
          allowedSubTypes: (AllWeaponSubTypes as ItemSubTypes[]).concat([
            EquipmentSubTypes.Shield,
          ]),
          location: ItemLocations.LeftHand,
        },
        garment: {
          inUseByPosition: undefined,
          allowedSubTypes: [EquipmentSubTypes.Garment],
          location: ItemLocations.Garment,
        },
        shoes: {
          inUseByPosition: undefined,
          allowedSubTypes: [EquipmentSubTypes.Shoes],
          location: ItemLocations.Shoes,
        },
        rightAccessory: {
          inUseByPosition: undefined,
          allowedSubTypes: [
            EquipmentSubTypes.AccessoryRight,
            EquipmentSubTypes.Accessory,
          ],
          location: ItemLocations.RightAccessory,
        },
        leftAccessory: {
          inUseByPosition: undefined,
          allowedSubTypes: [
            EquipmentSubTypes.AccessoryLeft,
            EquipmentSubTypes.Accessory,
          ],
          location: ItemLocations.LeftAccessory,
        },
    };

    const positionsUsedByItem = (position: keyof CharacterEquipsType, item: iEquipmentInstance) => {
        const positionState = positionsState[position];
        return Object.keys(positionsState)
            .filter(p => p !== position)
            .filter(otherPosition => {
                const otherPositionState = positionsState[otherPosition as keyof CharacterEquipsType];
                return item.equipment.allowedLocations?.some(l => l & positionState.location && l & otherPositionState.location);
        })
    };

    function newEquipChangeHandler(position: keyof PositionsState) {
        return (item?: iEquipmentInstance) => {
            const equips = {...equipments};
            equips[position] = item

            if (item != null) {
                // Unnequip positions used by current item
                positionsUsedByItem(position, item).forEach(p => {
                    // onEquipmentChanged(p as keyof CharacterEquipsType, undefined);
                    equips[p as keyof CharacterEquipsType] = undefined;
                });
            }
            onEquipmentsChanged(equips);
        };
    }

    Object.keys(positionsState).forEach(position => {
        const positionState = positionsState[position as keyof CharacterEquipsType];
        const positionEquipment = equipments[position as keyof CharacterEquipsType];

        if (positionState.inUseByPosition) {
            // Ensure that it's still getting used, unset otherwise.
            const otherPositionEquip = equipments[positionState.inUseByPosition as keyof CharacterEquipsType]?.equipment;
            const otherPositionState = positionsState[positionState.inUseByPosition as keyof CharacterEquipsType];

            if (otherPositionEquip == null || !(otherPositionEquip.allowedLocations?.some(l => l & positionState.location && l & otherPositionState.location))) {
                positionState.inUseByPosition = undefined;
            }
        }

        if (positionEquipment) {
            positionsUsedByItem(position as keyof CharacterEquipsType, positionEquipment).forEach(otherPosition => {
                positionsState[otherPosition as keyof CharacterEquipsType].inUseByPosition = position as keyof CharacterEquipsType;
            });
        }
    });
    // setPositionsState(positionsState);

    return (
        <div className="flex flex-row flex-wrap p-2 mt-1">
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Topo"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={positionsState.top.allowedSubTypes}
                    allowedLocations={[positionsState.top.location]}
                    enabled={positionsState.top.inUseByPosition == null}
                    equippedItem={positionsState.top.inUseByPosition ? equipments[positionsState.top.inUseByPosition] : equipments.top}
                    onItemChanged={newEquipChangeHandler("top")}
                    onItemRemoved={newEquipChangeHandler("top")}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Meio"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Headgear]}
                    allowedLocations={[ItemLocations.HeadMid]}
                    enabled={positionsState.mid.inUseByPosition == null}
                    equippedItem={positionsState.mid.inUseByPosition ? equipments[positionsState.mid.inUseByPosition] : equipments.mid}
                    onItemChanged={newEquipChangeHandler("mid")}
                    onItemRemoved={newEquipChangeHandler("mid")}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Baixo"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Headgear]}
                    allowedLocations={[ItemLocations.HeadBottom]}
                    enabled={positionsState.bottom.inUseByPosition == null}
                    equippedItem={positionsState.bottom.inUseByPosition ? equipments[positionsState.bottom.inUseByPosition] : equipments.bottom}
                    onItemChanged={newEquipChangeHandler("bottom")}
                    onItemRemoved={newEquipChangeHandler("bottom")}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Mão Direita"
                    allowedTypes={[ItemTypes.Weapon]}
                    allowedSubTypes={AllWeaponSubTypes}
                    allowedLocations={[ItemLocations.RightHand]}
                    enabled={positionsState.rightHand.inUseByPosition == null}
                    equippedItem={positionsState.rightHand.inUseByPosition ? equipments[positionsState.rightHand.inUseByPosition] : equipments.rightHand}
                    onItemChanged={newEquipChangeHandler("rightHand")}
                    onItemRemoved={newEquipChangeHandler("rightHand")}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Mão Esquerda"
                    allowedTypes={[ItemTypes.Armor, ItemTypes.Weapon]}
                    allowedSubTypes={(AllWeaponSubTypes as ItemSubTypes[]).concat([EquipmentSubTypes.Shield])}
                    allowedLocations={[ItemLocations.LeftHand]}
                    enabled={positionsState.leftHand.inUseByPosition == null}
                    equippedItem={positionsState.leftHand.inUseByPosition ? equipments[positionsState.leftHand.inUseByPosition] : equipments.leftHand}
                    onItemChanged={newEquipChangeHandler("leftHand")}
                    onItemRemoved={newEquipChangeHandler("leftHand")}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Armadura"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Armor]}
                    allowedLocations={[ItemLocations.Armor]}
                    enabled={positionsState.armor.inUseByPosition == null}
                    equippedItem={positionsState.armor.inUseByPosition ? equipments[positionsState.armor.inUseByPosition] : equipments.armor}
                    onItemChanged={newEquipChangeHandler("armor")}
                    onItemRemoved={newEquipChangeHandler("armor")}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Capa"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Garment]}
                    allowedLocations={[ItemLocations.Garment]}
                    enabled={positionsState.garment.inUseByPosition == null}
                    equippedItem={positionsState.garment.inUseByPosition ? equipments[positionsState.garment.inUseByPosition] : equipments.garment}
                    onItemChanged={newEquipChangeHandler("garment")}
                    onItemRemoved={newEquipChangeHandler("garment")}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Botas"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.Shoes]}
                    allowedLocations={[ItemLocations.Shoes]}
                    enabled={positionsState.shoes.inUseByPosition == null}
                    equippedItem={positionsState.shoes.inUseByPosition ? equipments[positionsState.shoes.inUseByPosition] : equipments.shoes}
                    onItemChanged={newEquipChangeHandler("shoes")}
                    onItemRemoved={newEquipChangeHandler("shoes")}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Accessório Direito"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.AccessoryRight, EquipmentSubTypes.Accessory]}
                    allowedLocations={[ItemLocations.RightAccessory]}
                    enabled={positionsState.rightAccessory.inUseByPosition == null}
                    equippedItem={positionsState.rightAccessory.inUseByPosition ? equipments[positionsState.rightAccessory.inUseByPosition] : equipments.rightAccessory}
                    onItemChanged={newEquipChangeHandler("rightAccessory")}
                    onItemRemoved={newEquipChangeHandler("rightAccessory")}
                />
            </div>
            <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
                <CharacterEquipmentCard
                    title="Acessório Esquerdo"
                    allowedTypes={[ItemTypes.Armor]}
                    allowedSubTypes={[EquipmentSubTypes.AccessoryLeft, EquipmentSubTypes.Accessory]}
                    allowedLocations={[ItemLocations.LeftAccessory]}
                    enabled={positionsState.leftAccessory.inUseByPosition == null}
                    equippedItem={positionsState.leftAccessory.inUseByPosition ? equipments[positionsState.leftAccessory.inUseByPosition] : equipments.leftAccessory}
                    onItemChanged={newEquipChangeHandler("leftAccessory")}
                    onItemRemoved={newEquipChangeHandler("leftAccessory")}
                />
            </div>
        </div>
    )
}
