import { EquipmentLocations, EquipmentSubTypes, EquipmentTypes, iEquipment } from "@/types/equipment"
import { EquipmentSearchArgs } from "@/types/repositories"
import { promises as fs } from "fs";
import path from "path";

let file: string;

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    console.log("Loading equipments.json from Bucket");
    const url = "https://uhajjqevycyljnw0.public.blob.vercel-storage.com/equipments-Kq7jYKiOKX6NlRCH5TEqihx3SUID2y.json"
    file = await fetch(url).then(res => res.text())
} else {
    file = await fs.readFile(path.join(process.cwd(), "equipments.json"), 'utf-8');
}

export class LocalEquipmentRepository {
    equipments: {[k: string]: iEquipment}
    typeIndex: Map<EquipmentTypes, string[]>;
    subTypeIndex: Map<EquipmentSubTypes, string[]>;
    locationIndex: Map<EquipmentLocations, string[]>;


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

            if (eqp.location != null) {
                if (this.locationIndex.get(eqp.location) == null) {
                    this.locationIndex.set(eqp.location, []);
                }
                this.locationIndex.get(eqp.location)?.push(id);
            }

        })
        console.log("Finished Indexing Equipments.");

    }

    async Find(id: number): Promise<iEquipment> {
        return this.equipments[id.toString()] as iEquipment;
    }

    async Search(query: EquipmentSearchArgs): Promise<iEquipment[]> {
        return Object.values(this.equipments).filter(e => {
            let q = true
            if (query.types) q &&= query.types.includes(e.type);
            if (query.subTypes) q &&= query.subTypes.includes(e.subType)
            if (query.locations) q &&= e.location != null && query.locations.includes(e.location);
            if (query.name) q &&= new RegExp(query.name!, "gi").test(e.name)
            return q
        })
    }
}
