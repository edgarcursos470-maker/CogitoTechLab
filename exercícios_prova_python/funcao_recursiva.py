
#trata-se de uma função recursiva com parâmetro de acumulação por padrão
#definição da função "func" que recebe um número "n" e um resultado "res" com valor padrão de 1
#n é o parâmetro obrigatório, enquanto res é o acumulador de estado que possui valor padrão de 1.
#caso nenhum novo valor seja atribuido a "n" antes de se chamar a função, como em fun(4), o Python assumirá automáticamente que res=1

def func(n, res = 1):

#Condição de parada da recursão: se n for igual a 0, a função retorna o valor acumulado em res.
    if n == 0: return res

#Chamada recursiva. A função chama a si mesma com n decrementado em 1 e res multiplicado por n, de forma a garantir que chegue a 0
#e o novo res seja o resultado da multiplicação de todos os números de n até 1, ou seja, o fatorial de n.
    return func(n - 1, res * n)
print(func(4))

#Teste de mesa
    #1ª chamada: func(4, 1) -> n=4, res=1
    #2ª chamada: func(3, 4) -> n=3, res=4
    #3ª chamada: func(2, 12) -> n=2, res=12
    #4ª chamada: func(1, 24) -> n=1, res=24
    #5ª chamada: func(0, 24) -> n=0, res=24