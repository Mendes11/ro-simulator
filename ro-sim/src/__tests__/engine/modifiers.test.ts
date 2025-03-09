import { expect } from 'vitest'
import { engineTest } from './engineTest'
import { ModifierData, ModifierTypes, newModifier } from '@/engine/modifiers/utils'
import { Combo } from '@/engine/modifiers/combo'
import { AttackTypes } from '@/types/attackMultiplier'
import { RaceTypes } from '@/types/race'
import { ComparisonConditions, ConditionTypes } from '@/types/condition'
import { execPath } from 'process'


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
engineTest('Test Chapéu do Torneio: Coragem id=5857', ({baseCharacter, baseSource, summary}) => {
    const data: ModifierData = {
        type: ModifierTypes.Stats,
        data: {
            attributes: {str: 2, int: 1, vit: 1, dex: 2, agi: 2, luk: 2}
        }
    }
    const modifier = newModifier(data)
    modifier.apply({source: baseSource, character: baseCharacter, summary: summary})
    expect(summary.attributes.str).toBe(3)
    expect(summary.attributes.agi).toBe(3)
    expect(summary.attributes.vit).toBe(2)
    expect(summary.attributes.int).toBe(2)
    expect(summary.attributes.dex).toBe(3)
    expect(summary.attributes.luk).toBe(3)
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
engineTest('Test Florzinha Ilusional id=19247', ({baseCharacter, baseSource, summary}) => {
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
    modifiers.forEach(m => newModifier(m)
        .apply({source: baseSource, character: baseCharacter, summary: summary}))

    expect(summary.attackMultipliers.default).toBe(0.01);
    expect(summary.subStats.eMatk).toBe(0);
});

engineTest('+10 Test Florzinha Ilusional id=19247', ({baseCharacter, baseSource, summary}) => {
    baseSource.instance.refinement = 10;
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
    modifiers.forEach(m => newModifier(m)
        .apply({source: baseSource, character: baseCharacter, summary: summary}))

    expect(summary.attackMultipliers.default).toBe(0.01);
    expect(summary.subStats.eMatk).toBe(20);
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
engineTest('+12 Adaga dos Orcs - Combo 1 - id=510147',  ({baseCharacter, baseSource, summary}) => {
    baseSource.instance.refinement = 12;
    const combo = Combo.fromJSON({modifiers: [{
        type: ModifierTypes.Refinement, data: {
            refinementSteps: 3, 
            modifier: {
                type: ModifierTypes.Stats,
                data: {subStats: {eAtk: 40, eMatk: 40}}
            }
        }}
    ]})
    combo.apply({source: baseSource, character: baseCharacter, summary: summary})

    expect(summary.subStats.eAtk).eq(160);
    expect(summary.subStats.eMatk).eq(160);
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
engineTest('Adaga dos Orcs - Combo 2 - id=510147', ({baseCharacter, baseSource, summary}) => {
    summary.attackInfo.attackType = AttackTypes.Physical;
    summary.target.race = RaceTypes.Human;
    const combo = Combo.fromJSON({
        modifiers: [
            {
                type: ModifierTypes.Stats,
                data: {
                    attackMultipliers: {
                        race: 0.1,
                    },
                    target: {
                        attackType: AttackTypes.Physical || AttackTypes.Magic,
                        target: {
                            race: RaceTypes.All
                        }
                    }
                },
                conditions: [{
                    type: ConditionTypes.Refinement,
                    data: {
                        refinement: 6,
                        condition: ComparisonConditions.GTE
                    }
                }]
            },
            {
                type: ModifierTypes.Stats,
                data: {
                    attackMultipliers: {
                        race: 0.15,
                    },
                    target: {
                        attackType: AttackTypes.Physical || AttackTypes.Magic,
                        target: {
                            race: RaceTypes.All
                        }
                    }
                },
                conditions: [
                    {
                        type: ConditionTypes.Refinement,
                        data: {
                            refinement: 9,
                            condition: ComparisonConditions.GTE
                        }
                    }
                ]
            }
        ],
    })
    baseSource.instance.refinement = 0;
    expect(combo.check({character: baseCharacter, source: baseSource, target: summary.target, sets: []})).toBeTruthy();
    
    baseSource.instance.refinement = 6;
    expect(combo.check({character: baseCharacter, source: baseSource, target: summary.target, sets: []})).toBeTruthy();
    
    combo.apply({source: baseSource, character: baseCharacter, summary: summary})
    expect(summary.attackMultipliers.race).eq(0.1)
});

engineTest('+9 Adaga dos Orcs - Combo 3 - id=510147', ({baseCharacter, baseSource, summary}) => {
    summary.attackInfo.attackType = AttackTypes.Physical;
    summary.target.race = RaceTypes.Human;
    const combo = Combo.fromJSON({
        modifiers: [{
            type: ModifierTypes.Stats,
            data: {
                attackMultipliers: {
                    race: 0.15,
                },
                target: {
                    attackType: AttackTypes.Physical || AttackTypes.Magic,
                    target: {
                        race: RaceTypes.All
                    }
                }
            }
        }],
        conditions: [{
            type: ConditionTypes.Refinement,
            data: {
                refinement: 9,
                condition: ComparisonConditions.GTE
            }
        }]
    })
    baseSource.instance.refinement = 6;
    expect(combo.check({character: baseCharacter, source: baseSource, target: summary.target, sets: []})).toBeFalsy();
    
    baseSource.instance.refinement = 9;
    expect(combo.check({character: baseCharacter, source: baseSource, target: summary.target, sets: []})).toBeTruthy();
    
    combo.apply({source: baseSource, character: baseCharacter, summary: summary})
    expect(summary.attackMultipliers.race).eq(0.15)
});

engineTest('Adaga dos Orcs - Combo 4 - Conjunto Anel Orcs - id=510147', ({baseCharacter, baseSource, summary}) => {
    const combo = Combo.fromJSON({
        modifiers: [{type: ModifierTypes.Stats, data: {subStats: {eAtk: 70, eMatk: 70}}}],
        conditions: [{
            type: ConditionTypes.EquipmentSet,
            data: {
                name: "Anel dos Orcs" 
            }
        }]
    })
});
// TODO: Acho que o condition deve mudar para um objeto Combo


// TODO: Implementar Adaga dos Orcs, Lâmina Sagrada
// Para as próximas iterações, acho que os efeitos "Dano x contra ..." podem ser atribuídas ao
// Modifier, ao invés de ser um condition. Então se o modifier receber um target na sua inicialização,
// ele só vai poder atribuir o valor em caso de check ser True.
//
// Posso até colocar isso em um Condition, acho que vale o teste. Eu só não quero que fique confuso.



// TODO2: Implementar condição de cartas ex: Carta Crux Findel + Helmut

// TODO3:
//   - Para a interface, seria interessante os equipamentos possuírem combos,
//     e os combos possuírem um `active` flag.
//     Assim, eu poderia retornar todos os combos e iterar os combos na interface e mostrar o que está válido ou não.

// TODO4: A UI pode atribuír um modifier próprio, pra ser adicionado ao final no summary.
