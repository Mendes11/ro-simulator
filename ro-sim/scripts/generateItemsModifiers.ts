// Generate item-modifiers.json file from a parseModifiers json output

import { ModifierData } from "@/engine/modifiers/types/config";
import { ParsedModifiers } from "@/lib/modifiersParser/types";
import { parseModifiersFromResponse } from "@/lib/modifiersParser/utils";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import path from "path";

rmSync("db", {recursive: true, force: true});
mkdirSync("db");

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error("Usage: node generateItemModifiers.js <input file path>");
    process.exit(1);
}
const filePath = args[0];

const parsedModifiers: ParsedModifiers = JSON.parse(readFileSync(filePath, "utf-8"))
const failedItems: ParsedModifiers = {};
const partialItems: ParsedModifiers = {};
const successItems: ParsedModifiers = {};
Object.entries(parsedModifiers).forEach(([itemId, result]) => {
    switch (result.status) {
        case "success":
            successItems[itemId] = result;
            break;
        case "failed":
            failedItems[itemId] = result;
            break;
        case "partial":
            partialItems[itemId] = result;
            break;
        default:
            break;
    }
});

console.log(`There are ${Object.keys(failedItems).length} Failed items`);
console.log(`There are ${Object.keys(partialItems).length} Partial items`);
console.log(`There are ${Object.keys(successItems).length} Success items`);

writeFileSync(path.join("db", "failed-parses.json"), JSON.stringify(failedItems));
writeFileSync(path.join("db", "partial-parses.json"), JSON.stringify(partialItems));
writeFileSync(path.join("db", "success-parses.json"), JSON.stringify(successItems));


console.log("Generating items-modifiers.json");
const itemsModifiers: {[k: string]: ModifierData[]} = {
    ...Object.fromEntries(Object.entries(successItems).map(([itemId, res]) => [itemId, parseModifiersFromResponse(res.llm_response).modifiers!])),
    ...Object.fromEntries(Object.entries(partialItems).map(([itemId, res]) => [itemId, parseModifiersFromResponse(res.llm_response).modifiers!])),
}


writeFileSync(path.join("db", "items-modifiers.json"), JSON.stringify(itemsModifiers));
