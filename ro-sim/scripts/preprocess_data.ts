import { iEquipment, EquipmentLocations, EquipmentSubTypes, EquipmentTypes } from "@/types/equipment"
import { SlotTypes } from "@/types/slot"
import { writeFileSync } from "fs"
import { parseJsonFile } from "next/dist/build/load-jsconfig"

const items = parseJsonFile("../scrapper/raw_items.json")

const SubTypeRegex = [
    {re: /adaga/i, subType: EquipmentSubTypes.Dagger},
    {re: /espada$/i, subType: EquipmentSubTypes.Sword},
    {re: /espada.*m[aã]os/i, subType: EquipmentSubTypes.TwoHandedSword},
    {re: /lan[cç]a$/i, subType: EquipmentSubTypes.Spear},
    {re: /lan[cç]a.*m[aã]os/i, subType: EquipmentSubTypes.TwoHandedSpear},
    {re: /machado$/i, subType: EquipmentSubTypes.Axe},
    {re: /machado.*m[aã]os/i, subType: EquipmentSubTypes.TwoHandedAxe},
    {re: /ma[cç]a$/i, subType: EquipmentSubTypes.Mace},
    {re: /arco$/i, subType: EquipmentSubTypes.Bow},
    {re: /katar$/i, subType: EquipmentSubTypes.Katar},
    {re: /chicote/i, subType: EquipmentSubTypes.Whip},
    {re: /instrumento/i, subType: EquipmentSubTypes.Instrument},
    {re: /cajado$/i, subType: EquipmentSubTypes.Staff},
    {re: /cajado.*\bduas\s+m[aã]os/i, subType: EquipmentSubTypes.TwoHandedStaff},
    {re: /rifle/i, subType: EquipmentSubTypes.Rifle},
    {re: /pistola/i, subType: EquipmentSubTypes.Pistol},
    {re: /metralhadora/i, subType: EquipmentSubTypes.MachineGun},
    {re: /espingarda/i, subType: EquipmentSubTypes.Shotgun},
    {re: /lan[cç]a.*granadas?/i, subType: EquipmentSubTypes.GrenadeLauncher},
    {re: /.*huuma/i, subType: EquipmentSubTypes.ShurikenHuuma},
    {re: /soqueira/i, subType: EquipmentSubTypes.FistWeapon},
    {re: /livro/i, subType: EquipmentSubTypes.Book},
    {re: /armadura/i, subType: EquipmentSubTypes.Armor},
    {re: /escudo/i, subType: EquipmentSubTypes.Shield},
    {re: /equip.*\b.*cabeça/i, subType: EquipmentSubTypes.Headgear},
    {re: /capa/i, subType: EquipmentSubTypes.Cloack},
    {re: /cal[cç]ado/i, subType: EquipmentSubTypes.Shoes},
    {re: /\bacess[oó]rio$/i, subType: EquipmentSubTypes.Accessory},
    {re: /\baces.*\bdir.*\b$/i, subType: EquipmentSubTypes.AccessoryRight},
    {re: /\baces.*\besq.*\b$/i, subType: EquipmentSubTypes.AccessoryLeft},
    {re: /equip.*\bsombrio/i, subType: EquipmentSubTypes.ShadowEquipment},
    {re: /carta/i, subType: EquipmentSubTypes.Card},
]

const LocationRegex = [
    {re: /\barma\b/i, location: EquipmentLocations.Weapon},
    {re: /\bluvas\b/i, location: EquipmentLocations.Weapon},
    {re: /\barmadura\b/i, location: EquipmentLocations.Armor},
    {re: /\bmalha\b/i, location: EquipmentLocations.Armor},
    {re: /\bescudo\b/i, location: EquipmentLocations.Shield},
    {re: /\bcal[çc]ado\b/i, location: EquipmentLocations.Shoes},
    {re: /\bgrevas\b/i, location: EquipmentLocations.Shoes},
    {re: /\bequip.*\bcabe[cç]a/i, location: EquipmentLocations.Headgear},
    {re: /\bcapa/i, location: EquipmentLocations.Cloack},
    {re: /\btopo\b/i, location: EquipmentLocations.Upper},
    {re: /\bmeio\b/i, location: EquipmentLocations.Mid},
    {re: /\bbaixo\b/i, location: EquipmentLocations.Bottom},
    {re: /\bacess[oó]rio$/i, location: EquipmentLocations.Acessory},
    {re: /\baces.*\bdir.*\b$/i, location: EquipmentLocations.AccessoryRight},
    {re: /\bbrincos?/i, location: EquipmentLocations.AccessoryRight},
    {re: /\baces.*\besq.*\b$/i, location: EquipmentLocations.AccessoryLeft},
    {re: /\bcolar/i, location: EquipmentLocations.AccessoryLeft},
]



const equipments: {[key: string]: iEquipment} = {}

const subTypeToEnum = (value: string) => {
    const subType = SubTypeRegex.find(({re}) => {
        return re.test(value)
    });
    return subType?.subType;
}

const subTypeToTypeEnum = (subType: EquipmentSubTypes) => {
    switch(subType) {
        case EquipmentSubTypes.Dagger:
        case EquipmentSubTypes.Sword:
        case EquipmentSubTypes.TwoHandedSword:
        case EquipmentSubTypes.Spear:
        case EquipmentSubTypes.TwoHandedSpear:
        case EquipmentSubTypes.Axe:
        case EquipmentSubTypes.TwoHandedAxe:
        case EquipmentSubTypes.Mace:
        case EquipmentSubTypes.Bow:
        case EquipmentSubTypes.Katar:
        case EquipmentSubTypes.Whip:
        case EquipmentSubTypes.Instrument:
        case EquipmentSubTypes.Staff:
        case EquipmentSubTypes.TwoHandedStaff:
        case EquipmentSubTypes.Rifle:
        case EquipmentSubTypes.Pistol:
        case EquipmentSubTypes.GrenadeLauncher:
        case EquipmentSubTypes.MachineGun:
        case EquipmentSubTypes.Shotgun:
        case EquipmentSubTypes.ShurikenHuuma:
        case EquipmentSubTypes.FistWeapon:
        case EquipmentSubTypes.Book:
            return EquipmentTypes.Weapon;

        case EquipmentSubTypes.Armor:
        case EquipmentSubTypes.Shield:
        case EquipmentSubTypes.Cloack:
        case EquipmentSubTypes.Shoes:
        case EquipmentSubTypes.Headgear:
        case EquipmentSubTypes.Accessory:
        case EquipmentSubTypes.AccessoryLeft:
        case EquipmentSubTypes.AccessoryRight:
            return EquipmentTypes.Armor;
        case EquipmentSubTypes.ShadowEquipment:
            return EquipmentTypes.ShadowEquipment;
        case EquipmentSubTypes.Card:
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
        console.log(`Type not found for subType ${EquipmentSubTypes[subType]} for item: ${id}`);
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

