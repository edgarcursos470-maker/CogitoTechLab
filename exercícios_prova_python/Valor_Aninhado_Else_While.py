
#Estado inicial: count começa valendo 0. 
count = 0

#O laço "for" itera sobre os valores 0 e 1, ou seja, i assume os valores 0 e 1 em cada iteração do laço.
#No "for i in range(2)", o Python sempre percorre essa sequência: range(2) -> 0,1.
for i in range(2):
	#Variável j é inicializada com 0 a cada iteração do laço for, garantindo que o laço while comece sempre com j igual a 0.
	j = 0

	#O laço while continua a iterar enquanto j for menor que 2.  
	while j < 2:
        
		#Dentro do while, há uma condição que verifica se i é igual a j.
		if i == j:
            
			#Se for, o valor de j é incrementado em 1
			j += 1
            
			#e o laço while é interrompido com o comando break.
			#o comando break é usado para sair imediatamente de qualquer laço while, independentemente de a condição do while ainda ser verdadeira ou não. 
			# Portanto, quando i for igual a j, o laço while será interrompido e o programa continuará a execução após o bloco do while, 
			# ou seja, para a próxima iteração do for ou para o bloco else se o for tiver terminado.
            
			break

		count += 1
		j += 1

	#Em Lógica de Programação, o bloco else de um laço somente é executado se o laço terminar naturalmente, 
	# portanto, apenas quando a condição do while for falsa. 
	# No caso, o bloco else só será executado quando j for igual a 2, ou seja, quando o laço while terminar normalmente.
	#Caso o break seja ativado, o bloco else nunca será executado, pois o laço while é interrompido com o comando break quando i é igual a j 
	# ou seja, quando j é igual a 0 ou 1.
	else:
		count += 10

print(count)