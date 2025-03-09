export enum ElementTypes {
    Neutral = 1 << 0,
    Water = 1 << 1,
    Earth = 1 << 2,
    Fire = 1 << 3,
    Wind = 1 << 4,
    Poison = 1 << 5,
    Holy = 1 << 6,
    Dark = 1 << 7,
    Ghost = 1 << 8,
    Undead = 1 << 9,
    All = ((~1 >>> 0) + 1), // Returns all bits turned on.
}
