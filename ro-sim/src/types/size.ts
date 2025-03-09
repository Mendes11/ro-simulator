export enum SizeTypes {
    Small = 1 << 0,
    Medium = 1 << 1,
    Large = 1 << 2,
    All = ((~1 >>> 0) + 1), // Returns all bits turned on.
}
