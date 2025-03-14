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


TODO: 

Skills podem ter modifiers, mas o attackMultiplier DEVE vir após computarmos tudo, pois as skills podem se basear em atributos totais, como o SBK

-> Adicionar um getModifiers provindo de skills ativas.
    -> Skills podem aplicar modificadores que serão somados aos modificadores do Char.

-> o AttackMultiplier está recebendo o summary, mas o summary é computado após o attackMultiplier (em tese), então talvez criar um type específico
   pode até ter as informações do summary, mas ao menos é para ser semanticamente mais correto.

-> Chamar o attackMultiplier da skill no método de simulação.

-> SimulationSummary talvez deveria se chamar SimulationData, afinal é a entrada de dados da função Simulate().

