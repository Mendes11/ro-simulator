// Parse Modifiers through an LLM to configure the structure
import { EquipmentData, iEquipment } from "@/engine/types/equipment";
import { parseItemModifiers } from "@/lib/modifiersParser";
import { ParsedItemModifiers, ParsedModifiers } from "@/lib/modifiersParser/types";
import nextEnv from "@next/env";
import { promises as fs } from "fs";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd(), true);
import { OpenAI } from "openai";
import path from "path";

const retryFailed = process.env.npm_config_retry_failed != null
const client = new OpenAI();
const modelName = 'gpt-4.1-mini';
console.log("Starting Parse Modifier");
console.log("ModelName = "+modelName);
console.log("Retry Failed = " + retryFailed);

// Load Databases

const equipments = await loadEquipments();
const parsedModifiers = await loadParsedModifiers();
console.log("Total Equipments = " + Object.keys(equipments).length);
console.log("Total Parsed Modifiers = " + Object.keys(parsedModifiers).length);

// Data preparation

const equipmentsList = Object.keys(equipments).map(e => equipments[e]);
// There are a lot of equipments that are the same item but with different Ids.
// I'll create a memory hash of those descriptions to map to an already processed modifier.
const cachedDescriptions = cacheDescriptions(equipments, parsedModifiers);


try{
    for (const e of equipmentsList) {
        if (e.id.toString() in parsedModifiers) {
            // Ignore existing "success"/"partial" results and "error" in case retryFailed is false.
            if (parsedModifiers[e.id.toString()].status in ["success", "partial"] || (!retryFailed)) {
                continue
            }
        }

        console.log(e.id, e.name);
        // Check for Cache Hits before trying to process the description.
        if (e.description in cachedDescriptions) {
            console.log("Cache Hit");
            parsedModifiers[e.id] = cachedDescriptions[e.description];
            continue;
        }
        const res = await callParser(client, modelName, e);
        console.log(res.status);
        parsedModifiers[e.id] = res;
        cachedDescriptions[e.description] = res;
    }
}finally {
    await storeParsedModifiers(parsedModifiers);
}

async function callParser(client: OpenAI, modelName: string, equipment: iEquipment): Promise<ParsedItemModifiers> {
    for(let i=0; i<3; i++) {
        try {
            return await parseItemModifiers(client, modelName, equipment);
        } catch(e) {
            if (i == 2) {
                throw e;
            }
            console.log(`parseItemModifiers Failed... Retrying ${i+1}/3`);
        }
    }
    throw "Exceeded max retries when calling the parser";
}


async function loadEquipments(): Promise<{[k: string]: EquipmentData}> {
    const file = await fs.readFile(path.join(process.cwd(), "equipments.json"), 'utf-8');
    return JSON.parse(file)
}

async function storeParsedModifiers(parsedModifiers: ParsedModifiers) {
    await fs.writeFile("equipments-modifiers.json", JSON.stringify(parsedModifiers));
}

async function loadParsedModifiers(): Promise<ParsedModifiers> {
    try {
        return JSON.parse(await fs.readFile(path.join(process.cwd(), "equipments-modifiers.json"), "utf-8"));
    } catch {
        return {};
    }
}

function cacheDescriptions(equipments: {[k: string]: EquipmentData}, parsedModifiers: ParsedModifiers): ParsedModifiers {
    const cachedDescriptions: ParsedModifiers = {}
    Object.keys(parsedModifiers).forEach(id => {
        if ((parsedModifiers[id].status === "success") && !(equipments[id].description in cachedDescriptions)) {
            cachedDescriptions[equipments[id].description] = parsedModifiers[id];
        }
    })
    return cachedDescriptions
}
