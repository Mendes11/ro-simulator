# RO Simulator

[![Build Status](#)](#) [![License](#)](#)

A simulator for Ragnarok Online, currently focused on the Brazil Ragnarok Online server (bRO). RO Simulator allows users to simulate character builds, equipment, and modifiers without manually inputting all item effects.

---

## Table of Contents

- [RO Simulator](#ro-simulator)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Simulator](#running-the-simulator)
  - [Usage](#usage)
  - [Data Extraction Pipeline](#data-extraction-pipeline)
    - [1. Equipment/Cards Base Info](#1-equipmentcards-base-info)
    - [2. Combo/Modifiers Extraction](#2-combomodifiers-extraction)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

---

## About

Ragnarok Online is a classic MMORPG with a rich equipment and card system. The aim of this project is to let users simulate their characters with all item combos and effects automatically included—no need to manually enter modifiers.

---

## Features

- Full simulation of characters, equipment, cards, and modifiers
- Automatic extraction and parsing of item effects and combos
- Support for bRO item data



---

## Getting Started

### Prerequisites

- Node.js (vXX+)
- npm, yarn, pnpm, or bun
- Access to `item_info.lub` from the bRO GRF
- OpenAI API key (for data extraction)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ro-simulator.git
cd ro-simulator

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Simulator

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

---

## Usage

- Add your items or equipment as instructed by the UI or CLI.
- The simulator will automatically apply all known combos and modifiers.
- For advanced usage and data extraction, see below.

---

## Data Extraction Pipeline

> [!Note]
> Some steps require an OpenAI API key and may incur costs.

### 1. Equipment/Cards Base Info

Extract cards and equipment data from `item_info.lub` (from the GRF) and store in `equipments.json` and `cards.json`. These files contain basic info (name, description, base stats, slots, etc.), but not combos/modifiers.

### 2. Combo/Modifiers Extraction

Use LLMs to extract structured data from item descriptions.

To extract all combos and modifiers, run:

```bash
npm run parse-modifiers-batch <name>
```

- `<name>`: Used to create a folder in `./tmp/<name>` for parser states.
- Requires an OpenAI API key (set as an environment variable).
- Estimated cost: ~$18 USD for a full run.
- The script is resumable; if interrupted, rerun to continue from the last state.

For type definitions, see the `engine` folder. Parsing logic and prompts are in `lib/modifiersParser`.

---

## Project Structure

```
ro-sim/
├── engine/              # Core simulation logic and types
├── lib/                 # Parsing logic, prompts, utilities
├── scripts/             # Data extraction and batch processing scripts
├── tmp/                 # Temporary files for extraction state
├── public/              # Static assets (if applicable)
├── src/                 # Frontend or CLI source code
└── README.md
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

[MIT](./LICENSE)
