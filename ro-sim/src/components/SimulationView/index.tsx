import { mockCharSummary } from "@/contants";
import { SimulationSummary, MultipliersData, Simulate, SimulateResult } from "@/engine/simulation"
import { AttackRangeTypes, AttackTypes } from "@/types/attackMultiplier";
import { AttributesData } from "@/types/attributes";
import { CharacterData, CharacterEquipments, iCharacter } from "@/types/character";
import { ItemTypes, iWeapon } from "@/types/equipment";
import { iSkill, SkillTypes } from "@/types/skills";
import { CharacterSubStatsData } from "@/types/stats";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
    character: CharacterData;
}

const getCharSummary = (character: CharacterData, skill?: iSkill): SimulationSummary => {
  const summary: SimulationSummary = {
    level: character.level,
    attributes: character.baseAttrs,
    subStats: {
      eAtk: 0,
      eMatk: 0,
      crit: 0,
      precision: 0,
      perfectPrecision: 0,
      softDef: 0,
      hardDef: 0,
      aspdPercent: 0,
      aspdUnit: 0,
      masteryAtk: 0,
    },
    attackInfo: {
      defBypass: 0,
      defMBypass: 0,
      sizePenalty: 1,
      thanatosEffect: false,
      critable: true,
      attackMultiplier: 1.0,
      skill: false,
      attackType: AttackTypes.Physical,
      rightWeapon: {
        wAtk: (character.equipments.rightHand?.equipment as iWeapon)?.weaponAtk ?? 0,
        wMAtk: (character.equipments.rightHand?.equipment as iWeapon)?.weaponMAtk ?? 0,
        refinement: character.equipments.rightHand?.refinement ?? 0,
        weaponLevel: (character.equipments.rightHand?.equipment as iWeapon)?.weaponLevel ?? 1,
      },
      leftWeapon: undefined,
    },
    target: {
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
    },
    attackMultipliers: {
      weaponAtk: 0,
      race: 0,
      size: 0,
      attackElement: 0.0,
      targetElement: 0.0,
      default: 0.0,
      range: 0.0,
      crit: 0.0,
      damage: 1.0,
      weaponDamage: 0.0, // EDP
      groupB: 0.0, // EDP
      finalDamage: 0,
      skill: 1.0,
    }
  };

  if (character.equipments.leftHand && character.equipments.leftHand.equipment.type == ItemTypes.Weapon) {
    summary.attackInfo.leftWeapon = {
      wAtk: (character.equipments.leftHand?.equipment as iWeapon)?.weaponAtk ?? 0,
      wMAtk: (character.equipments.leftHand?.equipment as iWeapon)?.weaponMAtk ?? 0,
      refinement: character.equipments.leftHand?.refinement ?? 0,
      weaponLevel: (character.equipments.leftHand?.equipment as iWeapon)?.weaponLevel ?? 1,
    }
  }

  if (skill) {
    summary.attackInfo.skill = true
    summary.attackInfo.critable = !!skill.critable;
    summary.attackInfo.attackType = skill.attackType!;
    summary.attackInfo.attackMultiplier = skill.attackMultiplier!(skill.maxLevel, summary);
  }

  Object.keys(character.equipments).forEach(k => {
    const equip = character.equipments[k as keyof CharacterEquipments];
    if (equip) {
      equip.equipment?.apply(equip.refinement, character, summary);
    }
  })

  console.log(summary);
  return summary
}

export const SimulationView = ({
    character
}: Props) => {
    const [selectedSkill, setSelectedSkill] = useState<iSkill | undefined>();
    const [summary, setSummary] = useState<SimulationSummary>();
    const [result, setResult] = useState<SimulateResult>();

    useEffect(() => {
      const summary = getCharSummary(character, selectedSkill);
      const result = Simulate(summary);
      setResult(result);
      setSummary(summary);
    }, [character, selectedSkill])


    const handleSkillSelected = (e: ChangeEvent<HTMLSelectElement>) => {
      const skill = character.job.skills.find(s => s.id === e.target.value);
      setSelectedSkill(skill);
    }

    return (
        <div className="p-2">
          <div>
            <label htmlFor="attackType">Habilidade: </label>
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
              <li>%ATK Habilidade = {summary.attackInfo.attackMultiplier * 100.0} %</li>
              <p className="mt-2 inline-block border-b border-black mb-2">
                {"Multiplicadores"}
              </p>
              <li>%Raça = {summary.attackMultipliers.race * 100.0}%</li>
              <li>%Tamanho = {summary.attackMultipliers.size * 100.0}%</li>
              <li>%Elemento (Oponente) = {summary.attackMultipliers.targetElement * 100.0}%</li>
              <li>%Elemento (Ataque) = {summary.attackMultipliers.attackElement * 100.0}%</li>
              <li>%Dano {summary.attackInfo.attackType == AttackTypes.Magic ? 'Mágico' : 'Físico'} = {summary.attackMultipliers.default}%</li>
              <li>%Atq Arma = {summary.attackMultipliers.weaponAtk * 100.0}%</li>
              <li>%Dano Dist/Corpo a Corpo = {summary.attackMultipliers.range * 100.0}%</li>
              <li>%Multiplicadores (Grupo A) = {summary.attackMultipliers.weaponDamage * 100.0}%</li>
              <li>%Multiplicadores (Grupo B) = {summary.attackMultipliers.groupB * 100.0}%</li>
              <li>%Dano Crítico = {summary.attackMultipliers.crit}%</li>
              <li>%Habilidade = {summary.attackMultipliers.skill * 100.0}%</li>
              <li>Grupo A = {result.upperBound.groupA}</li>
              <li>Grupo B = {result.upperBound.groupB}</li>
            </ul>
          </div>
          </>)}

        </div>
    )
}
