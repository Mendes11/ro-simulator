import { ItemLocations } from "@/engine/types/enums";
import { matchInt, matchString } from "./util";
import { cardPlacementMap, subTypeToAttackRange, typeLocationMap, typesMap } from "./typesMap";
import { iArmor, iEquipment, iItem, ItemSubTypes, ItemTypes, iWeapon, WeaponSubTypes } from "@/engine/types/equipment";
import { iCard } from "@/engine/types/card";

type ItemBlock = {
    id: number;
    name: string;
    description: string;
    slots: number
}

type Item = ItemBlock & {
    type?: ItemTypes;
    subType?: ItemSubTypes;
    allowedLocations?: ItemLocations[];
}


export class ItemParser {
    private BLOCK_MATCHER = /\[(\d+)] = {([\s\S]*?)}(?=,\s+\[|\s+})/gi
    private NAME_MATCHER = /\bidentifiedDisplayName\b.*?"(.*?)"/i
    private SLOTS_MATCHER = /slotCount = (\d+)/i

    items: iItem[];
    types: Set<string>;
    unmappedTypes: Set<string>;
    unmappedLocations: Set<{id: number, name: string, type: ItemTypes, subType?: ItemSubTypes, location: string}>;

    public constructor() {
        this.items = []
        this.types = new Set<string>();
        this.unmappedTypes = new Set<string>();
        this.unmappedLocations = new Set();

    }

    public parse(content: string): iItem[] {
        this.iterateItems(content, (item) => {
            const data = this.parseDescription(item);

            if (data != null) this.items.push(data);
        })
        return this.items;
    }

    protected iterateItems(content: string, callback: (item: ItemBlock)=>void) {
        for (const match of content.matchAll(this.BLOCK_MATCHER)) {
            const block = match[2]
            const item = {
                id: parseInt(match[1]),
                name: "",
                description: "",
                slots: 0,
            }

            const nameMatch = this.NAME_MATCHER.exec(block);
            if (nameMatch == null || nameMatch.length < 2) continue;
            item.name = nameMatch[1];

            const descriptionMatch = /\bidentifiedDescriptionName\b.*?\{([\s\S]*?)\}/gi.exec(block);
            if (descriptionMatch != null && descriptionMatch?.length > 1) {
                item.description = descriptionMatch[1].split("\",").map(l => l.trim().replace(/^"/i, "")).join('\r\n');
            }

            const slotCountMatch = this.SLOTS_MATCHER.exec(block);
            if (slotCountMatch != null && slotCountMatch?.length > 1) {
                item.slots = parseInt(slotCountMatch[1]);
            }

            callback(item)
        }
    }

    protected parseDescription(itemBlock: Item): iArmor | iWeapon | iCard | undefined {
        const item: Item = itemBlock;
        const ret = this.parseType(itemBlock.description);
        if (ret != null) {
            item.type = ret.type;
            item.subType = ret.subType;
            item.allowedLocations = ret.locations;
        }
        if (item.type == null) return;

        switch (item.type) {
        case ItemTypes.Armor:
            return this.parseArmorData(item);
        case ItemTypes.Weapon:
            return this.parseWeaponData(item);
        case ItemTypes.Card:
            return this.parseCardData(item);
        case ItemTypes.ShadowEquipment:
            return this.parseShadowEquipmentData(item);
        default:
            return
        }
    }

    protected parseType(description: string)   {
        const typeStr = matchString(description, "Tipo.*?", "Classe")
        if (typeStr == null) return {type: ItemTypes.ETC};
        const t = typesMap[typeStr];
        if (t == null) this.unmappedTypes.add(typeStr);
        return t;
    }

    protected parseLocation(type: ItemTypes, itemBlock: ItemBlock) {
        const locationStr = matchString(itemBlock.description, "Equipado em", "Equipa em", "Posi[çc][aã]o");
        if (locationStr != null && typeLocationMap[type] != null) {
            const ret = typeLocationMap[type][locationStr.trim()];
            if (ret == null) {
                this.unmappedLocations.add({id: itemBlock.id, name: itemBlock.name, type: type, location: locationStr});
                return
            }
            return ret;
        }
    }

    protected parseWeaponData(item: Item): iWeapon | undefined {
        if (item.subType == null || item.allowedLocations == null) {
            const ret = this.parseLocation(item.type!, item);
            if (ret == null) return;
            if (item.subType == null) item.subType = ret.subType;
            item.allowedLocations = ret.locations;
        }
        return {
            ...this.parseEquipmentData(item),
            weaponLevel: matchInt(item.description, "N[íi]vel\\s.*?arma") ?? 1,
            weaponAtk: matchInt(item.description, "Ataque", "ATQ") ?? 0,
            weaponMAtk: matchInt(item.description, "ATQM") ?? 0,
            attackRange: subTypeToAttackRange[item.subType as WeaponSubTypes]
        }
    }

    protected parseArmorData(item: Item): iArmor | undefined {
        if (item.subType == null || item.allowedLocations == null) {
            const ret = this.parseLocation(item.type!, item);
            if (ret == null) return;
            if (item.subType == null) item.subType = ret.subType;
            item.allowedLocations = ret.locations;
        }
        return {
            ...this.parseEquipmentData(item),
            equipDef: matchInt(item.description, "DEF", "Defesa") ?? 0,
            equipMDef: matchInt(item.description, "DEFM") ?? 0,
        }
    }

    protected parseEquipmentData(item: Item): iEquipment {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            slots: item.slots,
            type: item.type!,
            subType: item.subType,
            allowedLocations: item.allowedLocations,
            minLevel: matchInt(item.description, "N[íi]vel\\snecess[aá]rio") ?? 1,
            weight: matchInt(item.description, "Peso") ?? 0,
        }
    }

    protected parseCardData(item: Item): iCard | undefined {
        const locationStr = matchString(item.description, "Equipado em", "Equipa em", "Posi[çc][aã]o");
        if (locationStr == null) return;
        if (locationStr != null) {
            if (cardPlacementMap[locationStr] == null) {
            this.unmappedLocations.add({id: item.id, name: item.name, type: item.type!, subType: item.subType, location: locationStr});
            return
            }
        }
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            type: item.type!,
            subType: item.subType,
            ...cardPlacementMap[locationStr]
        }
    }

    protected parseShadowEquipmentData(item: Item): iEquipment | undefined {
        if (item.subType == null || item.allowedLocations == null) {
            const ret = this.parseLocation(item.type!, item);
            if (ret == null) return;
            if (item.subType == null) item.subType = ret.subType;
            item.allowedLocations = ret.locations;
        }
        return {
            ...this.parseEquipmentData(item),
            slots: 0,
        }
    }

}
