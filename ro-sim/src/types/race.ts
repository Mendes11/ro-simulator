// RaceTypes is a binary mask of all possible Races in the game.
export enum RaceTypes {
    Formless = 1 << 0, // Maps to Amorfo
    Undead = 1 << 1, // Maps to Morto-Vivo
    Brute = 1 << 2, // Maps to Bruto
    Plant = 1 << 3, // Maps to Planta
    Insect = 1 << 3, // Maps to Inseto
    Fish = 1 << 5, // Maps to Peixe
    Demon = 1 << 6, // Maps to Demônio
    Human = 1 << 7, // Maps to Humano
    Demihuman = 1 << 8, // Maps to Humanoide
    Angel = 1 << 9, // Maps to Anjo
    Dragon = 1 << 10, // Maps to Dragão
    All = ((~1 >>> 0) + 1), // Returns all bits turned on.
}
