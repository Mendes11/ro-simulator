import { ModifierData } from "@/engine/modifiers/types/config";

export type ParsedItemModifiers = {
    status: string;
    modifiers?: ModifierData[];
    error?: string
    llm_response: string
}

export type ParsedModifiers = {
    [itemId: string]: ParsedItemModifiers
}
