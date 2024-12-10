'use client'

import CharacterEquipmentCard from "@/components/CharacterEquipmentCard";
import { CharacterEquipments } from "@/types";
import { useState } from "react";



export default function Home() {
  const [equipments, setEquipments] = useState<CharacterEquipments>({});

  return (
    <div className="flex flex-row flex-wrap lg:max-w-[75%]">
      <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
        <CharacterEquipmentCard
          title="Topo"
          equippedItem={equipments.top}
          onItemChanged={(item) => setEquipments({...equipments, top: item})}
          onItemRemoved={() => setEquipments({...equipments, top: undefined})}
        />
      </div>
      <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
        <CharacterEquipmentCard
          title="Meio"
          equippedItem={equipments.mid}
          onItemChanged={(item) => setEquipments({...equipments, mid: item})}
          onItemRemoved={() => setEquipments({...equipments, mid: undefined})}
        />
      </div>
      <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
        <CharacterEquipmentCard
          title="Baixo"
          equippedItem={equipments.bottom}
          onItemChanged={(item) => setEquipments({...equipments, bottom: item})}
          onItemRemoved={() => setEquipments({...equipments, bottom: undefined})}
        />
      </div>
      <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
        <CharacterEquipmentCard
          title="Mão Direita"
          equippedItem={equipments.rightHand}
          onItemChanged={(item) => setEquipments({...equipments, rightHand: item})}
          onItemRemoved={() => setEquipments({...equipments, rightHand: undefined})}
        />
      </div>
      <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
        <CharacterEquipmentCard
          title="Mão Esquerda"
          equippedItem={equipments.leftHand}
          onItemChanged={(item) => setEquipments({...equipments, leftHand: item})}
          onItemRemoved={() => setEquipments({...equipments, leftHand: undefined})}
        />
      </div>
      <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
        <CharacterEquipmentCard
          title="Armadura"
          equippedItem={equipments.armor}
          onItemChanged={(item) => setEquipments({...equipments, armor: item})}
          onItemRemoved={() => setEquipments({...equipments, armor: undefined})}
        />
      </div>
      <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
        <CharacterEquipmentCard
          title="Capa"
          equippedItem={equipments.cloack}
          onItemChanged={(item) => setEquipments({...equipments, cloack: item})}
          onItemRemoved={() => setEquipments({...equipments, cloack: undefined})}
        />
      </div>
      <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
        <CharacterEquipmentCard
          title="Botas"
          equippedItem={equipments.shoes}
          onItemChanged={(item) => setEquipments({...equipments, shoes: item})}
          onItemRemoved={() => setEquipments({...equipments, shoes: undefined})}
        />
      </div>
      <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
        <CharacterEquipmentCard
          title="Accessório Direito"
          equippedItem={equipments.leftAccessory}
          onItemChanged={(item) => setEquipments({...equipments, leftAccessory: item})}
          onItemRemoved={() => setEquipments({...equipments, leftAccessory: undefined})}
        />
      </div>
      <div className="flex-grow basis-full md:basis-1/2 lg:basis-1/3">
        <CharacterEquipmentCard
          title="Acessório Esquerdo"
          equippedItem={equipments.rightAccessory}
          onItemChanged={(item) => setEquipments({...equipments, rightAccessory: item})}
          onItemRemoved={() => setEquipments({...equipments, rightAccessory: undefined})}
        />
      </div>
    </div>

  );
}
