"use client";


import { CharacterBaseStatsView } from "@/components/CharacterBaseStatsView";
import { CharacterEquipmentsView } from "@/components/CharcterEquipmentsView";
import { SimulationView } from "@/components/SimulationView";
import { Attributes } from "@/engine/attributes";
import { Character } from "@/engine/character";
import { Novice } from "@/engine/jobs/novice";
import { AttributesData } from "@/types/attributes";
import { iEquipmentInstance } from "@/types/equipmentInstance";
import { Job } from "@/types/jobs";
import { useState } from "react";


export default function Home() {
  // TODO: Store/Load character Data from Browser Storage.
  const [level, setLevel] = useState<number>(1);
  const [job, setJob] = useState<Job>(Novice);
  const [equipments, setEquipments] = useState<iEquipmentInstance[]>([]);
  const [charAttributes, setCharAttributes] = useState<AttributesData>(Attributes.NewCharacterAttrs());
  
  const onEquipmentAdded = (e: iEquipmentInstance) => {
    setEquipments([...equipments, e]);
  }

  const onEquipmentRemoved = (e: iEquipmentInstance) => {
    const idx = equipments.indexOf(e);
    equipments.splice(idx, 1);
    setEquipments(equipments);
  }
  console.log("page");  

  return (
    <div className="flex flex-row flex-wrap">
      <div className="basis-full lg:basis-2/3 p-1">
        <div className="text-lg border-b-2 border-black">Atributos</div>
        <CharacterBaseStatsView
            level={level}
            attributes={charAttributes}
            job={job}
            onJobChanged={setJob}
            onLevelChanged={setLevel}
            onAttributesChanged={setCharAttributes}
        />
        <div className="text-lg border-b-2 border-black">Equipamentos</div>
        <CharacterEquipmentsView
            equipments={equipments}
            onEquipmentAdded={onEquipmentAdded}
            onEquipmentRemoved={onEquipmentRemoved}
        />
      </div>
      <div className="w-auto basis-full lg:basis-1/3 p-1">
        <div className="text-lg border-b-2 border-black mb-1">
          <p>Simulação</p>
        </div>
        <SimulationView
          character={new Character({
            baseAttrs: charAttributes,
            equipments: equipments,
            level: level,
            job: job,
          })}
        />

      </div>
    </div>
  );
}
