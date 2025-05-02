import { iCard } from "@/engine/types/card";
import { iEquipment, ItemTypes } from "@/engine/types/equipment";
import { ItemParser } from "@/lib/parser";
import { readFileSync, writeFileSync } from "fs";


const files = [
    {path: process.cwd() + "/../scrapper/iteminfo_new.lub", encoding: "utf-8"}
]


const equipments: {[k: string]: iEquipment} = {}
const cards: {[k: string]: iCard} = {}

const parser = new ItemParser();
files.forEach(({path, encoding}) => {
    console.log(`Reading ${path} with encoding: ${encoding}.`);

    const content = readFileSync(path, encoding as BufferEncoding);
    parser.parse(content);
})

parser.items.forEach(i => {
    if ([ItemTypes.Weapon, ItemTypes.Armor, ItemTypes.ShadowEquipment].includes(i.type)) {
        equipments[i.id.toString()] = i as iEquipment;
    } else if ([ItemTypes.Card].includes(i.type)) {
        cards[i.id.toString()] = i as iCard;
    }
});

writeFileSync("./equipments.json", JSON.stringify(equipments));
writeFileSync("./cards.json", JSON.stringify(cards));

console.log("\n## Missing types: \n");
console.log(parser.unmappedTypes);

console.log(`\n## Missing Locations: ${parser.unmappedLocations.size} \n`);
parser.unmappedLocations.forEach((l) => {
    console.log(`ID: ${l.id}, Name: ${l.name}, Type: ${ItemTypes[l.type]}, Location: ${l.location}`);
})

