import OpenAI from "openai";
import { SystemPrompt } from "./systemPrompt";
import { userPrompt } from "./utils";
import { iItem } from "@/engine/types/equipment";
import { createReadStream, writeFileSync, readFileSync, existsSync } from "fs";
import { evaluateObjectString } from "./utils";
import * as engineConfigs from "@/engine/types/config";
import * as engineEnums from "@engine/types/enums";
import * as modifiersConfig from "@/engine/modifiers/types/config";
import * as conditionsConfig from "@/engine/modifiers/conditions/types/config";

const BATCH_SIZE = 150;

export class BatchManager {
    private client: OpenAI;
    private modelName: string;
    private prefix: string;
    private batches: Map<string, string>; // Map of batch ID to status
    private stateFile: string;

    constructor(client: OpenAI, modelName: string, prefix: string, stateFile: string, initialState?: Map<string, string>) {
        this.client = client;
        this.modelName = modelName;
        this.prefix = prefix;
        this.stateFile = stateFile;
        this.batches = initialState || new Map();

        if (!initialState && existsSync(stateFile)) {
            this.loadStateFromFile();
        }
    }

    private saveStateToFile() {
        const stateObject = Object.fromEntries(this.batches);
        writeFileSync(this.stateFile, JSON.stringify(stateObject, null, 2));
        console.log(`Batch state saved to ${this.stateFile}`);
    }

    private loadStateFromFile() {
        const stateContent = readFileSync(this.stateFile, "utf-8");
        const stateObject = JSON.parse(stateContent);
        this.batches = new Map(Object.entries(stateObject));
        console.log(`Batch state loaded from ${this.stateFile}`);
    }

    async createBatches(equipments: iItem[]) {
        const data = equipments.map(e => (
            JSON.stringify({
                custom_id: `request-${this.prefix}-${e.id}`,
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

        for (let i = 0; i < data.length; i += BATCH_SIZE) {
            const filename = `${this.prefix}-${this.modelName}-${i}To${i + BATCH_SIZE}.jsonl`;
            writeFileSync(filename, data.slice(i, i + BATCH_SIZE).join("\n"));
            const file = await this.client.files.create({
                file: createReadStream(filename),
                purpose: "batch",
            });
            console.log(`Created file: ${file.id}`);
            const batch = await this.client.batches.create({
                input_file_id: file.id,
                endpoint: "/v1/chat/completions",
                completion_window: "24h"
            });
            console.log(`Created batch: ${batch.id}`);
            this.batches.set(batch.id, "pending");
            this.saveStateToFile();
        }
    }

    async pollBatchResults() {
        const results: { [batchId: string]: any[] } = {};
        for (const [batchId, status] of this.batches.entries()) {
            if (status === "completed") continue;

            const batch = await this.client.batches.retrieve(batchId);
            console.log(`Batch ${batchId} status: ${batch.status}`);
            this.batches.set(batchId, batch.status);
            this.saveStateToFile();

            if (["failed", "completed", "expired", "cancelled"].includes(batch.status)) {
                if (batch.status !== "completed" || batch.output_file_id == null) {
                    console.error(`Batch ${batchId} failed with status: ${batch.status}`);
                    continue;
                }
                const fileResponse = await this.client.files.content(batch.output_file_id);
                const content = await fileResponse.text();
                results[batchId] = this.parseBatchResults(content);
            }
        }
        return results;
    }

    private parseBatchResults(content: string): any[] {
        const lines = content.split("\n").filter(line => line.trim() !== "");
        return lines.map(line => {
            const parsedLine = JSON.parse(line);
            const llmResponse = parsedLine.choices[0].message.content;

            if (!llmResponse) {
                return {
                    status: "failed",
                    error: "Failed to get LLM content",
                    llm_response: "",
                };
            }

            const matcher = /FINAL_ANSWER:\s+([\s\S]*)/gim;
            const matchs = matcher.exec(llmResponse);
            if (!matchs) {
                return {
                    status: "failed",
                    error: "Failed to match the response to expected format",
                    llm_response: llmResponse,
                };
            }

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
                status: response.status,
                modifiers: response.modifiers,
                error: response.error,
                llm_response: llmResponse,
            };
        });
    }

    hasPendingBatches() {
        return Array.from(this.batches.values()).some(status => status === "pending");
    }
}
