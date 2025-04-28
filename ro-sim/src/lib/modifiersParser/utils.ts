import { iItem } from "@/engine/types/equipment";

export const userPrompt = (item: iItem): string => {
  return `
  Item Description:
  ${item.description}

  Think step by step and give me the answer.
  `
}

export function evaluateObjectString(str: string, context: Record<string, any>) {
  const keys = Object.keys(context);
  const values = Object.values(context);

  // Return the evaluated object
  return Function(...keys, `return (${str});`)(...values);
}
