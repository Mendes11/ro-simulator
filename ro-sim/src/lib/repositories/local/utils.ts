import fs from "fs";

export function loadEquipmentsFile(): string {
    return fs.readFileSync(process.cwd() + "/src/lib/repositories/local/equipments.json", 'utf-8');
}

export function loadCardsFile(): string {
    return fs.readFileSync(process.cwd() + "/src/lib/repositories/local/cards.json", 'utf-8');
}

export function loadModifiersFile(): string {
    return fs.readFileSync(process.cwd() + "/src/lib/repositories/local/items-modifiers.json", 'utf-8');
}
