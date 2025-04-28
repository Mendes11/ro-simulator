
export type AttackModifiersData = {
    defBypass: number; // Maps to "Ignora Defesa"
    defMBypass: number; // Maps to "Ignora Defesa Mágica"
    sizePenalty: number; // 1.0 for 100% damage
    thanatosEffect: boolean; // Maps to "Ativa o Efeito de [Investigar]"
};

export interface iAttackModifiers extends AttackModifiersData {
    sum: (other: iAttackModifiers, inplace?: boolean) => iAttackModifiers;
    mul: (n: number, inplace?: boolean) => iAttackModifiers;
}
