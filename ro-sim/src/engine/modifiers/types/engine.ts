import { iCharacterModifiers, ModifierApplyData } from "@/engine/types/equipment";


// A Modifier returns the CharacterModifier structure based on implementation rules.
// As part of those rules, it may require conditions to be checked prior to that.
// If those conditions do not check, it shouldn't return any modifier.
export interface iModifier {
    getModifier: (data: ModifierApplyData) => iCharacterModifiers | undefined;
}
