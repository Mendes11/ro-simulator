// ElementTypes is a binary mask of all elements in the game
export enum ElementTypes {
    Neutral = 1 << 0, // Maps to Neutro
    Water = 1 << 1, // Maps to Água
    Earth = 1 << 2, // Maps to Terra
    Fire = 1 << 3, // Maps to Fogo
    Wind = 1 << 4, // Maps to Vento 
    Poison = 1 << 5, // Maps to Veneno
    Holy = 1 << 6, // Maps to Sagrado
    Dark = 1 << 7, // Maps to Sombrio
    Ghost = 1 << 8, // Maps to Fantasma
    Undead = 1 << 9, // Maps to Maldito
    All = ((~1 >>> 0) + 1), // Returns all bits turned on.
}
