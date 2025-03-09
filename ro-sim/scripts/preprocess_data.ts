import { iEquipment, ItemLocations, ItemSubTypes, ItemTypes } from "@/types/equipment"
import { SlotTypes } from "@/types/card"
import { writeFileSync } from "fs"
import { parseJsonFile } from "next/dist/build/load-jsconfig"

const items = parseJsonFile("../scrapper/raw_items.json")

const SubTypeRegex = [
    {re: /adaga/i, subType: ItemSubTypes.Dagger},
    {re: /espada$/i, subType: ItemSubTypes.Sword},
    {re: /espada.*m[aã]os/i, subType: ItemSubTypes.TwoHandedSword},
    {re: /lan[cç]a$/i, subType: ItemSubTypes.Spear},
    {re: /lan[cç]a.*m[aã]os/i, subType: ItemSubTypes.TwoHandedSpear},
    {re: /machado$/i, subType: ItemSubTypes.Axe},
    {re: /machado.*m[aã]os/i, subType: ItemSubTypes.TwoHandedAxe},
    {re: /ma[cç]a$/i, subType: ItemSubTypes.Mace},
    {re: /arco$/i, subType: ItemSubTypes.Bow},
    {re: /katar$/i, subType: ItemSubTypes.Katar},
    {re: /chicote/i, subType: ItemSubTypes.Whip},
    {re: /instrumento/i, subType: ItemSubTypes.Instrument},
    {re: /cajado$/i, subType: ItemSubTypes.Staff},
    {re: /cajado.*\bduas\s+m[aã]os/i, subType: ItemSubTypes.TwoHandedStaff},
    {re: /rifle/i, subType: ItemSubTypes.Rifle},
    {re: /pistola/i, subType: ItemSubTypes.Pistol},
    {re: /metralhadora/i, subType: ItemSubTypes.MachineGun},
    {re: /espingarda/i, subType: ItemSubTypes.Shotgun},
    {re: /lan[cç]a.*granadas?/i, subType: ItemSubTypes.GrenadeLauncher},
    {re: /.*huuma/i, subType: ItemSubTypes.ShurikenHuuma},
    {re: /soqueira/i, subType: ItemSubTypes.FistWeapon},
    {re: /livro/i, subType: ItemSubTypes.Book},
    {re: /armadura/i, subType: ItemSubTypes.Armor},
    {re: /escudo/i, subType: ItemSubTypes.Shield},
    {re: /equip.*\b.*cabeça/i, subType: ItemSubTypes.Headgear},
    {re: /capa/i, subType: ItemSubTypes.Garment},
    {re: /cal[cç]ado/i, subType: ItemSubTypes.Shoes},
    {re: /\bacess[oó]rio$/i, subType: ItemSubTypes.Accessory},
    {re: /\baces.*\bdir.*\b$/i, subType: ItemSubTypes.AccessoryRight},
    {re: /\baces.*\besq.*\b$/i, subType: ItemSubTypes.AccessoryLeft},
    {re: /equip.*\bsombrio/i, subType: ItemSubTypes.ShadowEquipment},
    {re: /carta/i, subType: ItemSubTypes.Card},
]

const LocationRegex = [
    {re: /\barma\b/i, location: ItemLocations.Weapon},
    {re: /\bluvas\b/i, location: ItemLocations.Weapon},
    {re: /\barmadura\b/i, location: ItemLocations.Armor},
    {re: /\bmalha\b/i, location: ItemLocations.Armor},
    {re: /\bescudo\b/i, location: ItemLocations.Shield},
    {re: /\bcal[çc]ado\b/i, location: ItemLocations.Shoes},
    {re: /\bgrevas\b/i, location: ItemLocations.Shoes},
    {re: /\bequip.*\bcabe[cç]a/i, location: ItemLocations.Headgear},
    {re: /\bcapa/i, location: ItemLocations.Cloack},
    {re: /\btopo\b/i, location: ItemLocations.Upper},
    {re: /\bmeio\b/i, location: ItemLocations.Mid},
    {re: /\bbaixo\b/i, location: ItemLocations.Bottom},
    {re: /\bacess[oó]rio$/i, location: ItemLocations.Acessory},
    {re: /\baces.*\bdir.*\b$/i, location: ItemLocations.AccessoryRight},
    {re: /\bbrincos?/i, location: ItemLocations.AccessoryRight},
    {re: /\baces.*\besq.*\b$/i, location: ItemLocations.AccessoryLeft},
    {re: /\bcolar/i, location: ItemLocations.AccessoryLeft},
]



const equipments: {[key: string]: iEquipment} = {}

const subTypeToEnum = (value: string) => {
    const subType = SubTypeRegex.find(({re}) => {
        return re.test(value)
    });
    return subType?.subType;
}

const subTypeToTypeEnum = (subType: ItemSubTypes) => {
    switch(subType) {
        case ItemSubTypes.Dagger:
        case ItemSubTypes.Sword:
        case ItemSubTypes.TwoHandedSword:
        case ItemSubTypes.Spear:
        case ItemSubTypes.TwoHandedSpear:
        case ItemSubTypes.Axe:
        case ItemSubTypes.TwoHandedAxe:
        case ItemSubTypes.Mace:
        case ItemSubTypes.Bow:
        case ItemSubTypes.Katar:
        case ItemSubTypes.Whip:
        case ItemSubTypes.Instrument:
        case ItemSubTypes.Staff:
        case ItemSubTypes.TwoHandedStaff:
        case ItemSubTypes.Rifle:
        case ItemSubTypes.Pistol:
        case ItemSubTypes.GrenadeLauncher:
        case ItemSubTypes.MachineGun:
        case ItemSubTypes.Shotgun:
        case ItemSubTypes.ShurikenHuuma:
        case ItemSubTypes.FistWeapon:
        case ItemSubTypes.Book:
            return ItemTypes.Weapon;

        case ItemSubTypes.Armor:
        case ItemSubTypes.Shield:
        case ItemSubTypes.Garment:
        case ItemSubTypes.Shoes:
        case ItemSubTypes.Headgear:
        case ItemSubTypes.Accessory:
        case ItemSubTypes.AccessoryLeft:
        case ItemSubTypes.AccessoryRight:
            return ItemTypes.Armor;
        case ItemSubTypes.ShadowEquipment:
            return ItemTypes.ShadowEquipment;
        case ItemSubTypes.Card:
            return null;
    }
}

const locationToEnum = (value: string) => {
    const location = LocationRegex.find(({re}) => {
        return re.test(value)
    });
    return location?.location;
}


Object.keys(items).forEach((id: string) => {
    if (items[id].sub_type === undefined || ["Isca", "Roupa", "Visual"].includes(items[id].sub_type)) {
        return
    }

    const subType = subTypeToEnum(items[id].sub_type);
    if (subType == null) {
        console.log(`SubType ${items[id].sub_type} not found for item: ${id}`);
        return;
    }

    const type = subTypeToTypeEnum(subType);
    if (type == null) {
        console.log(`Type not found for subType ${ItemSubTypes[subType]} for item: ${id}`);
        return;
    }

    const location = locationToEnum(items[id].location)
    if (!!items[id].location && location == null) {
        console.log(`Location ${items[id].location} no found for item: ${id}`);
        return
    }

    const slotsCount = parseInt(items[id].slots_count) || 0;
    const slotsConfig = [...Array(slotsCount).keys()].map(() => ({
        allowedTypes: [SlotTypes.Card],
    }));



    equipments[id] = {
        id: parseInt(id),
        type: type,
        subType: subType,
        location: location,
        name: items[id].name,
        description: items[id].description,
        slotConfigs: slotsConfig,
        weight: items[id].weight || 0,
        minLevel: items[id].level || 1,
        weaponLevel: items[id].weapon_level,
    };
})

writeFileSync("./equipments.json", JSON.stringify(equipments))

