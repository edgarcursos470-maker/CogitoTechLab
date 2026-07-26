
alert() - faz uma mensagem aparecer na tela do usuário;
prompt() - interage com o usuário pedindo para inserir informações;
write() - escreve algo na tela do usuário;

Number.parseInt() - passa o dado para o tipo número inteiro;
Number.parseFloat() - passa o dado para o tipo número flutuante;
Number() - passa o dado para o tipo número (mas o JS adota o float como padrão);

n.toString - passa o dado para o tipo string;
String() - passa o dado para o tipo string;
n.length - retorna a quantidade de caracteres de uma string;
n.toUpperCase() - tudo para maiúsculas;
n.toLowerCase() - tudo para minúsculas;

toFixed - método para number (float/double) e retorna uma string e não um number;
n.toFixed(x) - determina quantidade de casas decimais;
n.toFixed(x).replace('.', ',') - troca o ponto, pela vígula;
n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })