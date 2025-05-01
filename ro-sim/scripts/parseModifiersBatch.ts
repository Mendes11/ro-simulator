import { EquipmentData } from "@/engine/types/equipment";
import { ParsedModifiers } from "@/lib/modifiersParser";
import { BatchManager } from "@/lib/modifiersParser/batch";
import nextEnv from "@next/env";
import { promises as fs } from "fs";
import path from "path";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd(), true);
import { OpenAI } from "openai";

const retryFailed = process.env.npm_config_retry_failed != null;
const client = new OpenAI();
const modelName = 'gpt-4.1-mini';
console.log("Starting Parse Modifier Batch");
console.log("ModelName = " + modelName);
console.log("Retry Failed = " + retryFailed);
console.log("Batch files will be stored in the 'batches/' directory. Batch processing is resumable.");

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

// Initialize BatchManager
const batchManager = new BatchManager(client, modelName, "equipment-modifiers");

// ---
// NOTE: This script is RESUMABLE. If interrupted, it will pick up where it left off using the batch-state.json file and the batches/ folder.
// It will NOT re-submit equipment items that have already been submitted in a batch.
// ---

try {
    // Filter equipments to process
    const equipmentsToProcess = equipmentsList.filter(e => {
        if (e.id.toString() in parsedModifiers) {
            // Ignore existing "success"/"partial" results and "error" in case retryFailed is false.
            return !(parsedModifiers[e.id.toString()].status in ["success", "partial"] || (!retryFailed));
        }
        return true;
    });

    console.log("Equipments to process: " + equipmentsToProcess.length);

    // Create batches and process them sequentially (will skip already-submitted items)
    const batchResults = await batchManager.createBatches(equipmentsToProcess);

    // Process results
    for (const [, results] of Object.entries(batchResults)) {
        for (const result of results) {
            const equipmentId = result.custom_id.split("-").pop();
            if (result.status === "success") {
                parsedModifiers[equipmentId] = result;
                cachedDescriptions[equipments[equipmentId].description] = result;
            } else {
                console.error(`Failed to process equipment ID ${equipmentId}: ${result.error}`);
            }
        }
    }
} catch (error) {
    console.error("Error during batch processing:", error);
} finally {
    await storeParsedModifiers(parsedModifiers);
    batchManager.saveStateToFile();
}

async function loadEquipments(): Promise<{[k: string]: EquipmentData}> {
    const file = await fs.readFile(path.join(process.cwd(), "equipments.json"), 'utf-8');
    return JSON.parse(file);
}

async function storeParsedModifiers(parsedModifiers: {[k: string]: ParsedModifiers}) {
    await fs.writeFile("equipments-modifiers.json", JSON.stringify(parsedModifiers));
}

async function loadParsedModifiers(): Promise<{[k: string]: ParsedModifiers}> {
    try {
        return JSON.parse(await fs.readFile(path.join(process.cwd(), "equipments-modifiers.json"), "utf-8"));
    } catch {
        return {};
    }
}

function cacheDescriptions(equipments: {[k: string]: EquipmentData}, parsedModifiers: {[k: string]: ParsedModifiers}): {[k: string]: ParsedModifiers} {
    const cachedDescriptions: {[k: string]: ParsedModifiers} = {};
    Object.keys(parsedModifiers).forEach(id => {
        if (parsedModifiers[id].status === "success" && !(equipments[id].description in cachedDescriptions)) {
            cachedDescriptions[equipments[id].description] = parsedModifiers[id];
        }
    });
    return cachedDescriptions;
}

