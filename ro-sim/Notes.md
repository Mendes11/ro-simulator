## Notes

* Consider moving sets attribute to the Summary
* Consider having the apply method only and each implementation runs the checks internally as well as adds each combo to the list of active combos.


1. Preciso ter quais os modifiers que estão sendo aplicados, cujos conditions batem
2. Quero que cada modifier me retorne um objeto que permite que eu tenha o total de stats que serão adicionados
3. Se ao invés de dar um check, eu pegar os modifiers?
    - Se retornar algo, já é prova de um check retornando True.
    - Se torna um único método que devo chamar, então eu passo os sets e qualquer outra informação


---

Se eu já tenho todos os modifiers como um único objeto, então o tipo Modifiers é meio inútil?

Se o Condition for considerado o objeto primário... Mas não são todos que possuem conditions...

---


## TODO:

1. Maybe move the active modifiers logic to an instance of iEquipmentInstance?
2. Implement Skills Tab
   1. Should show the combo required skills, so the user can pick which level
   2. Should show all other buff-type skills (independent of job) (non required)
   3. Allow for searchable skills, to speed up (UX -- can leave for later)
3. Implement Extras Tab
   1. Create a form with all CharacterModifierData inputs
4. Implement Element Selector in the simulator view.
5. Add Enchantments to Weapons
   1. Search for way to discover the available enchantments from the files (or at least how many)
   2. Add enchantments to cards.json (or another file?)

---

Skills podem ter modifiers, mas o attackMultiplier DEVE vir após computarmos tudo, pois as skills podem se basear em atributos totais, como o SBK

-> Adicionar um getModifiers provindo de skills ativas.
    -> Skills podem aplicar modificadores que serão somados aos modificadores do Char.

-> o AttackMultiplier está recebendo o summary, mas o summary é computado após o attackMultiplier (em tese), então talvez criar um type específico
   pode até ter as informações do summary, mas ao menos é para ser semanticamente mais correto.

-> Chamar o attackMultiplier da skill no método de simulação.

-> SimulationSummary talvez deveria se chamar SimulationData, afinal é a entrada de dados da função Simulate().

