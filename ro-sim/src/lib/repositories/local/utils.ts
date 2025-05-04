import fs from "fs";
import path from "path";

export function loadEquipmentsFile(): string {
    return fs.readFileSync(path.join(process.cwd(), "db", "equipments.json"), 'utf-8');
}

export function loadCardsFile(): string {
    return fs.readFileSync(path.join(process.cwd(), "db", "cards.json"), 'utf-8');
}

export function loadModifiersFile(): string {
    return fs.readFileSync(path.join(process.cwd(), "db", "items-modifiers.json"), 'utf-8');
}
