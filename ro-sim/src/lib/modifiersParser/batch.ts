
import OpenAI from "openai";
import { SystemPrompt } from "./systemPrompt";
import { userPrompt } from "./utils";
import { iItem } from "@/engine/types/equipment";
import { createReadStream, writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync, readFileSync as fsReadFileSync, writeFileSync as fsWriteFileSync } from "fs";
import path from "path";
import { evaluateObjectString } from "./utils";
import * as engineConfigs from "@/engine/types/config";
import * as engineEnums from "@engine/types/enums";
import * as modifiersConfig from "@/engine/modifiers/types/config";
import * as conditionsConfig from "@/engine/modifiers/conditions/types/config";
import { ParsedItemModifiers, ParsedModifiers } from "./types";

const BATCH_SIZE = 30;

export class BatchManager {
    private client: OpenAI;
    private items: iItem[];
    private defaultModelName: string = "gpt-4.1-mini";
    private batches: Map<string, string>; // Map of batch ID to status
    private runId: string;
    private stateDir: string;
    private stateFile: string;
    private itemsToProcess: Set<iItem>; // Store equipments to process
    private batchItemIds: Map<string, string[]>; // Map of batch ID to submitted equipment IDs
    private batchDir: string;
    private resultsDir: string;
    private completedResults: ParsedModifiers = {}; // Loaded from disk
    private descriptionCache: Map<string, ParsedItemModifiers> = new Map(); // Cache of parsed modifiers for descriptions
    private itemsMap: Map<string, iItem> = new Map();

    constructor(client: OpenAI, runId: string, items: iItem[]) {
        this.client = client;
        this.runId = runId;
        this.items = items;
        this.itemsMap = new Map(items.map(e => [e.id.toString(), e]));

        this.stateDir = `tmp/${runId}`;
        this.stateFile = `${this.stateDir}/batch-state.json`;
        this.batchDir = `${this.stateDir}/batches`;
        this.resultsDir = `${this.batchDir}/results`;
        this.batches = new Map();
        this.itemsToProcess = new Set();
        this.batchItemIds = new Map();
        this.descriptionCache = new Map();
        // Ensure all directories exist
        if (!existsSync("tmp")) {
            mkdirSync("tmp");
        }
        if (!existsSync(this.stateDir)) {
            mkdirSync(this.stateDir);
        }
        if (!existsSync(this.batchDir)) {
            mkdirSync(this.batchDir);
        }
        if (!existsSync(this.resultsDir)) {
            mkdirSync(this.resultsDir);
        }
        this.loadCompletedResultsFromDisk();
        this.loadStateFromFile();
    }

    public saveStateToFile() {
        const stateObject = {
            batches: Object.fromEntries(this.batches),
            batchItemIds: Object.fromEntries(this.batchItemIds),
        };
        writeFileSync(this.stateFile, JSON.stringify(stateObject, null, 2));
        console.log(`Batch state saved to ${this.stateFile}`);
        writeFileSync(path.join(this.stateDir, 'items-modifier.json'), JSON.stringify(this.completedResults))
    }

    private loadStateFromFile() {
        if (!existsSync(this.stateFile)) return;
        const stateContent = readFileSync(this.stateFile, "utf-8");
        const stateObject = JSON.parse(stateContent);
        if (stateObject.batches) {
            this.batches = new Map(Object.entries(stateObject.batches));
        } else {
            this.batches = new Map();
        }
        if (stateObject.batchItemIds) {
            this.batchItemIds = new Map(Object.entries(stateObject.batchItemIds));
        } else {
            this.batchItemIds = new Map();
        }
        console.log(`Batch state loaded from ${this.stateFile}`);
    }

    /**
     * Loads all completed batch results from disk (batches/results/).
     */
    private loadCompletedResultsFromDisk() {
        if (!existsSync(this.resultsDir)) return;
        const files = readdirSync(this.resultsDir);
        for (const file of files) {
            if (file.endsWith('.json')) {
                const batchId = file.replace('results-', '').replace('.json', '');
                console.log(`Loading results for batch ${batchId} at ${path.join(this.resultsDir, file)}`);
                const content = fsReadFileSync(path.join(this.resultsDir, file), 'utf-8');
                this.completedResults = { ...this.completedResults, ...JSON.parse(content) };
            }
        }
        console.log(`Loaded ${Object.keys(this.completedResults).length} completed results`);
        Object.entries(this.completedResults).forEach(([itemId, result]) => {
            if (result.status === "success") {
                const item = this.itemsMap.get(itemId);
                if (item != null) {
                    this.cacheDescription(item.description, result);
                }
            }
        });
    }

    private getItemsToProcess(): Set<iItem> {
        const itemsToProcess = new Set(this.items);
        Object.keys(this.completedResults).forEach(id => {
            const item = this.itemsMap.get(id);
            if (item != null) {
                itemsToProcess.delete(item);
            }
        });
        Object.entries(this.batches).filter(([, status]) => status === "in_progress").forEach(([batchId, ]) => {
            const itemIds = this.batchItemIds.get(batchId);
            if (itemIds != null) {
                itemIds.forEach(id => {
                    const item = this.itemsMap.get(id);
                    if (item != null) {
                        itemsToProcess.delete(item);
                    }
                })
            }
        })
        return itemsToProcess;
    }

    private getNextBatch(): iItem[] {
        const endIdx = Math.min(BATCH_SIZE, this.itemsToProcess.size);
        return Array.from(this.itemsToProcess.values()).slice(0, endIdx);
    }

    private registerSubmittedItems(batchId: string, equipments: iItem[]) {
        equipments.forEach(e => {
            this.itemsToProcess.delete(e)
        })
        this.batchItemIds.set(batchId, equipments.map(e => e.id.toString()));
    }


    /**
     * Submits all batches sequentially and waits for each to complete before submitting the next.
     * Returns all results at the end.
     */
    async run() {
        // Only process equipment not already submitted
        this.itemsToProcess = this.getItemsToProcess();
        while (this.itemsToProcess.size > 0) {
            // If there's an in progress batch, skip batch creation and start polling it
            let batchId = this.findPendingBatch();
            let currentBatchItems: iItem[] = [];
            if (batchId == null) {
                // Batch Submission Flow:
                // First Look for any cache hits, to remove from the pending items to process
                // Then, once all cache hits are removed, submit the next batch to be processed
                this.processCacheHits();
                console.log(`${this.itemsToProcess.size} items left to process`);
                currentBatchItems = this.getNextBatch()
                const batchFileId = Date.now().toString();
                const batchFile = this.prepareAndWriteBatchFile(currentBatchItems, batchFileId);
                const fileId = await this.submitBatchFile(batchFile);
                batchId = await this.createBatch(fileId);
                this.batches.set(batchId, "in_progress");
                this.registerSubmittedItems(batchId, currentBatchItems);
                this.saveStateToFile();
            } else {
                console.log("Resuming from In Progress Batch: " + batchId);
                const batchItemIds = this.batchItemIds.get(batchId);
                if (batchItemIds != null) {
                    currentBatchItems = batchItemIds.map(id => this.items.find(e => e.id.toString() === id)).filter(e => e != null);
                }
            }

            // Poll and persist results
            const batchResult = await this.pollBatchUntilComplete(batchId);
            if (batchResult != null) {
                this.registerParsedModifiers(batchId, batchResult);
            } else {
                console.log(`No results for batch ${batchId}. Adding ${currentBatchItems.length} items back to queue`);
                currentBatchItems.forEach(i => this.itemsToProcess.add(i));
            }
            this.saveStateToFile();
            console.log("Waiting for 10 seconds to allow the API to refresh the limit");
            await this.sleep(10 * 1000); // 10 seconds
        }
        return this.completedResults;
    }

    private async sleep(t: number) {
        return new Promise((resolve) => setTimeout(resolve, t));
    }

    private prepareAndWriteBatchFile(items: iItem[], batchFileId: string): string {
        const data = items.map(e => (
            JSON.stringify({
                custom_id: `request-${this.runId}-${e.id}`,
                method: "POST",
                url: "/v1/chat/completions",
                body: {
                    model: this.selectModel(e),
                    messages: [
                        { role: "system", content: SystemPrompt },
                        { role: "user", content: userPrompt(e) }
                    ],
                    max_tokens: 4000,
                }
            })
        ));
        const filename = `${this.batchDir}/${this.runId}-${batchFileId}.jsonl`;
        writeFileSync(filename, data.join("\n"));
        return filename;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private selectModel(_item: iItem): string {
        // TODO: Select model based on the equipment description complexity
        // Nano: Simple
        // Mini: Medium
        // Standard: Complex
        return this.defaultModelName;
    }

    private async submitBatchFile(filename: string): Promise<string> {
        const file = await this.client.files.create({
            file: createReadStream(filename),
            purpose: "batch",
        });
        console.log(`Created file: ${file.id}`);
        return file.id;
    }

    private async createBatch(fileId: string): Promise<string> {
        const batch = await this.client.batches.create({
            input_file_id: fileId,
            endpoint: "/v1/chat/completions",
            completion_window: "24h"
        });
        console.log(`Created batch: ${batch.id}`);
        return batch.id;
    }

    private async pollBatchUntilComplete(batchId: string): Promise<ParsedModifiers | null> {
        let batchStatus = "validating";
        let batchResult: ParsedModifiers | null = null;
        const nonTerminalStatuses = ["validating", "in_progress", "finalizing"];
        while (nonTerminalStatuses.includes(batchStatus)) {
            await new Promise(res => setTimeout(res, 10000)); // Poll every 10 seconds
            const batchInfo = await this.client.batches.retrieve(batchId);
            batchStatus = batchInfo.status;
            this.batches.set(batchId, batchStatus);
            console.log(`Batch ${batchId} status: ${batchStatus}`);
        }
        // Handle terminal statuses
        const batchInfo = await this.client.batches.retrieve(batchId);
        batchStatus = batchInfo.status;
        if (batchStatus === "completed" && batchInfo.output_file_id) {
            const fileResponse = await this.client.files.content(batchInfo.output_file_id);
            const content = await fileResponse.text();
            batchResult = this.parseBatchResults(content);
            return batchResult;
        } else if (["failed", "expired", "cancelled"].includes(batchStatus)) {
            console.error(`Batch ${batchId} failed with status: ${batchStatus}`);
            return null;
        }
        return null;
    }

    private registerParsedModifiers(batchId: string, batchResult: ParsedModifiers): void {
        // Register parsed modifiers in cache to skip reprocessing the same description
        // Only register successful results
        Object.entries(batchResult).forEach(([itemId, result]) => {
            if (result.status === "success") {
                const item = this.itemsMap.get(itemId);
                if (item != null) {
                    this.cacheDescription(item.description, result)
                }
            }
        });
        fsWriteFileSync(
            path.join(this.resultsDir, `results-${batchId}.json`),
            JSON.stringify(batchResult, null, 2)
        );
        this.completedResults = { ...this.completedResults, ...batchResult };
    }

    private cacheDescription(description: string, result: ParsedItemModifiers): void {
        this.descriptionCache.set(description, result);
    }

    private parseBatchResults(content: string): ParsedModifiers {
        const lines = content.split("\n").filter(line => line.trim() !== "");
        return Object.fromEntries(lines.map((line) => {
            const parsedLine = JSON.parse(line);
            const llmResponse = parsedLine.response.body.choices[0].message.content;
            const ids = parsedLine.custom_id.split("-");
            const itemId: string = ids[ids.length - 1];
            if (!llmResponse) {
                return [
                    itemId, {
                        status: "failed",
                        error: "Failed to get LLM content",
                        llm_response: "",
                    }
                ];
            }

            const matcher = /FINAL_ANSWER:\s+([\s\S]*)/gim;
            const matchs = matcher.exec(llmResponse);
            if (!matchs) {
                return [
                    itemId, {
                        status: "failed",
                        error: "Failed to match the response to expected format",
                        llm_response: llmResponse,
                    }
                ];
            }
            try{
                const response = evaluateObjectString(matchs[1], {
                    ModifierTypes: modifiersConfig.ModifierTypes,
                    AttackMultiplierTypes: engineConfigs.AttackMultiplierTypes,
                    AttackTypes: engineConfigs.AttackTypes,
                    AttackRangeTypes: engineConfigs.AttackRangeTypes,
                    ElementTypes: engineEnums.ElementTypes,
                    ItemLocations: engineEnums.ItemLocations,
                    JobIds: engineEnums.JobIds,
                    RaceTypes: engineEnums.RaceTypes,
                    SizeTypes: engineEnums.SizeTypes,
                    TargetTypes: engineEnums.TargetTypes,
                    ComparisonConditions: conditionsConfig.ComparisonConditions,
                    ConditionTypes: conditionsConfig.ConditionTypes,
                });
                return [
                    itemId, {
                        status: response.status,
                        modifiers: response.modifiers,
                        error: response.error,
                        llm_response: llmResponse,
                    }
                ];
            } catch (e) {
                return [
                    itemId, {
                        status: "failed",
                        error: "Failed to evaluate the response: " + e,
                        llm_response: llmResponse,
                    }
                ];
            }
        }));
    }

    private findPendingBatch(): string | undefined {
        return Array.from(this.batches.keys()).find(k => this.batches.get(k) === "in_progress");
    }

    private processCacheHits() {
        this.itemsToProcess.forEach(e => {
            const cachedResult = this.descriptionCache.get(e.description);
            if (cachedResult != null) {
                console.log(`Cache hit for ${e.id}`);
                // Append to a cached results file
                const cachePath = path.join(this.resultsDir, `results-cache.json`);
                let parsedCachedResults: ParsedModifiers = {};
                if (existsSync(cachePath)) {
                    parsedCachedResults = JSON.parse(fsReadFileSync(cachePath, "utf-8"));
                }
                parsedCachedResults[e.id.toString()] = cachedResult;
                fsWriteFileSync(cachePath, JSON.stringify(parsedCachedResults, null, 2));
                this.itemsToProcess.delete(e);
                this.completedResults[e.id.toString()] = cachedResult;
            }
        })
        this.saveStateToFile();
    }
}
