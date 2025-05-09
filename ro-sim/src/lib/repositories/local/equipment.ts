import { ItemLocations } from "@/engine/types/enums";
import { ArmorData, ItemSubTypes, ItemTypes, WeaponData } from "@/engine/types/equipment";
import { EquipmentSearchArgs } from "@/engine/types/repositories";
import { loadEquipmentsFile, loadModifiersFile } from "./utils";
import { ModifierData } from "@/engine/modifiers/types/config";

export class LocalEquipmentRepository {
    equipments: {[k: string]: ArmorData | WeaponData}
    typeIndex: Map<ItemTypes, string[]>;
    subTypeIndex: Map<ItemSubTypes, string[]>;
    locationIndex: Map<ItemLocations, string[]>;


    public constructor() {
        this.equipments = JSON.parse(loadEquipmentsFile());
        const modifiers = JSON.parse(loadModifiersFile());
        Object.entries(modifiers).forEach(([id, modifiers]) => {
            if (this.equipments[id] && modifiers != null) {
                this.equipments[id].modifiers = modifiers as ModifierData[];
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

    async All(): Promise<(ArmorData | WeaponData)[]> {
        return new Promise((resolve) => {
            resolve(
                Object.keys(this.equipments).map(k => this.equipments[k])
            )
        })

    }

    async Find(id: number): Promise<ArmorData | WeaponData> {
        return this.equipments[id.toString()];
    }

    async Search(query: EquipmentSearchArgs): Promise<(ArmorData | WeaponData)[]> {
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
