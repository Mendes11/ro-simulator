import { SimulationSummary, SimulateResult } from "@/engine/simulation"
import { AttackTypes } from "@/engine/types/config";
import { iCharacter } from "@engine/types/character";
import { ElementTypes, RaceTypes } from "@/engine/types/enums";
import { SizeTypes } from "@/engine/types/enums";
import { iSkill, SkillTypes } from "@engine/types/skills";
import { iTarget } from "@engine/types/target";
import { TargetTypes } from "@/engine/types/enums";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
    character: iCharacter;
}

const DummyTarget: iTarget = {
  element: ElementTypes.Neutral,
  race: RaceTypes.Human,
  size: SizeTypes.Medium,
  type: TargetTypes.Boss,
  softDef: 65,
  hardDef: 0,
  softDefM: 65,
  hardDefM: 0,
  reductions: {
      race: 0,
      size: 0,
      attackElement: 0,
      targetElement: 0,
      default: 0,
      range: 0,
  }
}

export const SimulationView = ({
    character
}: Props) => {
    const [selectedSkill, setSelectedSkill] = useState<iSkill | undefined>();
    const [summary, setSummary] = useState<SimulationSummary>();
    const [result, setResult] = useState<SimulateResult>();

    useEffect(() => {
      // const summary = getCharSummary(character, selectedSkill);
      // const result = Simulate(summary);
      console.log(selectedSkill);
      const res = character.simulate(ElementTypes.Neutral, DummyTarget, selectedSkill ? {skill: selectedSkill!, level: selectedSkill.maxLevel} : undefined);
      setResult(res);
      setSummary(res.summary);
    }, [character, selectedSkill])


    const handleSkillSelected = (e: ChangeEvent<HTMLSelectElement>) => {
      const skill = character.job.skills.find(s => s.id === e.target.value);
      setSelectedSkill(skill);
    }

    return (
        <div className="p-2">
          <div>
            <label htmlFor="attackType">Habilidadee: </label>
            <select value={selectedSkill?.id ?? ""}
              onChange={handleSkillSelected}
            className="border-2 rounded-md p-1" name="attackType">
              <option value="">Ataque Básico</option>
              {character.job.skills.filter(s => s.skillType === SkillTypes.AttackSkill).map(skill => (
                <option
                  key={skill.id}
                  value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="attackType">Oponente: </label>
            <select className="border-2 rounded-md p-1" name="attackType">
              <option value="basic">Dummy</option>
            </select>
          </div>
          {result && summary && (<>
            <div>
            <ul className="mt-1 font-bold">
              <li>Dano Habilidade = {result.upperBound.damage}</li>
              <li>Dano Habilidade (Crit) = {result.upperBound.criticalDamage}</li>
            </ul>
          </div>
          <div className="mt-3">
            <p className="border-b border-black mb-2 font-bold">
              Informações Adicionais
            </p>
            <ul className="ml-2">
              <li>ATK = {result.upperBound.atk}</li>
              <li>%ATK Habilidade = {summary.attackMultipliers.skillAtk * 100.0} %</li>
              <p className="mt-2 inline-block border-b border-black mb-2">
                {"Multiplicadores"}
              </p>
              <li>%Raça = {summary.attackMultipliers.race * 100.0}%</li>
              <li>%Tamanho = {summary.attackMultipliers.size * 100.0}%</li>
              <li>%Elemento (Oponente) = {summary.attackMultipliers.targetElement * 100.0}%</li>
              <li>%Elemento (Ataque) = {summary.attackMultipliers.attackElement * 100.0}%</li>
              <li>%Dano {summary.attackInfo.attackType == AttackTypes.Magic ? 'Mágico' : 'Físico'} = {summary.attackMultipliers.default * 100.0}%</li>
              <li>%Atq Arma = {summary.attackMultipliers.weaponAtk * 100.0}%</li>
              <li>%Dano Dist/Corpo a Corpo = {summary.attackMultipliers.range * 100.0}%</li>
              <li>%Multiplicadores (Grupo A) = {summary.attackMultipliers.weaponDamage * 100.0}%</li>
              <li>%Multiplicadores (Grupo B) = {summary.attackMultipliers.groupB * 100.0}%</li>
              <li>%Dano Crítico = {summary.attackMultipliers.crit * 100.0}%</li>
              <li>%Habilidade = {summary.attackMultipliers.skill * 100.0}%</li>
              <li>Grupo A = {result.upperBound.groupA}</li>
              <li>Grupo B = {result.upperBound.groupB}</li>
            </ul>
          </div>
          </>)}

        </div>
    )
}
