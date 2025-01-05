'use client'

import CharacterEquipmentCard from "@/components/CharacterEquipmentCard";
import { iCharacterEquipments } from "@/types/character";
import { AllWeaponSubTypes, EquipmentLocations, EquipmentSubTypes, EquipmentTypes } from "@/types/equipment";
import { useState } from "react";



export default function Home() {
  const [equipments, setEquipments] = useState<iCharacterEquipments>({});

  return (
    <div className="flex flex-row flex-wrap">
      <div className="basis-full lg:basis-2/3 p-1">
        <div className="text-lg border-b-2 border-black">
          Atributos
        </div>
        <div className="border min-h-24 p-2 mt-1">
          <div className="w-24 border">
            <div className="w-auto">
              <label className="float-left">For: </label>
              <select className="overflow-hidden">
              {[...Array(130).keys()].map((i) => (
                <option key={i} value={i+1}>{i+1}</option>
              ))}
              </select>
            </div>
            <div className="">
              <label>Agi: </label>
              <select>
              {[...Array(130).keys()].map((i) => (
                <option key={i} value={i+1}>{i+1}</option>
              ))}
              </select>
            </div>
            <div className="">
              <label>Vit: </label>
              <select>
              {[...Array(130).keys()].map((i) => (
                <option key={i} value={i+1}>{i+1}</option>
              ))}
              </select>
            </div>
            <div className="w-auto">
              <label className="left-0">Int: </label>
              <select className="ml-auto">
              {[...Array(130).keys()].map((i) => (
                <option key={i} value={i+1}>{i+1}</option>
              ))}
              </select>
            </div>
            <div className="">
              <label>Dex: </label>
              <select>
              {[...Array(130).keys()].map((i) => (
                <option key={i} value={i+1}>{i+1}</option>
              ))}
              </select>
            </div>
            <div className="">
              <label>Luk: </label>
              <select>
              {[...Array(130).keys()].map((i) => (
                <option key={i} value={i+1}>{i+1}</option>
              ))}
              </select>
            </div>
          </div>
        </div>
        <div className="text-lg border-b-2 border-black">
          Equipamentos
        </div>
        <div className="flex flex-row flex-wrap p-2 mt-1">
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Topo"
              type={EquipmentTypes.Armor}
              allowedSubTypes={[EquipmentSubTypes.Headgear]}
              allowedLocations={[EquipmentLocations.Upper]}
              equippedItem={equipments.top}
              onItemChanged={(item) => setEquipments({...equipments, top: item})}
              onItemRemoved={() => setEquipments({...equipments, top: undefined})}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Meio"
              type={EquipmentTypes.Armor}
              allowedSubTypes={[EquipmentSubTypes.Headgear]}
              allowedLocations={[EquipmentLocations.Mid]}
              equippedItem={equipments.mid}
              onItemChanged={(item) => setEquipments({...equipments, mid: item})}
              onItemRemoved={() => setEquipments({...equipments, mid: undefined})}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Baixo"
              type={EquipmentTypes.Armor}
              allowedSubTypes={[EquipmentSubTypes.Headgear]}
              allowedLocations={[EquipmentLocations.Bottom]}
              equippedItem={equipments.bottom}
              onItemChanged={(item) => setEquipments({...equipments, bottom: item})}
              onItemRemoved={() => setEquipments({...equipments, bottom: undefined})}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Mão Direita"
              type={EquipmentTypes.Weapon}
              allowedSubTypes={AllWeaponSubTypes}
              equippedItem={equipments.rightHand}
              onItemChanged={(item) => setEquipments({...equipments, rightHand: item})}
              onItemRemoved={() => setEquipments({...equipments, rightHand: undefined})}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Mão Esquerda"
              type={EquipmentTypes.Armor}
              allowedSubTypes={[EquipmentSubTypes.Shield]}
              equippedItem={equipments.leftHand}
              onItemChanged={(item) => setEquipments({...equipments, leftHand: item})}
              onItemRemoved={() => setEquipments({...equipments, leftHand: undefined})}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Armadura"
              type={EquipmentTypes.Armor}
              allowedSubTypes={[EquipmentSubTypes.Armor]}
              equippedItem={equipments.armor}
              onItemChanged={(item) => setEquipments({...equipments, armor: item})}
              onItemRemoved={() => setEquipments({...equipments, armor: undefined})}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Capa"
              type={EquipmentTypes.Armor}
              allowedSubTypes={[EquipmentSubTypes.Cloack]}
              equippedItem={equipments.cloack}
              onItemChanged={(item) => setEquipments({...equipments, cloack: item})}
              onItemRemoved={() => setEquipments({...equipments, cloack: undefined})}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Botas"
              type={EquipmentTypes.Armor}
              allowedSubTypes={[EquipmentSubTypes.Shoes]}
              equippedItem={equipments.shoes}
              onItemChanged={(item) => setEquipments({...equipments, shoes: item})}
              onItemRemoved={() => setEquipments({...equipments, shoes: undefined})}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Accessório Direito"
              type={EquipmentTypes.Armor}
              allowedSubTypes={[EquipmentSubTypes.Accessory, EquipmentSubTypes.AccessoryRight]}
              equippedItem={equipments.leftAccessory}
              onItemChanged={(item) => setEquipments({...equipments, leftAccessory: item})}
              onItemRemoved={() => setEquipments({...equipments, leftAccessory: undefined})}
            />
          </div>
          <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
            <CharacterEquipmentCard
              title="Acessório Esquerdo"
              type={EquipmentTypes.Armor}
              allowedSubTypes={[EquipmentSubTypes.Accessory, EquipmentSubTypes.AccessoryLeft]}
              equippedItem={equipments.rightAccessory}
              onItemChanged={(item) => setEquipments({...equipments, rightAccessory: item})}
              onItemRemoved={() => setEquipments({...equipments, rightAccessory: undefined})}
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
              <option value="basic">
                Dummy
              </option>
            </select>
          </div>
          <div>
            <ul className="mt-1 font-bold">
              <li>Dano Habilidade = 0.0</li>
              <li>Dano Habilidade (Crit) = 0.0</li>
            </ul>
          </div>
          <div className="mt-3">
            <p className="border-b border-black mb-2 font-bold">Informações Adicionais</p>
            <ul className="ml-2">
              <li>ATK = 0.0</li>
              <li>Dano Base Corpo a Corpo = 0.0</li>
              <li>Dano Base Corpo a Corpo (Crit) = 0.0</li>
              <li>Dano Base Distância (Crit) = 0.0</li>
              <p className="mt-2 inline-block border-b border-black mb-2">{"Multiplicadores"}</p>
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
