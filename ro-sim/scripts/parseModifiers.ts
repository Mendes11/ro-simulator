// Parse Modifiers through an LLM to configure the structure
import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd(), true);
import { readdirSync, readFileSync } from "fs";
import { OpenAI } from "openai";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources/index.mjs";
import path from "path";



const include_files = [
    path.join(process.cwd(), "src", "types", "attackMultiplier.ts"),
    path.join(process.cwd(), "src", "types", "attributes.ts"),
    path.join(process.cwd(), "src", "types", "condition.ts"),
    path.join(process.cwd(), "src", "types", "element.ts"),
    path.join(process.cwd(), "src", "types", "equipment.ts"),
    path.join(process.cwd(), "src", "types", "equipmentInstance.ts"),
    path.join(process.cwd(), "src", "types", "jobs.ts"),
    path.join(process.cwd(), "src", "types", "race.ts"),
    path.join(process.cwd(), "src", "types", "size.ts"),
    path.join(process.cwd(), "src", "types", "skills.ts"),
    path.join(process.cwd(), "src", "types", "stats.ts"),
    path.join(process.cwd(), "src", "types", "target.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "base.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "characterModifiers.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "combo.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "refinementModifier.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "statsModifier.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "utils.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "conditions", "attackTypeCondition.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "conditions", "cardSetCondition.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "conditions", "equipmentSetCondition.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "conditions", "jobCondition.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "conditions", "levelCondition.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "conditions", "refinementCondition.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "conditions", "skillCondition.ts"),
    path.join(process.cwd(), "src", "engine", "modifiers", "conditions", "targetCondition.ts"),
]

const prompt = `
You are a Game description parser tool. You'll be given an item's description in Portuguese, and your role is to interpret the item's description and extract what I call Modifiers out of that text.
You'll be given a few types and other sources, to help you understand how to structure the data.

Below are the files to give you context on what are the types and how to fill things:

SOURCES CONTEXT:
${include_files.map(path => {
    const content = readFileSync(path)
    return `Path: ${path}
\`\`\`ts
${content}
\`\`\`
`
})}

Your task is to RETURN a \`ModifierData\` array that represents the effects that a given item has.
More specifically, your role is interpret the equipment description and extract the \`modifiers\` attribute following the \`ModifierData\` type.

Following are some examples of modifiers extracted out of descriptions, with some reasoning on how to interpret it to guide you:
${readdirSync(path.join(process.cwd(), "scripts", "llm_examples")).map(file => readFileSync(path.join(process.cwd(), "scripts", "llm_examples", file)).join("\n"))}

RULES:

You'll first be asked to reason about this task an what you should do to accomplish your task.

Once you are asked for the Modifiers:
Your response should ALWAYS BE as follows -- You are not allowed to answer anything besides these responses: 
- For when you are able to extract everything: 
    {"status": "success", "modifiers": "<A string having the modifiers typescript code>"} 
- For when you believe some parts of the description weren't able to fit the existing types: 
    {"status": "partial", "modifiers": "<A string having the modifiers typescript code>", errors: "Place here why its partial"} 
- For when you couldn't fit the description into the existing types: 
    {"status": "failed", "error": "some description to allow me to identify why it failed"} 


`;


const client = new OpenAI();

let messages: ChatCompletionMessageParam[] = [
    { role: "system", content: prompt},
    {
        role: "user",
        content: "Equipamento feito em homenagem ao Rei Tristan III e dada como agradecimento aos caçadores que mostraram habilidades notáveis em competições de caça.\r\n--------------------------\r\n^0000ffDano físico e mágico contra as raças Bruto e Inseto +7%.^000000\r\n--------------------------\r\n^0000ffHP máx. +500.^000000\r\n^0000ffSP máx. +100.^000000\r\nA cada 3 refinos:\r\n^0000ffHP máx. +50.^000000\r\n^0000ffSP máx. +20.^000000\r\n--------------------------\r\n^FA4E09Conjunto^000000\r\n^FA4E09[Botas do Monarca]^000000\r\n^FA4E09[Manto do Monarca]^000000\r\n^0000ffConjuração variável -7%.^000000\r\nBotas, Manto e Armadura no refino +9 ou mais:\r\n^0000ffConjuração variável -5% adicional.^000000\r\n--------------------------\r\nTipo: ^777777Armadura^000000\r\nDEF: ^77777725^000000 DEFM: ^7777770^000000\r\nPeso: ^77777790^000000\r\nNível necessário: ^77777750^000000\r\nClasses: ^777777Todas^000000\"",
    },
    {
        role: "user",
        content: "REASONING\n"
    }
]
let completion: ChatCompletion;


completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: messages
});
console.log(completion.choices[0].message.content);
messages.push({role: "assistant", content: completion.choices[0].message.content})

// Second Step
messages.push({role: "user", content: "Think step by step until you get to the solution"})
completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: messages
});
console.log(completion.choices[0].message.content);
messages.push({role: "assistant", content: completion.choices[0].message.content})

// Final Step
messages.push({role: "user", content: "MODIFIERS:\n"})
completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: messages
});
console.log(completion.choices[0].message.content);

