/* eslint-disable @typescript-eslint/no-explicit-any */
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

const BATCH_SIZE = 150;

export class BatchManager {
    private client: OpenAI;
    private modelName: string;
    private batches: Map<string, string>; // Map of batch ID to status
    private runId: string;
    private stateDir: string;
    private stateFile: string;
    private equipmentsToProcess: Set<iItem>; // Store equipments to process
    private submittedEquipmentIds: Set<string>; // Track submitted equipment IDs
    private batchEquipments: Map<string, string[]>; // Map of batch ID to submitted equipment IDs
    private batchDir: string;
    private resultsDir: string;
    private completedResults: { [batchId: string]: any[] } = {}; // Loaded from disk

    constructor(client: OpenAI, modelName: string, runId: string) {
        this.client = client;
        this.modelName = modelName;
        this.runId = runId;
        this.stateDir = `tmp/${runId}`;
        this.stateFile = `${this.stateDir}/batch-state.json`;
        this.batchDir = `${this.stateDir}/batches`;
        this.resultsDir = `${this.batchDir}/results`;
        this.batches = new Map();
        this.equipmentsToProcess = new Set();
        this.submittedEquipmentIds = new Set();
        this.batchEquipments = new Map();
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
            submittedEquipmentIds: Array.from(this.submittedEquipmentIds),
            batchEquipments: Object.fromEntries(this.batchEquipments),
        };
        writeFileSync(this.stateFile, JSON.stringify(stateObject, null, 2));
        console.log(`Batch state saved to ${this.stateFile}`);
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
        if (stateObject.submittedEquipmentIds) {
            this.submittedEquipmentIds = new Set(stateObject.submittedEquipmentIds);
        } else {
            this.submittedEquipmentIds = new Set();
        }
        if (stateObject.batchEquipments) {
            this.batchEquipments = new Map(Object.entries(stateObject.batchEquipments));
        } else {
            this.batchEquipments = new Map();
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
                const content = fsReadFileSync(path.join(this.resultsDir, file), 'utf-8');
                try {
                    this.completedResults[batchId] = JSON.parse(content);
                } catch (e) {
                    console.error(`Failed to parse results file ${file}:`, e);
                }
            }
        }
    }

    private getNextBatch(): iItem[] {
        const endIdx = Math.min(BATCH_SIZE, this.equipmentsToProcess.size);
        return Array.from(this.equipmentsToProcess.values()).slice(0, endIdx);
    }

    private registerSubmittedEquipments(batchId: string, equipments: iItem[]) {
        equipments.forEach(e => {
            this.submittedEquipmentIds.add(e.id.toString());
            this.equipmentsToProcess.delete(e)
        })
        this.batchEquipments.set(batchId, equipments.map(e => e.id.toString()));
    }


    /**
     * Submits all batches sequentially and waits for each to complete before submitting the next.
     * Returns all results at the end.
     */
    async createBatches(equipments: iItem[]) {
        // Only process equipment not already submitted
        const allToProcess = equipments.filter(e => !this.submittedEquipmentIds.has(e.id.toString()));
        this.equipmentsToProcess = new Set(allToProcess);
        // Start with already completed results
        const results: { [batchId: string]: any[] } = { ...this.completedResults };
        while (this.equipmentsToProcess.size > 0) {
            // If there's an in progress batch, skip batch creation and start polling it
            let batchId = this.findPendingBatch();
            let currentBatchEquipments: iItem[] = [];
            if (batchId == null) {
                // Submit the next batch
                currentBatchEquipments = this.getNextBatch()
                const batchFileId = Date.now().toString();
                const batchFile = this.prepareAndWriteBatchFile(currentBatchEquipments, batchFileId);
                const fileId = await this.submitBatchFile(batchFile);
                batchId = await this.createBatch(fileId);
                this.registerSubmittedEquipments(batchId, currentBatchEquipments);
                this.saveStateToFile();
            } else {
                console.log("Resuming from In Progress Batch: " + batchId);
                const batchEquipmentIds = this.batchEquipments.get(batchId);
                if (batchEquipmentIds != null) {
                    currentBatchEquipments = batchEquipmentIds.map(id => equipments.find(e => e.id.toString() === id)).filter(e => e != null);
                }
            }

            // Poll and persist results
            const batchResult = await this.pollBatchUntilComplete(batchId, currentBatchEquipments);
            if (batchResult) {
                this.persistBatchResults(batchId, batchResult);
                results[batchId] = batchResult;
            }
            this.saveStateToFile();
        }
        return results;
    }

    private prepareAndWriteBatchFile(equipments: iItem[], batchFileId: string): string {
        const data = equipments.map(e => (
            JSON.stringify({
                custom_id: `request-${this.runId}-${e.id}`,
                method: "POST",
                url: "/v1/chat/completions",
                body: {
                    model: this.modelName,
                    messages: [
                        { role: "system", content: SystemPrompt },
                        { role: "user", content: userPrompt(e) }
                    ],
                    max_tokens: 4000,
                }
            })
        ));
        const filename = `${this.batchDir}/${this.modelName}-${batchFileId}.jsonl`;
        writeFileSync(filename, data.join("\n"));
        return filename;
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

    private async pollBatchUntilComplete(batchId: string, batchEquipments: iItem[]): Promise<any[] | null> {
        let batchStatus = "validating";
        let batchResult: any = null;
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
            this.saveStateToFile();
            return batchResult;
        } else if (["failed", "expired", "cancelled"].includes(batchStatus)) {
            console.error(`Batch ${batchId} failed with status: ${batchStatus}`);
            console.log(`Adding ${batchEquipments.length} equipments back to queue`);
            this.equipmentsToProcess.union(new Set(batchEquipments));
            this.saveStateToFile();
            return null;
        }
        this.saveStateToFile();
        return null;
    }

    private persistBatchResults(batchId: string, batchResult: any[]): void {
        fsWriteFileSync(
            path.join(this.resultsDir, `results-${batchId}.json`),
            JSON.stringify(batchResult, null, 2)
        );
        this.completedResults[batchId] = batchResult;
    }

    private parseBatchResults(content: string): any[] {
        const lines = content.split("\n").filter(line => line.trim() !== "");
        return lines.map(line => {
            const parsedLine = JSON.parse(line);
            const llmResponse = parsedLine.response.body.choices[0].message.content;
            const ids = parsedLine.custom_id.split("-");
            const equipmentId = ids[ids.length - 1];
            if (!llmResponse) {
                return {
                    [equipmentId]: {
                        status: "failed",
                        error: "Failed to get LLM content",
                        llm_response: "",
                    }
                };
            }

            const matcher = /FINAL_ANSWER:\s+([\s\S]*)/gim;
            const matchs = matcher.exec(llmResponse);
            if (!matchs) {
                return {
                    [equipmentId]: {
                        status: "failed",
                        error: "Failed to match the response to expected format",
                        llm_response: llmResponse,
                    }
                };
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
                return {
                    [equipmentId]: {
                        status: response.status,
                        modifiers: response.modifiers,
                        error: response.error,
                        llm_response: llmResponse,
                    }
                };
            } catch (e) {
                return {
                    [equipmentId]: {
                        status: "failed",
                        error: "Failed to evaluate the response: " + e,
                        llm_response: llmResponse,
                    }
                };
            }
        });
    }

    private findPendingBatch(): string | undefined {
        return this.batches.keys().find(k => this.batches.get(k) === "in_progress");
    }
}
