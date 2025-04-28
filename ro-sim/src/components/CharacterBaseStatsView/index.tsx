import { Jobs } from "@/engine/jobs";
import { AttributesData } from "@/engine/types/attributes";
import { Job } from "@/engine/types/jobs";
import { ChangeEvent } from "react";

type Props = {
    level: number;
    attributes: AttributesData;
    job: Job
    onLevelChanged: (level: number) => void;
    onJobChanged: (job: Job) => void;
    onAttributesChanged: (attributes: AttributesData) => void;
}

export const CharacterBaseStatsView = ({
    level, job, attributes, onLevelChanged, onJobChanged, onAttributesChanged
}: Props) => {
    const maxAttributes = level < 100 ? 99 : 130;

    const totalPoints = pointsForLevel(level, job.transcendent);
    const forPoints = pointsForAttribute(attributes.str);
    const agiPoints = pointsForAttribute(attributes.agi);
    const vitPoints = pointsForAttribute(attributes.vit);
    const intPoints = pointsForAttribute(attributes.int);
    const dexPoints = pointsForAttribute(attributes.dex);
    const luckPoints = pointsForAttribute(attributes.luk);

    const remainingPoints = totalPoints - forPoints - agiPoints - vitPoints - intPoints - dexPoints - luckPoints;

    const handleAttrChanged = (e: ChangeEvent<HTMLSelectElement>, attrName: keyof AttributesData) => {
        onAttributesChanged({...attributes, [attrName]: parseInt(e.target.value)});
    }

    const handleJobChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const j = Jobs.find((j) => j.id === e.target.value)!;
      onJobChanged(j);
    }

    return (
        <div className="border min-h-24 p-2 mt-1">
            <div className="flex flex-row">
              <div>
              <label>Level: </label>
              <select value={level} onChange={(e) => onLevelChanged(parseInt(e.target.value))}>
                  {[...Array(200).keys()].map(i => (
                      <option key={i} value={i+1}>
                          {i + 1}
                      </option>
                  ))}
              </select>
              </div>
              <div>
                <label>Classe</label>
                <select value={job.id} onChange={handleJobChange}>
                  {Jobs.map((j, i) => (
                    <option key={i} value={j.id}>
                      {j.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          <div className="w-24 border">
            <div className="w-auto">
              <label className="float-left">For: </label>
              <select className="overflow-hidden" value={attributes.str} onChange={(e) => handleAttrChanged(e, "str")}>
                {[...Array(maxAttributes).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label>Agi: </label>
              <select className="overflow-hidden" value={attributes.agi} onChange={(e) => handleAttrChanged(e, "agi")}>
                {[...Array(maxAttributes).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label>Vit: </label>
              <select className="overflow-hidden" value={attributes.vit} onChange={(e) => handleAttrChanged(e, "vit")}>
                {[...Array(maxAttributes).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-auto">
              <label className="left-0">Int: </label>
              <select className="ml-auto overflow-hidden" value={attributes.int} onChange={(e) => handleAttrChanged(e, "int")}>
                {[...Array(maxAttributes).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label>Dex: </label>
              <select className="overflow-hidden" value={attributes.dex} onChange={(e) => handleAttrChanged(e, "dex")}>
                {[...Array(maxAttributes).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label>Luk: </label>
              <select className="overflow-hidden" value={attributes.luk} onChange={(e) => handleAttrChanged(e, "luk")}>
                {[...Array(maxAttributes).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <label>Pontos Restantes {remainingPoints}</label>
        </div>
    )
}

function pointsForLevel(level: number, transcended: boolean) {
    const startPoints = transcended ? 100 : 48;

    return [...Array(level).keys()].reduce((prev, current) => {
        return prev += incrementForLevel(current);
    }, startPoints)
}

function incrementForLevel(level: number){
    if (level === 0) return 0;
    if (level < 100) {
        return Math.floor(level / 5) + 3;
    } else if (level < 150) {
        return Math.floor(level / 10) + 13;
    } else {
        return Math.floor((level - 150) / 7) + 28;
    }
}

function pointsForAttribute(value: number) {

    return [...Array(value).keys()].reduce((prev, current) => {
        return prev += incrementForAttribute(current);
    }, 0)
}

function incrementForAttribute(value: number) {
    if (value === 0) return 0;
    if (value < 100) {
        return Math.floor((value - 1) / 10) + 2;
    } else {
        return Math.floor((value - 100) / 5) + 16;
    }
}
