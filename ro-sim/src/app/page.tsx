"use client";
import { CharacterBaseStatsView } from "@/components/CharacterBaseStatsView";
import { CharacterEquipmentsView } from "@/components/CharcterEquipmentsView";
import { SimulationView } from "@/components/SimulationView";
import { Attributes } from "@/engine/attributes";
import { Character } from "@/engine/character";
import { Novice } from "@/engine/jobs/novice";
import { AttributesData } from "@/engine/types/attributes";
import { iEquipmentInstance } from "@/engine/types/equipmentInstance";
import { Job } from "@/engine/types/jobs";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { CharacterShadowEquipmentsView } from "@/components/CharcterShadowEquipmentsView";

const tabs = [
    { id: "equipment", name: 'Equipamentos', href: '#equipment' },
    { id: "shadow", name: 'Eqp. Sombrios', href: '#shadow' },
    { id: "skills", name: 'Skills', href: '#skills' },
    { id: "extra", name: 'Extra', href: '#extra' },
  ]

function classNames(...classes: string[]) {
return classes.filter(Boolean).join(' ')
}

export default function Home() {
  // TODO: Store/Load character Data from Browser Storage.
  const [level, setLevel] = useState<number>(1);
  const [job, setJob] = useState<Job>(Novice);
  const [equipments, setEquipments] = useState<iEquipmentInstance[]>([]);
  const [shadowEquipments, setShadowEquipments] = useState<iEquipmentInstance[]>([]);
  const [charAttributes, setCharAttributes] = useState<AttributesData>(Attributes.NewCharacterAttrs());
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].id);

  useEffect(() => {
    if (window.location.hash) {
      setSelectedTab(window.location.hash.substring(1));
    } else {
      setSelectedTab(tabs[0].id);
    }
  }, []);
  const onEquipmentAdded = (e: iEquipmentInstance) => {
    setEquipments([...equipments, e]);
  }

  const onShadowEquipmentAdded = (e: iEquipmentInstance) => {
    setShadowEquipments([...shadowEquipments, e]);
  }

  const onEquipmentRemoved = (e: iEquipmentInstance) => {
    const idx = equipments.indexOf(e);
    equipments.splice(idx, 1);
    setEquipments(equipments);
  }

  const onShadowEquipmentRemoved = (e: iEquipmentInstance) => {
    const idx = shadowEquipments.indexOf(e);
    shadowEquipments.splice(idx, 1);
    setShadowEquipments(shadowEquipments);
  }

  const onTabSelected = (tab: string) => {
    setSelectedTab(tab);
    window.location.hash = tab;
  }

  console.log("Main Page");
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

        <div className="grid grid-cols-1 sm:hidden">
            <select
            defaultValue={selectedTab}
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            >
                {tabs.map((tab) => (
                    <option key={tab.id}>{tab.name}</option>
                ))}
            </select>
            <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
            />
        </div>
        <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabSelected(tab.id)}
                aria-current={tab.id === selectedTab ? 'page' : undefined}
                className={classNames(
                  tab.id === selectedTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap',
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
            {selectedTab === "equipment" && (
            <CharacterEquipmentsView
                equipments={equipments}
                onEquipmentAdded={onEquipmentAdded}
                onEquipmentRemoved={onEquipmentRemoved}
            />
            )
            }
            {selectedTab === "shadow" && (
            <CharacterShadowEquipmentsView
                equipments={equipments}
                onEquipmentAdded={onShadowEquipmentAdded}
                onEquipmentRemoved={onShadowEquipmentRemoved}
            />
            )}
        </div>
      </div>

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
