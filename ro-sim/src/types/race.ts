export enum RaceTypes {
    Formless = 1 << 0,
    Undead = 1 << 1,
    Brute = 1 << 2,
    Plant = 1 << 3,
    Insect = 1 << 3,
    Fish = 1 << 5,
    Demon = 1 << 6,
    Human = 1 << 7,
    Demihuman = 1 << 8,
    Angel = 1 << 9,
    Dragon = 1 << 10,
    All = ((~1 >>> 0) + 1), // Returns all bits turned on.
}
