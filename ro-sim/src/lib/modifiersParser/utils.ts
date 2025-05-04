import { iItem } from "@/engine/types/equipment";
import { ParsedItemModifiers } from "./types";
// Imports used by evaluateObjectString
import * as engineConfigs from "@/engine/types/config";
import * as engineEnums from "@engine/types/enums";
import * as modifiersConfig from "@/engine/modifiers/types/config";
import * as conditionsConfig from "@/engine/modifiers/conditions/types/config";

export const userPrompt = (item: iItem): string => {
  return `
  Item Description:
  ${item.description}

  Think step by step and give me the answer.
  `
}

export function parseModifiersFromResponse(llmResponse: string): ParsedItemModifiers {
    const matcher = /FINAL_ANSWER:\s+([\s\S]*)/gim;
    const matchs = matcher.exec(llmResponse);
    if (!matchs) {
        return {
            status: "failed",
            error: "Failed to match the response to expected format",
            llm_response: llmResponse,
        };
    }
    try {
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
    } catch (e) {
        return {
            status: "failed",
            error: "Failed to evaluate the response: " + e,
            llm_response: llmResponse,
        };
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function evaluateObjectString(str: string, context: Record<string, any>) {
  const keys = Object.keys(context);
  const values = Object.values(context);

  // Return the evaluated object
  return Function(...keys, `return (${str});`)(...values);
}
