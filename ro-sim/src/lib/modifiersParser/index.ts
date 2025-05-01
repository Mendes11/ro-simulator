/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { iItem } from "@/engine/types/equipment";
import * as engineConfigs from "@/engine/types/config";
import * as engineEnums from "@engine/types/enums";
import * as modifiersConfig from "@/engine/modifiers/types/config";
import * as conditionsConfig from "@/engine/modifiers/conditions/types/config";
import * as ts from "typescript";
import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd(), true);
import { OpenAI } from "openai";
import { SystemPrompt } from "./systemPrompt";
import { ModifierData } from "@/engine/modifiers/types/config";
import { evaluateObjectString, userPrompt } from "./utils";


export type ParsedModifiers = {
    status: string;
    modifiers?: ModifierData[];
    error?: string
    llm_response: string
}

export const parseItemModifiers = async (client: OpenAI, modelName: string, equipment: iItem): Promise<ParsedModifiers> => {
    const completion = await client.chat.completions.create({
        model: modelName,
        messages: [
            {role: "system", content: SystemPrompt},
            {role: "user", content: userPrompt(equipment)}
        ],
        temperature: 0.1,
    });
    const content = completion.choices[0].message.content;
    if (content == null) {
        throw "failed to get LLM content"
    }
    return parseModifier(content);
}

export const parseModifier = (content: string): ParsedModifiers => {
    const matcher = /FINAL_ANSWER:\s+([\s\S]*)/gim;
    const matchs = matcher.exec(content);
    if (matchs == null) {
        // Maybe Throw an error?
        return {
            status: "failed",
            error: "Failed to match the response to expected format",
            llm_response: content,
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
    })

    // const transpiled = ts.transpile(`(${matchs[1]})`);
    // let response = eval(transpiled);

    return {
        status: response.status,
        modifiers: response.modifiers,
        error: response.error,
        llm_response: content,
    }
}

