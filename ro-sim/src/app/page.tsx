"use client";


import { CharacterBaseStatsView } from "@/components/CharacterBaseStatsView";
import { CharacterEquipmentsView } from "@/components/CharcterEquipmentsView";
import { SimulationView } from "@/components/SimulationView";
import { mockCharSummary } from "@/contants";
import { Assassin } from "@/engine/jobs/assassin";
import { SimulationSummary } from "@/engine/simulation";
import { CharacterData } from "@/types/character";
import { useState } from "react";


const defaultCharacter: CharacterData = {
    level: 1,
    job: Assassin,
    baseAttrs: {
        agi: 1,
        dex: 1,
        str: 1,
        int: 1,
        luk: 1,
        vit: 1,
    },
    equipments: {}
}

export default function Home() {
  // TODO: Store/Load character Data from Browser Storage.
//   const [equipments, setEquipments] = useState<CharacterEquipments>({});
  const [character, setCharacter] = useState<CharacterData>(defaultCharacter)


  console.log("Home Equipments:");
  console.log(character.equipments);
  return (
    <div className="flex flex-row flex-wrap">
      <div className="basis-full lg:basis-2/3 p-1">
        <div className="text-lg border-b-2 border-black">Atributos</div>
        <CharacterBaseStatsView
            level={character.level}
            attributes={character.baseAttrs}
            job={character.job}
            onJobChanged={(j) => setCharacter({...character, job: j})}
            onLevelChanged={(l) => setCharacter({...character, level: l})}
            onAttributesChanged={(attrs) => setCharacter({...character, baseAttrs: attrs})}
        />
        <div className="text-lg border-b-2 border-black">Equipamentos</div>
        <CharacterEquipmentsView
            equipments={character.equipments}
            onEquipmentsChanged={(equipments) => setCharacter({...character, equipments: equipments})}
        />
      </div>
      <div className="w-auto basis-full lg:basis-1/3 p-1">
        <div className="text-lg border-b-2 border-black mb-1">
          <p>Simulação</p>
        </div>
        <SimulationView
          character={character}
        />

      </div>
    </div>
  );
}
