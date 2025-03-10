import { expect } from 'vitest'
import { engineTest } from './engineTest'
import { ModifierData, ModifierTypes, newModifier } from '@/engine/modifiers/utils'
import { Combo } from '@/engine/modifiers/combo'
import { AttackTypes } from '@/types/attackMultiplier'
import { RaceTypes } from '@/types/race'
import { ComparisonConditions, ConditionTypes, EquipmentSet } from '@/types/condition'
import { execPath } from 'process'
import { Character } from '@/engine/character'
import { ItemTypes } from '@/types/equipment'
import { CharacterModifiers } from '@/engine/characterModifiers'
import { EquipmentSetCondition } from '@/engine/modifiers/conditions/equipmentSetCondition'
import { SizeTypes } from '@/types/size'
import { StatsModifier } from '@/engine/modifiers/statsModifier'


/*
Um chapéu que traz o clima todo de torcida e vibração!
^0000ffFOR +2, INT +1, VIT +1, DES +2, AGI +2, SOR +2, DEFM +1.^000000
Não pode ser derrubado, negociado, colocado no armazém e nem no carrinho.
Classe: ^777777Equipamento para a cabeça^000000
Defesa: ^7777771^000000
Equipa em: ^777777Topo^000000
Peso: ^7777770^000000
Nível necessário: ^7777771^000000
Classes: ^777777Todas^000000\""
*/
engineTest('Test Chapéu do Torneio: Coragem id=5857', ({applyData}) => {
    const data: ModifierData = {
        type: ModifierTypes.Stats,
        data: {
            attributes: {str: 2, int: 1, vit: 1, dex: 2, agi: 2, luk: 2}
        }
    }
    const modifier = newModifier(data)
    const charModifier = modifier.getModifier(applyData)
    expect(charModifier).toBeInstanceOf(CharacterModifiers);
    expect(charModifier!.attributes.str).toBe(2)
    expect(charModifier!.attributes.agi).toBe(2)
    expect(charModifier!.attributes.vit).toBe(1)
    expect(charModifier!.attributes.int).toBe(1)
    expect(charModifier!.attributes.dex).toBe(2)
    expect(charModifier!.attributes.luk).toBe(2)
})


/*
Uma pequena flor para decorar a cabeça.
--------------------------
^0000ffDano mágico +1%.^000000
--------------------------
A cada refino:
^0000ffATQM +2.^000000
--------------------------
Tipo: ^777777Equip. para Cabeça^000000
Equipa em: ^777777Topo^000000
DEF: ^7777770^000000 DEFM: ^7777770^000000
Peso: ^77777710^000000
Nível necessário: ^777777120^000000
Classes: ^777777Todas^000000\""
*/
engineTest('Test Florzinha Ilusional id=19247', ({applyData}) => {
    const modifiers: ModifierData[] = [
        {
            type: ModifierTypes.Stats,
            data: {
                attackMultipliers: {
                    default: 1.0 / 100.0,
                }
            }
        },
        {
            type: ModifierTypes.Refinement,
            data: {
                refinementSteps: 1,
                modifier: {
                    type: ModifierTypes.Stats,
                    data: {
                        subStats: {
                            eMatk: 2,
                        }
                    }
                }
            }
        }
    ]
    const charModifiers = modifiers.map(m => 
        newModifier(m).getModifier(applyData)
    )
    expect(charModifiers[0]).toBeDefined();
    expect(charModifiers[1]).toBeDefined();
    
    expect(charModifiers[0]!.attackMultipliers.default).toBe(0.01);
    expect(charModifiers[1]!.subStats.eMatk).toBe(0);
});

engineTest('+10 Test Florzinha Ilusional id=19247', ({applyData}) => {
    applyData.source.instance.refinement = 10;
    const modifiers: ModifierData[] = [
        {
            type: ModifierTypes.Stats,
            data: {
                attackMultipliers: {
                    default: 1.0 / 100.0,
                }
            }
        },
        {
            type: ModifierTypes.Refinement,
            data: {
                refinementSteps: 1,
                modifier: {
                    type: ModifierTypes.Stats,
                    data: {
                        subStats: {
                            eMatk: 2,
                        }
                    }
                }
            }
        }
    ]
    const charModifiers = modifiers.map(m => 
        newModifier(m).getModifier(applyData)
    )
    expect(charModifiers[0]).toBeDefined();
    expect(charModifiers[1]).toBeDefined();
    
    expect(charModifiers[0]!.attackMultipliers.default).toBe(0.01);
    expect(charModifiers[1]!.subStats.eMatk).toBe(20);
});

/*
Encontrada na vila dos Orcs, essa arma é símbolo dos guerreiros que protegem a tribo.
--------------------------
A cada 3 refinos:
^0000ffATQ e ATQM +40.^000000
--------------------------
Refino +6 ou mais:
^0000ffDano físico e mágico contra todas as raças +10%.^000000
Refino +9 ou mais:
^0000ffDano físico e mágico contra todas as raças +15% adicional.^000000
^0000ffAo realizar ataques físicos, 7% de chance de autoconjurar [Impacto Meteoro] nv.5. ^000000
--------------------------
^fa4e09Conjunto^000000
^fa4e09[Anel dos Orcs]^000000
^0000ffATQ e ATQM +70.^000000
--------------------------
Tipo: ^777777Adaga^000000
ATQ: ^777777130^000000 ATQM: ^777777110^000000
Peso: ^77777765^000000
Nível da arma: ^7777774^000000
Nível necessário: ^7777771^000000
Classes: ^777777Aprendizes, Espadachins, Magos, Arqueiros, Mercadores, Gatunos, Espiritualistas, Ninjas e evoluções^000000\"
*/
engineTest('+12 Adaga dos Orcs - Combo 1 - id=510147',  ({applyData}) => {
    applyData.source.instance.refinement = 12;
    const modifier = newModifier({
        type: ModifierTypes.Refinement, data: {
            refinementSteps: 3, 
            modifier: {
                type: ModifierTypes.Stats,
                data: {subStats: {eAtk: 40, eMatk: 40}}
            }
        }
    })
    const modifierSum = modifier.getModifier(applyData)
    expect(modifierSum).toBeDefined();
    expect(modifierSum!.subStats.eAtk).eq(160);
    expect(modifierSum!.subStats.eMatk).eq(160);
});

/*
--------------------------
Refino +6 ou mais:
^0000ffDano físico e mágico contra todas as raças +10%.^000000
Refino +9 ou mais:
^0000ffDano físico e mágico contra todas as raças +15% adicional.^000000
^0000ffAo realizar ataques físicos, 7% de chance de autoconjurar [Impacto Meteoro] nv.5. ^000000
--------------------------
*/
engineTest('Adaga dos Orcs - Combo 2 - id=510147', ({applyData}) => {
    applyData.summary.attackInfo.attackType = AttackTypes.Physical;
    applyData.summary.target.race = RaceTypes.Human;
    const modifier = newModifier({
        type: ModifierTypes.Stats,
        data: {
            attackMultipliers: {
                race: 0.1,
            },
        },
        conditions: [{
            type: ConditionTypes.Refinement,
            data: {
                refinement: 6,
                condition: ComparisonConditions.GTE
            }
        }, {
            type: ConditionTypes.AttackType,
            data: {
                attackType: AttackTypes.Physical || AttackTypes.Magic,
            }
        }, {
            type: ConditionTypes.Target,
            data: {
                race: RaceTypes.All
            }
        }]
    })
    applyData.source.instance.refinement = 0;
    let modifierSum = modifier.getModifier(applyData);
    expect(modifierSum).toBeUndefined();
    
    applyData.source.instance.refinement = 6;
    modifierSum = modifier.getModifier(applyData);
    expect(modifierSum?.attackMultipliers.race).toBe(0.1);
});

engineTest('+9 Adaga dos Orcs - Combo 3 - id=510147', ({applyData}) => {
    applyData.summary.attackInfo.attackType = AttackTypes.Physical;
    applyData.summary.target.race = RaceTypes.Human;
    const modifier = newModifier({
        type: ModifierTypes.Stats,
        data: {
            attackMultipliers: {
                race: 0.15,
            },
        },
        conditions: [{
            type: ConditionTypes.Refinement,
            data: {
                refinement: 9,
                condition: ComparisonConditions.GTE
            }
        }, {
            type: ConditionTypes.AttackType,
            data: {
                attackType: AttackTypes.Physical || AttackTypes.Magic,
            }
        }, {
            type: ConditionTypes.Target,
            data: {
                race: RaceTypes.All
            }
        }]
    })
    applyData.source.instance.refinement = 6;
    expect(modifier.getModifier(applyData)).toBeUndefined();
    
    applyData.source.instance.refinement = 9;
    expect(modifier.getModifier(applyData)).toBeDefined();
    
    const modifierSum = modifier.getModifier(applyData);
    expect(modifierSum?.attackMultipliers.race).eq(0.15)
});

engineTest('Adaga dos Orcs - Combo 4 - Conjunto Anel Orcs - id=510147', ({applyData}) => {
    const modifier = newModifier({
        type: ModifierTypes.Stats, 
        data: {subStats: {eAtk: 70, eMatk: 70}},
        conditions: [{
            type: ConditionTypes.EquipmentSet,
            data: {
                name: "Anel dos Orcs" 
            }
        }]
    })
    expect(modifier.getModifier(applyData)).toBeUndefined;

    // Add the equipment to the character
    applyData.character.equipments.leftAccessory = {
        equipment: {
            id: 1,
            name: "Anel dos Orcs",
            description: "",
            minLevel: 0,
            slots: 0,
            type: ItemTypes.Armor,
            weight: 0,
        },
        refinement: 0,
        slots: [],
    }

    expect(modifier.getModifier(applyData)).toBeDefined();
    expect(applyData.sets.length).toBe(1);
    
    const modifierSum = modifier.getModifier(applyData)
    expect(modifierSum?.subStats.eAtk).toBe(70);
    expect(modifierSum?.subStats.eMatk).toBe(70);
});

engineTest('Adaga dos Orcs - Combo 4 - Conjunto Anel dos Orcs - id=510147 - double set not allowed', ({applyData}) => {
    const modifier = newModifier({
        type: ModifierTypes.Stats, 
        data: {subStats: {eAtk: 70, eMatk: 70}},
        conditions: [{
            type: ConditionTypes.EquipmentSet,
            data: {
                name: "Anel dos Orcs" 
            }
        }]
    })
    // Add the equipment to the character
    applyData.character.equipments.leftAccessory = {
        equipment: {
            id: 1,
            name: "Anel dos Orcs",
            description: "",
            minLevel: 0,
            slots: 0,
            type: ItemTypes.Armor,
            weight: 0,
        },
        refinement: 0,
        slots: [],
    }

    const equipmentSet: EquipmentSet = {
        source: {
            id: 0,
            name: "Adaga dos Orcs",
            description: "",
            minLevel: 0,
            slots: 2,
            type: ItemTypes.Weapon,
            weight: 0,
        },
        target: applyData.character.equipments.leftAccessory.equipment,
        condition: new EquipmentSetCondition({name: "Anel dos Orcs"})
    }
    applyData.source.instance.equipment.name = "Adaga dos Orcs";
    applyData.sets = [equipmentSet]

    expect(modifier.getModifier(applyData)).toBeUndefined();
});

engineTest('AttackMultipliers against wrong target not applied', ({applyData}) => {
    applyData.summary.target.race = RaceTypes.Angel

    const modifier = new StatsModifier({attackMultipliers: {race: 0.2}}, [{type: ConditionTypes.Target, data: {race: RaceTypes.Demon}}]);
    const charMod = modifier.getModifier(applyData)
    expect(charMod).toBeUndefined();
});

engineTest('AttackMultipliers against correct target applied', ({applyData}) => {
    applyData.summary.target.race = RaceTypes.Angel

    const modifier = new StatsModifier({attackMultipliers: {race: 0.2}}, [{type: ConditionTypes.Target, data: {race: RaceTypes.Angel}}]);
    const charMod = modifier.getModifier(applyData)
    expect(charMod).toBeDefined();
});


// TODO: Lâmina Sagrada

// Posso até colocar isso em um Condition, acho que vale o teste. Eu só não quero que fique confuso.



// TODO2: Implementar condição de cartas ex: Carta Crux Findel + Helmut

// TODO3:
//   - Para a interface, seria interessante os equipamentos possuírem combos,
//     e os combos possuírem um `active` flag.
//     Assim, eu poderia retornar todos os combos e iterar os combos na interface e mostrar o que está válido ou não.

// TODO4: A UI pode atribuír um modifier próprio, pra ser adicionado ao final no summary.
