import { expect } from 'vitest'
import { engineTest } from './engineTest'
import { newModifier } from '@/engine/modifiers/utils'
import { ModifierData } from "@/engine/modifiers/types/config"
import { ModifierTypes } from "@/engine/modifiers/types/config"
import { AttackTypes } from "@/engine/types/config"
import { ElementTypes, RaceTypes } from "@/engine/types/enums"
import { ItemLocations } from "@/engine/types/enums"
import { EquipmentSetCondition } from '@/engine/modifiers/conditions/equipmentSetCondition'
import { StatsModifier } from '@/engine/modifiers/statsModifier'
import { CharacterModifiers } from '@/engine/modifiers/characterModifiers'
import { Attributes } from '@/engine/attributes'
import { CharacterSubStats } from '@/engine/subStats'
import { AttackMultipliers } from '@/engine/attackMultipliers'
import { AttackModifiers } from '@/engine/attackModifiers'
import { ComparisonConditions, ConditionTypes, EquipmentSet } from '@/engine/modifiers/conditions/types/config'
import { ItemTypes } from '@/engine/types/equipment'


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
            attributes: {str: 2, int: 1, vit: 1, dex: 2, agi: 2, luk: 2},
            subStats: {hardDefM: 1}
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
    applyData.attackInfo.attackType = AttackTypes.Physical;
    applyData.target.race = RaceTypes.Human;
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
    applyData.attackInfo.attackType = AttackTypes.Physical;
    applyData.target.race = RaceTypes.Human;
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
                names: ["Anel dos Orcs"]
            }
        }]
    })
    expect(modifier.getModifier(applyData)).toBeUndefined();

    // Add the equipment to the character
    applyData.character.equipments.push({
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
        location: ItemLocations.LeftHand,
        sourceLocation: ItemLocations.LeftHand,
    })

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
                names: ["Anel dos Orcs"]
            }
        }]
    })
    // Add the equipment to the character
    applyData.character.equipments.push({
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
        location: ItemLocations.LeftHand,
        sourceLocation: ItemLocations.LeftHand,
    });

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
        targets: [applyData.character.equipments[0].equipment],
        condition: new EquipmentSetCondition({names: ["Anel dos Orcs"]})
    }
    applyData.source.instance.equipment.name = "Adaga dos Orcs";
    applyData.sets = [equipmentSet]

    expect(modifier.getModifier(applyData)).toBeUndefined();
});

engineTest('AttackMultipliers against wrong target not applied', ({applyData}) => {
    applyData.target.race = RaceTypes.Angel

    const modifier = new StatsModifier({attackMultipliers: {race: 0.2}}, [{type: ConditionTypes.Target, data: {race: RaceTypes.Demon}}]);
    const charMod = modifier.getModifier(applyData)
    expect(charMod).toBeUndefined();
});

engineTest('AttackMultipliers against correct target applied', ({applyData}) => {
    applyData.target.race = RaceTypes.Angel

    const modifier = new StatsModifier({attackMultipliers: {race: 0.2}}, [{type: ConditionTypes.Target, data: {race: RaceTypes.Angel}}]);
    const charMod = modifier.getModifier(applyData)
    expect(charMod).toBeDefined();
});


/* Lâmina Sagrada

Usada por um líder religioso, essa espada reflete a luz e a intensifica. O fenômeno parece um milagre divino, além de servir como tática para ofuscar a visão dos inimigos.
--------------------------
^a400cdIndestrutível em batalha.^000000
--------------------------
^0000ffFOR e INT +10.^000000
--------------------------
^0000ffAlcance de 3 células.^000000
--------------------------
^CD3278Nv. base 99:^000000
A cada refino:
^0000ffDano físico +3%.^000000
-
^CD3278Nv. base 100 ou mais:^000000
A cada refino:
^0000ffDano físico +10%.^000000
--------------------------
^FA4E09Conjunto^000000
^FA4E09[Carta Valquíria Randgris]^000000
^0000ffHabilita [Gênese] nv.5.^000000
-
^CD3278Nv. base 99:^000000
^0000ffTolerância a Silêncio e Atordoamento +20%.^000000
^0000ffDano mágico de propriedade Sagrado +30%.^000000
-
^CD3278Nv. base 100 ou mais:^000000
^0000ffTolerância a Silêncio e Atordoamento +50%.^000000
^0000ffDano mágico de propriedade Sagrado +100%.^000000
--------------------------
Tipo: ^777777Espada^000000
ATQ ^777777200^000000 ATQM ^777777150^000000
Propriedade: ^777777Sagrado^000000
Peso: ^777777175^000000
Nível da arma: ^7777774^000000
Nível necessário: ^77777799^000000
Classes: ^777777Aprendizes, Espadachins, Gatunos, Mercadores e evoluções^000000\"
*/

engineTest("Lâmina Sagrada - All Modifiers - id=500009 ", ({applyData}) => {
    const modifiers: ModifierData[] = [
        // ^0000ffFOR e INT +10.^000000
        {
            type: ModifierTypes.Stats,
            data: {
                attributes: {
                    str: 10, int: 10
                }
            }
        },
        // ^CD3278Nv. base 99:^000000
        // A cada refino:
        // ^0000ffDano físico +3%.^000000
        // -
        // ^CD3278Nv. base 100 ou mais:^000000
        // A cada refino:
        // ^0000ffDano físico +10%.^000000
        {
            type: ModifierTypes.Refinement,
            data: {
                refinementSteps: 1,
                modifier: {
                    type: ModifierTypes.Stats,
                    data: {
                        attackMultipliers: {default: 0.03}
                    }
                }
            },
            conditions: [
                {
                    type: ConditionTypes.Level,
                    data: {
                        level: 100,
                        operator: ComparisonConditions.LT,
                    }
                }
            ]
        },
        {
            type: ModifierTypes.Refinement,
            data: {
                refinementSteps: 1,
                modifier: {
                    type: ModifierTypes.Stats,
                    data: {
                        attackMultipliers: {default: 0.10}
                    }
                }
            },
            conditions: [
                {
                    type: ConditionTypes.Level,
                    data: {
                        level: 100,
                        operator: ComparisonConditions.GTE,
                    }
                }
            ]
        },
        // ^FA4E09Conjunto^000000
        // ^FA4E09[Carta Valquíria Randgris]^000000
        // ^0000ffHabilita [Gênese] nv.5.^000000
        // -
        // ^CD3278Nv. base 99:^000000
        // ^0000ffTolerância a Silêncio e Atordoamento +20%.^000000
        // ^0000ffDano mágico de propriedade Sagrado +30%.^000000
        // -
        // ^CD3278Nv. base 100 ou mais:^000000
        // ^0000ffTolerância a Silêncio e Atordoamento +50%.^000000
        // ^0000ffDano mágico de propriedade Sagrado +100%.^000000
        {
            type: ModifierTypes.Combo,
            data: {
                modifiers: [
                    {
                        type: ModifierTypes.Stats,
                        data: {
                            attackMultipliers: {
                                attackElement: 0.3
                            }
                        },
                        conditions: [
                            {
                                type: ConditionTypes.Level,
                                data: {
                                    level: 100,
                                    operator: ComparisonConditions.LT
                                }
                            },
                            {
                                type: ConditionTypes.AttackType,
                                data: {
                                    attackElement: ElementTypes.Holy,
                                }
                            }
                        ]
                    },
                    {
                        type: ModifierTypes.Stats,
                        data: {
                            attackMultipliers: {
                                attackElement: 1.0
                            }
                        },
                        conditions: [
                            {
                                type: ConditionTypes.Level,
                                data: {
                                    level: 100,
                                    operator: ComparisonConditions.GTE
                                }
                            },
                            {
                                type: ConditionTypes.AttackType,
                                data: {
                                    attackElement: ElementTypes.Holy,
                                }
                            }
                        ]
                    }
                ]
            },
            conditions: [
                {
                    type: ConditionTypes.Card,
                    data: {
                        names: ["Carta Valquíria Randgris"]
                    }
                }
            ]
        }
    ]

    let charModifiers = modifiers.map(m => newModifier(m).getModifier(applyData))
    let modifiersSum = charModifiers.filter(m => m != null).reduce((l, r) => l.sum(r))

    expect(modifiersSum.attributes).toMatchObject(new Attributes({str: 10, int: 10}));
    expect(modifiersSum.subStats).toMatchObject(new CharacterSubStats());
    expect(modifiersSum.attackModifiers).toMatchObject(new AttackModifiers());
    expect(modifiersSum.attackMultipliers).toMatchObject(new AttackMultipliers());

    // Test Level 99-
    applyData.character.level = 99
    applyData.source.instance.refinement = 10
    charModifiers = modifiers.map(m => newModifier(m).getModifier(applyData))
    modifiersSum = charModifiers.filter(m => m != null).reduce((l, r) => l.sum(r))

    expect(modifiersSum.attributes).toMatchObject(new Attributes({str: 10, int: 10}));
    expect(modifiersSum.subStats).toMatchObject(new CharacterSubStats());
    expect(modifiersSum.attackModifiers).toMatchObject(new AttackModifiers());
    expect(modifiersSum.attackMultipliers).toMatchObject(new AttackMultipliers({default: 0.3}));

    // Test Level 100+
    applyData.character.level = 101
    applyData.source.instance.refinement = 10
    charModifiers = modifiers.map(m => newModifier(m).getModifier(applyData))
    modifiersSum = charModifiers.filter(m => m != null).reduce((l, r) => l.sum(r))

    expect(modifiersSum.attributes).toMatchObject(new Attributes({str: 10, int: 10}));
    expect(modifiersSum.subStats).toMatchObject(new CharacterSubStats());
    expect(modifiersSum.attackModifiers).toMatchObject(new AttackModifiers());
    expect(modifiersSum.attackMultipliers).toMatchObject(new AttackMultipliers({default: 1.0}));

    // Test Conjunto Valquíria Randgris
    applyData.attackInfo.element = ElementTypes.Holy
    applyData.character.equipments.push({
        equipment: {
            description: "",
            id: 0,
            minLevel: 0,
            name: "Test Equipment",
            slots: 1,
            type: ItemTypes.Weapon,
            weight: 0,
        },
        location: ItemLocations.RightHand | ItemLocations.LeftHand,
        sourceLocation: ItemLocations.RightHand,
        refinement: 0,
        slots: [{
            name: "Carta Valquíria Randgris",
            description: "",
            id: 123,
            type: ItemTypes.Card,
            targetType: ItemTypes.Weapon,
        }],
    })

    // Test Level 99-
    applyData.character.level = 99
    applyData.source.instance.refinement = 10;
    charModifiers = modifiers.map(m => newModifier(m).getModifier(applyData))
    modifiersSum = charModifiers.filter(m => m != null).reduce((l, r) => l.sum(r))

    expect(modifiersSum.attributes).toMatchObject(new Attributes({str: 10, int: 10}));
    expect(modifiersSum.subStats).toMatchObject(new CharacterSubStats());
    expect(modifiersSum.attackModifiers).toMatchObject(new AttackModifiers());
    expect(modifiersSum.attackMultipliers).toMatchObject(new AttackMultipliers({default: 0.3, attackElement: 0.3}));

    // Test Level 100+
    applyData.character.level = 100
    applyData.sets = []; // Clear the set due to previous iteration
    charModifiers = modifiers.map(m => newModifier(m).getModifier(applyData))
    modifiersSum = charModifiers.filter(m => m != null).reduce((l, r) => l.sum(r))

    expect(modifiersSum.attributes).toMatchObject(new Attributes({str: 10, int: 10}));
    expect(modifiersSum.subStats).toMatchObject(new CharacterSubStats());
    expect(modifiersSum.attackModifiers).toMatchObject(new AttackModifiers());
    expect(modifiersSum.attackMultipliers).toMatchObject(new AttackMultipliers({default: 1.0, attackElement: 1.0}));
})


engineTest("Armadura Do Monarca - id=15390", ({applyData}) => {
    const modifiersData: ModifierData[] = [
        // --------------------------
        // ^0000ffDano físico e mágico contra as raças Bruto e Inseto +7%.^000000
        // --------------------------
        {
            type: ModifierTypes.Stats,
            data: {
                attackMultipliers: {
                    race: 0.07, // Dano ... contra raça
                },

            },
            conditions: [
                {
                    // Dano Físico e Mágico
                    type: ConditionTypes.AttackType,
                    data: {
                        attackType: AttackTypes.Physical | AttackTypes.Magic,
                    }
                }, {
                    // Contra Raça Bruto e Inseto
                    type: ConditionTypes.Target,
                    data: {
                        race: RaceTypes.Insect | RaceTypes.Brute
                    }
            }]
        },
        // --------------------------
        // ^0000ffHP máx. +500.^000000
        // ^0000ffSP máx. +100.^000000
        // A cada 3 refinos:
        // ^0000ffHP máx. +50.^000000
        // ^0000ffSP máx. +20.^000000
        // --------------------------
        {
            type: ModifierTypes.Stats,
            data: {
                subStats: {
                    hpUnit: 500,
                    spUnit: 100
                }
            }
        },
        {
            type: ModifierTypes.Refinement,
            data: {
                refinementSteps: 3,
                modifier: {
                    type: ModifierTypes.Stats,
                    data: {
                        subStats: {
                            hpUnit: 50,
                            spUnit: 20
                        }
                    }
                }
            }
        },
        // --------------------------
        // ^FA4E09Conjunto^000000
        // ^FA4E09[Botas do Monarca]^000000
        // ^FA4E09[Manto do Monarca]^000000
        // ^0000ffConjuração variável -7%.^000000
        // Botas, Manto e Armadura no refino +9 ou mais:
        // ^0000ffConjuração variável -5% adicional.^000000
        // --------------------------
        {
            type: ModifierTypes.Combo,
            data: {
                modifiers: [
                    // ^0000ffConjuração variável -7%.^000000
                    {
                        type: ModifierTypes.Stats,
                        data: {
                            subStats: {
                                variableCast: -0.07
                            }
                        }
                    },
                    // Botas, Manto e Armadura no refino +9 ou mais:
                    // ^0000ffConjuração variável -5% adicional.^000000
                    {
                        type: ModifierTypes.Stats,
                        data: {
                            subStats: {
                                variableCast: -0.05
                            }
                        },
                        conditions: [
                            // Botas, Manto e Armadura no refino +9 ou mais:
                            {
                                type: ConditionTypes.Refinement,
                                data: {
                                    refinement: 9,
                                    condition: ComparisonConditions.GTE,
                                    location: ItemLocations.Shoes
                                }
                            },
                            {
                                type: ConditionTypes.Refinement,
                                data: {
                                    refinement: 9,
                                    condition: ComparisonConditions.GTE,
                                    location: ItemLocations.Garment
                                }
                            },
                            {
                                type: ConditionTypes.Refinement,
                                data: {
                                    refinement: 9,
                                    condition: ComparisonConditions.GTE,
                                    location: ItemLocations.Armor
                                }
                            }
                        ]
                    }
                ]
            },
            conditions: [
                // ^FA4E09Conjunto^000000
                // ^FA4E09[Botas do Monarca]^000000
                // ^FA4E09[Manto do Monarca]^000000
                {
                    type: ConditionTypes.EquipmentSet,
                    data: {
                        names: ["Botas do Monarca", "Manto do Monarca"]
                    }
                },
            ]
        }
    ]
    applyData.target.race = RaceTypes.Brute;
    const modifiers = modifiersData.map(m => newModifier(m));
    let charData = modifiers.map(m => m.getModifier(applyData)).filter(m => m != null).reduce((l, r) => l.sum(r))

    expect(charData).toMatchObject(new CharacterModifiers({
        subStats: new CharacterSubStats({hpUnit: 500, spUnit: 100}),
        attackMultipliers: new AttackMultipliers({race: 0.07})
    }))

    // Refinement + 9
    applyData.source.instance.refinement = 9
    charData = modifiers.map(m => m.getModifier(applyData)).filter(m => m != null).reduce((l, r) => l.sum(r))
    expect(charData).toMatchObject(new CharacterModifiers({
        subStats: new CharacterSubStats({hpUnit: 650, spUnit: 160}),
        attackMultipliers: new AttackMultipliers({race: 0.07})
    }))

    // Conjunto
    applyData.character.equipments.push(
        {
            refinement: 0,
            slots: [],
            sourceLocation: ItemLocations.Garment,
            location: ItemLocations.Garment,
            equipment: {id: 123, description: "", minLevel: 0, name: "Manto do Monarca", slots: 0, type: ItemTypes.Armor, weight: 0, allowedLocations: [ItemLocations.Garment]}
        },
        {
            refinement: 0,
            slots: [],
            sourceLocation: ItemLocations.Shoes,
            location: ItemLocations.Shoes,
            equipment: {id: 123, description: "", minLevel: 0, name: "Botas do Monarca", slots: 0, type: ItemTypes.Armor, weight: 0, allowedLocations: [ItemLocations.Shoes]}
        },
        {
            refinement: 0,
            slots: [],
            sourceLocation: ItemLocations.Armor,
            location: ItemLocations.Armor,
            equipment: {id: 123, description: "", minLevel: 0, name: "Armadura do Monarca", slots: 0, type: ItemTypes.Armor, weight: 0, allowedLocations: [ItemLocations.Garment]}
        },
    )

    charData = modifiers.map(m => m.getModifier(applyData)).filter(m => m != null).reduce((l, r) => l.sum(r))
    expect(applyData.sets.length).toBe(1);
    expect(charData).toMatchObject(new CharacterModifiers({
        subStats: new CharacterSubStats({hpUnit: 650, spUnit: 160, variableCast: -0.07}),
        attackMultipliers: new AttackMultipliers({race: 0.07})
    }))

    // Conjunto +9
    applyData.sets = [];
    applyData.character.equipments.forEach(e => {e.refinement = 9})
    applyData.source.instance.refinement = 9;
    charData = modifiers.map(m => m.getModifier(applyData)).filter(m => m != null).reduce((l, r) => l.sum(r))
    expect(applyData.sets.length).toBe(1);
    expect(charData).toMatchObject(new CharacterModifiers({
        subStats: new CharacterSubStats({hpUnit: 650, spUnit: 160, variableCast: expect.closeTo(-0.12)}),
        attackMultipliers: new AttackMultipliers({race: 0.07})
    }))
});

/*
Arma forjada com pedaços de Rubi. Emana um brilho vermelho.
--------------------------
^0000ffA cada 10 níveis de base a partir do 70: ATQ +5.^000000
--------------------------
Bônus de acordo com o refino até o +15:
^0000ffATQ +(refino × refino).^000000
--------------------------
Tipo: ^777777Lança de Duas Mãos^000000
ATQ: ^777777175^000000 ATQM: ^7777770^000000
Peso: ^777777175^000000
Nível da arma: ^7777773^000000
Nível necessário: ^77777770^000000
Classes: ^777777Espadachins e evoluções^000000\"
*/
engineTest("Lança Rubi - id=1498", ({applyData}) => {
  const modifiersData: ModifierData[] = [
    // --------------------------
    // ^0000ffA cada 10 níveis de base a partir do 70: ATQ +5.^000000
    // --------------------------
    {
      type: ModifierTypes.LevelSteps,
      data: {
        levelSteps: 10,
        minLevel: 70,
        modifier: {
          type: ModifierTypes.Stats,
          data: {subStats: {eAtk: 5}}
        }
      }
    },
    // --------------------------
    // Bônus de acordo com o refino até o +15:
    // ^0000ffATQ +(refino × refino).^000000
    // --------------------------
    {
      type: ModifierTypes.Refinement,
      data: {
        refinementSteps: 1,
        maxRefinement: 15,
        modifier: {
          type: ModifierTypes.Refinement,
          data: {
            refinementSteps: 1,
            maxRefinement: 15,
            modifier: {
              type: ModifierTypes.Stats,
              data: {subStats: {eAtk: 1}}
            }
          }
        }
      }
    }
  ]
  const modifiers = modifiersData.map(m => newModifier(m));
  applyData.character.level = 10;
  let charData = modifiers.map(m => m.getModifier(applyData)).filter(m => m != null).reduce((l, r) => l.sum(r))

  expect(charData).toMatchObject(new CharacterModifiers())

  applyData.character.level = 100;
  charData = modifiers.map(m => m.getModifier(applyData)).filter(m => m != null).reduce((l, r) => l.sum(r))
  expect(charData).toMatchObject(new CharacterModifiers({subStats: new CharacterSubStats({eAtk: 10})}));

  applyData.source.instance.refinement = 15;
  charData = modifiers.map(m => m.getModifier(applyData)).filter(m => m != null).reduce((l, r) => l.sum(r))
  expect(charData).toMatchObject(new CharacterModifiers({subStats: new CharacterSubStats({eAtk: 235})}));

  // Expect not change from +15
  applyData.source.instance.refinement = 20;
  charData = modifiers.map(m => m.getModifier(applyData)).filter(m => m != null).reduce((l, r) => l.sum(r))
  expect(charData).toMatchObject(new CharacterModifiers({subStats: new CharacterSubStats({eAtk: 235})}));
});
