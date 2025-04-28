import { ItemLocations } from "@/engine/types/enums";
import { iEquipment, ItemSubTypes, ItemTypes } from "@/engine/types/equipment";
import { EquipmentSearchArgs } from "@/engine/types/repositories";
import { promises as fs } from "fs";
import path from "path";

let file: string;
let modifiersFile: string;

if (process.env.NODE_ENV === "production") {
    console.log("Loading equipments.json from Bucket");
    const url = "https://uhajjqevycyljnw0.public.blob.vercel-storage.com/equipments-oOSw0T5xmKFjIxM942MeVrgmwEqFPE.json"
    file = await fetch(url).then(res => res.text())
    modifiersFile = await fs.readFile(path.join(process.cwd(), "equipments-modifiers.json"), 'utf-8');
} else {
    console.log('Loading %s', path.join(process.cwd(), "equipments.json"));
    file = await fs.readFile(path.join(process.cwd(), "equipments.json"), 'utf-8');
    modifiersFile = await fs.readFile(path.join(process.cwd(), "equipments-modifiers.json"), 'utf-8');
}

export class LocalEquipmentRepository {
    equipments: {[k: string]: iEquipment}
    typeIndex: Map<ItemTypes, string[]>;
    subTypeIndex: Map<ItemSubTypes, string[]>;
    locationIndex: Map<ItemLocations, string[]>;


    public constructor() {
        this.equipments = JSON.parse(file);
        const modifiers = JSON.parse(modifiersFile);
        Object.keys(modifiers).forEach(id => {
            if (modifiers[id].status != "failed") {
                this.equipments[id].modifiers = modifiers[id].modifiers;
            }
        })
        this.typeIndex = new Map();
        this.subTypeIndex = new Map();
        this.locationIndex = new Map();
        console.log(`Loaded ${Object.keys(this.equipments).length} equipments`)
        console.log("Indexing Equipments...");

        Object.keys(this.equipments).forEach(id => {
            const eqp = this.equipments[id];
            if (eqp.type != null) {
                if (this.typeIndex.get(eqp.type) == null) {
                    this.typeIndex.set(eqp.type, []);
                }
                this.typeIndex.get(eqp.type)?.push(id);
            }

            if (eqp.subType != null) {
                if (this.subTypeIndex.get(eqp.subType) == null) {
                    this.subTypeIndex.set(eqp.subType, []);
                }
                this.subTypeIndex.get(eqp.subType)?.push(id);
            }

            if (eqp.allowedLocations != null) {
                eqp.allowedLocations.forEach(l => {
                    if (this.locationIndex.get(l) == null) {
                        this.locationIndex.set(l, []);
                    }
                    this.locationIndex.get(l)?.push(id);
                })
            }
        })
        console.log("Finished Indexing Equipments.");

    }

    async All(): Promise<iEquipment[]> {
        return new Promise((resolve) => {
            resolve(
                Object.keys(this.equipments).map(k => this.equipments[k] as iEquipment)
            )
        })
        
    }

    async Find(id: number): Promise<iEquipment> {
        return this.equipments[id.toString()] as iEquipment;
    }

    async Search(query: EquipmentSearchArgs): Promise<iEquipment[]> {
        console.log(`Searching through ${Object.keys(this.equipments).length} equipments...`);
        return Object.values(this.equipments).filter(e => {
            let q = true
            if (query.name && !(new RegExp(query.name!, "gi").test(e.name))) return false;
            if (query.types && !query.types.includes(e.type)) return false;
            if (query.subTypes && !query.subTypes.includes(e.subType!)) return false;
            if (query.locations) {
                q &&= e.allowedLocations != null
                q &&= query.locations.some((l) => e.allowedLocations?.some(ll => ll & l));
            }
            return q
        })
    }
}
