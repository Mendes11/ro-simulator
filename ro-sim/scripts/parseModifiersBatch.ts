import { BatchManager } from "@/lib/modifiersParser/batch";
import nextEnv from "@next/env";
import { promises as fs } from "fs";
import path from "path";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd(), true);
import { OpenAI } from "openai";
import { iItem } from "@/engine/types/equipment";

const retryFailed = process.env.npm_config_retry_failed != null;
const client = new OpenAI();
const modelName = 'gpt-4.1-mini';
console.log("Starting Parse Modifier Batch");
console.log("ModelName = " + modelName);
console.log("Retry Failed = " + retryFailed);
console.log("Batch files will be stored in the 'batches/' directory. Batch processing is resumable.");

// Load Databases
const items = await loaditems();
console.log("Total items = " + Object.keys(items).length);

// Data preparation
const itemsList = Object.keys(items).map(e => items[e]).sort((a, b) => a.id - b.id);

// Initialize BatchManager
const batchManager = new BatchManager(client, "equipment-modifiers", itemsList);

try {
    await batchManager.run({retryFailed: retryFailed});
} catch (error) {
    console.error("Error during batch processing:", error);
}

async function loaditems(): Promise<{[k: string]: iItem}> {
    const equipmentsFile = await fs.readFile(path.join(process.cwd(), "equipments.json"), 'utf-8');
    const cardsFile = await fs.readFile(path.join(process.cwd(), "cards.json"), 'utf-8');
    return {...JSON.parse(equipmentsFile), ...JSON.parse(cardsFile)}
}
