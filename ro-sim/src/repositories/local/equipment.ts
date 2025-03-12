import { ItemLocations, ItemSubTypes, ItemTypes, iEquipment } from "@/types/equipment"
import { EquipmentSearchArgs } from "@/types/repositories"
import { promises as fs } from "fs";
import path from "path";

let file: string;

if (process.env.NODE_ENV === "production") {
    console.log("Loading equipments.json from Bucket");
    const url = "https://uhajjqevycyljnw0.public.blob.vercel-storage.com/equipments-Kq7jYKiOKX6NlRCH5TEqihx3SUID2y.json"
    file = await fetch(url).then(res => res.text())
} else {
    file = await fs.readFile(path.join(process.cwd(), "equipments.json"), 'utf-8');
}

export class LocalEquipmentRepository {
    equipments: {[k: string]: iEquipment}
    typeIndex: Map<ItemTypes, string[]>;
    subTypeIndex: Map<ItemSubTypes, string[]>;
    locationIndex: Map<ItemLocations, string[]>;


    public constructor() {
        this.equipments = JSON.parse(file);
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

    async Find(id: number): Promise<iEquipment> {
        return this.equipments[id.toString()] as iEquipment;
    }

    async Search(query: EquipmentSearchArgs): Promise<iEquipment[]> {
        console.log(`File Size is ${file.length}`)
        console.log(`Equipments object is`);
        Object.values(this.equipments).slice(0, 30).forEach((v => console.log(v)));
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
