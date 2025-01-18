"use client";

import CharacterEquipmentCard from "@/components/CharacterEquipmentCard";
import { CharacterData } from "@/types/character";
import {
  AllWeaponSubTypes,
  EquipmentSubTypes,
  ItemLocations,
  ItemSubTypes,
  ItemTypes,
} from "@/types/equipment";
import { iEquipmentInstance } from "@/types/equipmentInstance";
import { useEffect, useState } from "react";

type EquipmentState = {
  equipment?: iEquipmentInstance;
  enabled: boolean;
  disabledBy?: keyof EquipmentStates;
  allowedSubTypes: ItemSubTypes[];
  location: ItemLocations;
}

type EquipmentStates = {
  top: EquipmentState;
  mid: EquipmentState;
  bottom: EquipmentState;
  armor: EquipmentState;
  rightHand: EquipmentState;
  leftHand: EquipmentState;
  garment: EquipmentState;
  shoes: EquipmentState;
  rightAccessory: EquipmentState;
  leftAccessory: EquipmentState;
}

const defaultStates: EquipmentStates = {
  top: {
    enabled: true,
    allowedSubTypes: [EquipmentSubTypes.Headgear],
    location: ItemLocations.HeadUpper,
  },
  mid: {
    enabled: true,
    allowedSubTypes: [EquipmentSubTypes.Headgear],
    location: ItemLocations.HeadMid,
  },
  bottom: {
    enabled: true,
    allowedSubTypes: [EquipmentSubTypes.Headgear],
    location: ItemLocations.HeadBottom,
  },
  armor: {
    enabled: true,
    allowedSubTypes: [EquipmentSubTypes.Armor],
    location: ItemLocations.Armor,
  },
  rightHand: {
    enabled: true,
    allowedSubTypes: AllWeaponSubTypes,
    location: ItemLocations.RightHand,
  },
  leftHand: {
    enabled: true,
    allowedSubTypes: (AllWeaponSubTypes as ItemSubTypes[]).concat([
      EquipmentSubTypes.Shield,
    ]),
    location: ItemLocations.LeftHand,
  },
  garment: {
    enabled: true,
    allowedSubTypes: [EquipmentSubTypes.Garment],
    location: ItemLocations.Garment,
  },
  shoes: {
    enabled: true,
    allowedSubTypes: [EquipmentSubTypes.Shoes],
    location: ItemLocations.Shoes,
  },
  rightAccessory: {
    enabled: true,
    allowedSubTypes: [
      EquipmentSubTypes.AccessoryRight,
      EquipmentSubTypes.Accessory,
    ],
    location: ItemLocations.RightAccessory,
  },
  leftAccessory: {
    enabled: true,
    allowedSubTypes: [
      EquipmentSubTypes.AccessoryLeft,
      EquipmentSubTypes.Accessory,
    ],
    location: ItemLocations.LeftAccessory,
  },
};

const defaultCharacter: CharacterData = {
    level: 1,
    baseAttrs: {
        agi: 1,
        dex: 1,
        for: 1,
        int: 1,
        luck: 1,
        vit: 1,
    },
    equipments: {}
}

export default function Home() {
  // TODO: Store/Load character Data from Browser Storage.

  const [equipments, setEquipments] = useState<EquipmentStates>(defaultStates);
  const [character, setCharacter] = useState<CharacterData>(defaultCharacter)

  function newEquipChangeHandler(position: keyof EquipmentStates) {
    return (item?: iEquipmentInstance) => {
      setEquipments({
        ...equipments,
        [position]: { ...equipments[position], equipment: item },
      });
      setCharacter({...character, equipments: {...character.equipments, [position]: item}});
    };
  }

  // Enabed/Disabled state Control based on equipment placement
  useEffect(() => {
    Object.keys(equipments).forEach((position) => {
      const state = equipments[position as keyof EquipmentStates];
      const equipInstance = state.equipment;

      if (equipInstance != null && state.enabled) {
        Object.keys(equipments)
          .filter((k) => k !== position)
          .forEach((otherPosition) => {
            const otherState =
              equipments[otherPosition as keyof EquipmentStates];
            if (
              equipInstance.equipment.allowedLocations?.some(
                (l) => l & state.location && l & otherState.location
              )
            ) {
              if (
                otherState.enabled ||
                otherState.equipment !== equipInstance
              ) {
                setEquipments({
                  ...equipments,
                  [otherPosition]: {
                    ...otherState,
                    enabled: false,
                    equipment: equipInstance,
                    disabledBy: position,
                  },
                });
              }
            }
          });
      }

      // Disabled equipments must be re-enabled if the slot that disabled them isn't blocking anymore.
      if (
        !state.enabled &&
        equipments[state.disabledBy!].equipment !== equipInstance
      ) {
        setEquipments({
          ...equipments,
          [position as keyof EquipmentStates]: {
            ...state,
            equipment: undefined,
            enabled: true,
            disabledBy: undefined,
          },
        });
      }
    });
  }, [equipments]);

  return (
    <div className="flex flex-row flex-wrap">
      <div className="basis-full lg:basis-2/3 p-1">
        <div className="text-lg border-b-2 border-black">Atributos</div>
        <div className="border min-h-24 p-2 mt-1">
          <div className="w-24 border">
            <div className="w-auto">
              <label className="float-left">For: </label>
              <select className="overflow-hidden">
                {[...Array(130).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label>Agi: </label>
              <select>
                {[...Array(130).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label>Vit: </label>
              <select>
                {[...Array(130).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-auto">
              <label className="left-0">Int: </label>
              <select className="ml-auto">
                {[...Array(130).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label>Dex: </label>
              <select>
                {[...Array(130).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label>Luk: </label>
              <select>
                {[...Array(130).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="text-lg border-b-2 border-black">Equipamentos</div>
        <div className="flex flex-row flex-wrap p-2 mt-1">
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Topo"
              allowedTypes={[ItemTypes.Armor]}
              allowedSubTypes={equipments.top.allowedSubTypes}
              allowedLocations={[equipments.top.location]}
              enabled={equipments.top.enabled}
              equippedItem={equipments.top.equipment}
              onItemChanged={newEquipChangeHandler("top")}
              onItemRemoved={newEquipChangeHandler("top")}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Meio"
              allowedTypes={[ItemTypes.Armor]}
              allowedSubTypes={equipments.mid.allowedSubTypes}
              allowedLocations={[equipments.mid.location]}
              enabled={equipments.mid.enabled}
              equippedItem={equipments.mid.equipment}
              onItemChanged={newEquipChangeHandler("mid")}
              onItemRemoved={newEquipChangeHandler("mid")}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Baixo"
              allowedTypes={[ItemTypes.Armor]}
              allowedSubTypes={equipments.bottom.allowedSubTypes}
              allowedLocations={[equipments.bottom.location]}
              enabled={equipments.bottom.enabled}
              equippedItem={equipments.bottom.equipment}
              onItemChanged={newEquipChangeHandler("bottom")}
              onItemRemoved={newEquipChangeHandler("bottom")}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Mão Direita"
              allowedTypes={[ItemTypes.Weapon]}
              allowedSubTypes={equipments.rightHand.allowedSubTypes}
              allowedLocations={[equipments.rightHand.location]}
              enabled={equipments.rightHand.enabled}
              equippedItem={equipments.rightHand.equipment}
              onItemChanged={newEquipChangeHandler("rightHand")}
              onItemRemoved={newEquipChangeHandler("rightHand")}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Mão Esquerda"
              allowedTypes={[ItemTypes.Armor, ItemTypes.Weapon]}
              allowedSubTypes={equipments.leftHand.allowedSubTypes}
              allowedLocations={[equipments.leftHand.location]}
              enabled={equipments.leftHand.enabled}
              equippedItem={equipments.leftHand.equipment}
              onItemChanged={newEquipChangeHandler("leftHand")}
              onItemRemoved={newEquipChangeHandler("leftHand")}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Armadura"
              allowedTypes={[ItemTypes.Armor]}
              allowedSubTypes={equipments.armor.allowedSubTypes}
              allowedLocations={[equipments.armor.location]}
              enabled={equipments.armor.enabled}
              equippedItem={equipments.armor.equipment}
              onItemChanged={newEquipChangeHandler("armor")}
              onItemRemoved={newEquipChangeHandler("armor")}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Capa"
              allowedTypes={[ItemTypes.Armor]}
              allowedSubTypes={equipments.garment.allowedSubTypes}
              allowedLocations={[equipments.garment.location]}
              enabled={equipments.garment.enabled}
              equippedItem={equipments.garment.equipment}
              onItemChanged={newEquipChangeHandler("garment")}
              onItemRemoved={newEquipChangeHandler("garment")}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Botas"
              allowedTypes={[ItemTypes.Armor]}
              allowedSubTypes={equipments.shoes.allowedSubTypes}
              allowedLocations={[equipments.shoes.location]}
              enabled={equipments.shoes.enabled}
              equippedItem={equipments.shoes.equipment}
              onItemChanged={newEquipChangeHandler("shoes")}
              onItemRemoved={newEquipChangeHandler("shoes")}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Accessório Direito"
              allowedTypes={[ItemTypes.Armor]}
              allowedSubTypes={equipments.rightAccessory.allowedSubTypes}
              allowedLocations={[equipments.rightAccessory.location]}
              enabled={equipments.rightAccessory.enabled}
              equippedItem={equipments.rightAccessory.equipment}
              onItemChanged={newEquipChangeHandler("rightAccessory")}
              onItemRemoved={newEquipChangeHandler("rightAccessory")}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Acessório Esquerdo"
              allowedTypes={[ItemTypes.Armor]}
              allowedSubTypes={equipments.leftAccessory.allowedSubTypes}
              allowedLocations={[equipments.leftAccessory.location]}
              enabled={equipments.leftAccessory.enabled}
              equippedItem={equipments.leftAccessory.equipment}
              onItemChanged={newEquipChangeHandler("leftAccessory")}
              onItemRemoved={newEquipChangeHandler("leftAccessory")}
            />
          </div>
        </div>
      </div>
      <div className="w-auto basis-full lg:basis-1/3 p-1">
        <div className="text-lg border-b-2 border-black">
          <p>Simulação</p>
        </div>
        <div className="mt-1 p-2">
          <div>
            <label htmlFor="attackType">Habilidade: </label>
            <select className="border-2 rounded-md p-1" name="attackType">
              <option value="basic">Ataque Básico</option>
              <option value="ASC_BREAKER">SBK</option>
            </select>
          </div>
          <div>
            <label htmlFor="attackType">Oponente: </label>
            <select className="border-2 rounded-md p-1" name="attackType">
              <option value="basic">Dummy</option>
            </select>
          </div>
          <div>
            <ul className="mt-1 font-bold">
              <li>Dano Habilidade = 0.0</li>
              <li>Dano Habilidade (Crit) = 0.0</li>
            </ul>
          </div>
          <div className="mt-3">
            <p className="border-b border-black mb-2 font-bold">
              Informações Adicionais
            </p>
            <ul className="ml-2">
              <li>ATK = 0.0</li>
              <li>Dano Base Corpo a Corpo = 0.0</li>
              <li>Dano Base Corpo a Corpo (Crit) = 0.0</li>
              <li>Dano Base Distância (Crit) = 0.0</li>
              <p className="mt-2 inline-block border-b border-black mb-2">
                {"Multiplicadores"}
              </p>
              <li>%Raça = 0%</li>
              <li>%Tamanho = 0%</li>
              <li>%Elemento (Oponente) = 0%</li>
              <li>%Elemento (Ataque) = 0%</li>
              <li>%Dano Físico = 0%</li>
              <li>%Atq Arma = 0%</li>
              <li>%Dano F. Distância = 0%</li>
              <li>%Dano F. Corpo a Corpo = 0%</li>
              <li>%Multiplicadores (Grupo A) = 0%</li>
              <li>%Multiplicadores (Grupo B) = 0%</li>
              <li>%Dano Crítico = 0%</li>
              <li>%Habilidade = 0%</li>
              <li>Grupo A = 0</li>
              <li>Grupo B = 0</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
