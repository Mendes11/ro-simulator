// SizeTypes is a binary mask of all possible sizes in the game.
export enum SizeTypes {
    Small = 1 << 0, // Maps to Pequeno
    Medium = 1 << 1, // Maps to Médio
    Large = 1 << 2, // Maps to Grande
    All = ((~1 >>> 0) + 1), // Returns all bits turned on.
}
