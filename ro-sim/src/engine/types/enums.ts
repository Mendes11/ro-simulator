
// ElementTypes is a binary mask of all elements in the game
export enum ElementTypes {
    Neutral = 1 << 0,// Maps to Neutro
    Water = 1 << 1,// Maps to Água
    Earth = 1 << 2,// Maps to Terra
    Fire = 1 << 3,// Maps to Fogo
    Wind = 1 << 4,// Maps to Vento 
    Poison = 1 << 5,// Maps to Veneno
    Holy = 1 << 6,// Maps to Sagrado
    Dark = 1 << 7,// Maps to Sombrio
    Ghost = 1 << 8,// Maps to Fantasma
    Undead = 1 << 9,// Maps to Maldito
    All = ((~1 >>> 0) + 1)
}

// RaceTypes is a binary mask of all possible Races in the game.
export enum RaceTypes {
    Formless = 1 << 0,// Maps to Amorfo
    Undead = 1 << 1,// Maps to Morto-Vivo
    Brute = 1 << 2,// Maps to Bruto
    Plant = 1 << 3,// Maps to Planta
    Insect = 1 << 3,// Maps to Inseto
    Fish = 1 << 5,// Maps to Peixe
    Demon = 1 << 6,// Maps to Demônio
    Human = 1 << 7,// Maps to Humano
    Demihuman = 1 << 8,// Maps to Humanoide
    Angel = 1 << 9,// Maps to Anjo
    Dragon = 1 << 10,// Maps to Dragão
    All = ((~1 >>> 0) + 1)
}

// SizeTypes is a binary mask of all possible sizes in the game.
export enum SizeTypes {
    Small = 1 << 0,// Maps to Pequeno
    Medium = 1 << 1,// Maps to Médio
    Large = 1 << 2,// Maps to Grande
    All = ((~1 >>> 0) + 1)
}

// TargetTypes indicates that the multiplier will be applied to
// a specific type of monster.
// Eg: Abysmal Knight:
//    - multiplier = 25%
//    - attackType: Physical
//    - targetType: Boss
//    - multiplierType: Default
export enum TargetTypes {
    All,
    Normal,// Maps to Normal
    SemiBoss,// LLM Hint: Not used
    Boss

}

export enum JobIds {
    Novice = "Novice",
    Assassin = "Assassin",
    AssassinCross = "AssassinCross"
}
// ItemLocations allow for use of OR operation for items that require multiple slots
// Eg:
//  If the item takes Upper and Mid, use HeadUpper | HeadMid
//  If the item is a two handed sword, use RighHand | LeftHand


export enum ItemLocations {
    HeadUpper = 1 << 0,// Maps to Topo
    HeadMid = 1 << 1,// Maps to Meio
    HeadBottom = 1 << 2,// Maps to Baixo

    Armor = 1 << 3,// Maps to Armadura
    RightHand = 1 << 4,// Maps to Mão Direita
    LeftHand = 1 << 5,// Maps to Mão Esquerda
    Garment = 1 << 6,// Maps to Capa
    Shoes = 1 << 7,// Maps to Sapatos

    // LLM Hint: When the accessory placement doesn't matter, use RightAcessory | LeftAccessory to account for both.
    RightAccessory = 1 << 8,// Maps to Acessório Direito
    LeftAccessory = 1 << 9,// Maps to Acessório Esquerdo
    Ammo = 1 << 10,

    // Composed Locations
    BothHands = RightHand | LeftHand,
    HeadUpperMid = HeadUpper | HeadMid,
    HeadUpperMidBottom = HeadUpper | HeadMid | HeadBottom,
    HeadUpperBottom = HeadUpper | HeadBottom,
    HeadMidBottom = HeadMid | HeadBottom

}

