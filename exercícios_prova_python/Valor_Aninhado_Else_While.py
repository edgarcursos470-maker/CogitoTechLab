
#Estado inicial: count começa valendo 0. 
count = 0

#O laço for itera sobre os valores 0 e 1, ou seja, i assume os valores 0 e 1 em cada iteração do laço.
for i in range(2):

#Variável j é inicializada com 0 a cada iteração do laço for, garantindo que o laço while comece sempre com j igual a 0.
j = 0

#O laço while continua a iterar enquanto j for menor que 2. Dentro do while, há uma condição que verifica se i é igual a j. 
# Se for, o valor de j é incrementado em 1 e o laço while é interrompido com o comando break. 
# Caso contrário, o valor de count é incrementado em 1 e j é incrementado em 1.

while j < 2:
if i == j:
j += 1
break
count += 1
j += 1

#Em Lógica de Programação, o bloco else de um laço somente é executado se o laço terminar naturalmente, portanto, apenas quando a condição do while for falsa. No caso, o bloco else só será executado quando j for igual a 2, ou seja, quando o laço while terminar normalmente.

else:
count += 10

print(count)