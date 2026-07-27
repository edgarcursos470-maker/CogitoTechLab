altert() - faz uma mensagem aparecer na tela do usuário;
prompt() - interage com o usuário pedindo para inserir informações;
document.write() - escreve algo na tela do usuário;

Number.parseInt() - passa o dado para o tipo número inteiro;
Number.parseFloat() - passa o dado para o tipo número flutuante;
Number() - passa o dado para o tipo número (mas o JS adota o float como padrão)

n.toString() - passa o dado para o tipo string;
String() - passa o dado para o tipo string;
n.length - retorna a quantidade de caracteres de uma string;
n.toUpperCase() - tudo para maiúsculas;
n.toLowerCase() - tudo para minúsculas

toFixed - método para number (float/double) e retorna uma string e não um number;
n.toFixed(x) - determina quantidade de casas decimais;
n.toFixed(x).replace('.', ',') - troca o ponto, pela vígula;
n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

⚠️ alert(), prompt() e document.write(): essas três funções são específicas para execução no navegador (Browser/DOM) e não funcionam nativamente no Node.js;

⚠️ Number.parseInt() e Number.parseFloat(): Também funcionam usando apenas parseInt() e parseFloat() diretamente no código.

Métodos para Navegar no DOM

Por Marca ou por TagName

```
getElementsByTagName()
```

n.innerText --> pega o texto sem as filhas;

n.innetHtml --> traz o texto com as filhas.

Por ID

```
getElementsById()
```

por Nome

```
getElementsByName()
```

por Classe

```
getElementsByClassName()
```

por Seletor

```
querySelector()
querySelectorAll() // plural
```

**ID - # / classe - .**
