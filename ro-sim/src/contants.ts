import { AttackMultipliers } from "./engine/attackMultipliers";
import { Attributes } from "./engine/attributes";
import { SimulationSummary } from "./engine/simulation";
import { CharacterSubStats } from "./engine/subStats";
import { AttackTypes } from "./types/attackMultiplier";
import { ElementTypes } from "./types/element";
import { RaceTypes } from "./types/race";
import { SizeTypes } from "./types/size";
import { TargetTypes } from "./types/target";

export enum Priority {
  Primary,
  Secondary,
  Danger,
}

export const mockCharSummary: SimulationSummary = {
  level: 1,
  attributes: Attributes({
      str: 1,
      dex: 1,
      luk: 1,
      int: 1,
      vit: 1,
      agi: 1,
  }),
  subStats: CharacterSubStats({
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
  }),
  attackInfo: {
      defBypass: 0,
      defMBypass: 0,
      sizePenalty: 1.0,
      thanatosEffect: false,
      critable: true,
      skill: false,
      attackType: AttackTypes.Physical,
      rightWeapon: {
          wAtk: 0,
          wMAtk: 0,
          refinement: 0,
          weaponLevel: 1,
      },
      leftWeapon: undefined,
  },
  target: {
        race: RaceTypes.Human,
        element: ElementTypes.Neutral,
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
  },
  attackMultipliers: AttackMultipliers({
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
      skillAtk: 1.0,
      skill: 1.0,
  })
}
