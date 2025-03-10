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

Modifier não deve retornar valid modifiers. É melhor que um modifier retorne um único CharacterModifiers, ou seja, se ele possui múltiplos internamente, ele deve me retornar a soma deles. Adicionalmente, devo fazer com que ele retorne ou o modifier ou nulo, para os casos em que os conditions não batem.
