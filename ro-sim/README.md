# RO Simulator

Ragnarok Online Simulator, currently dedicated for Brazil Ragnarok Online server (bRO)

## About

This project aim is to enable users to simulate their characters without requiring them to fill all the equipments modifiers by themselves. All combos and item effects are already implemented into the system, all you have to do is just add the items.


## Run

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Developers

Some important information for developers


### Items / Effects and Combos Extraction
>[!Important]
Some steps below require an OpenAI API key, and will cost you money to run.

As mentioned, the aim of this project is to have all combos/effects already implemented in the system, so we need to extract it ourselves.

The data extraction pipeline is as follows:

#### 1. Equipment/Cards Base info

Extract cards and equipments data from `item_info.lub` file in the GRF, and store them into `equipments.json`, and `cards.json`.

These files will have basic information such as name, description, base def/atk, how many slots, name and etc... Note that no combos/modifiers are available in this step.

#### 2. Combo/Modifiers extraction

Extracting structured data out of unstructured data is what LLMs do best nowadays. What used to be a extremely difficult problem, now became trivial.

To extract all combos and modifiers, use the `scripts/parseModifiersBatch.ts <name>` script (name will be used to generate a folder in `./tmp/<name>` where all the parser states will be stored).

It requires an OpenAI API key (with credits of course), and will cost around 18 USD. This script will call the Batch API from OpenAI, and ask an LLM to fit the combos and effects in the item description into the `ModifierData` type structure created (see `engine` folder for all types, and `lib/modifiersParser` for all the parsing logic and prompts).

The script itself is resumable, so you can kill it and once you call it again, it should resume from where it stopped (assuming you still have the states stored in the temporary folder as mentioned at the beginning of the topic).
