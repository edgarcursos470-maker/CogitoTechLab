print("Escolha se cálculo simples, 1 ou composto, 2")

escolha = int(input())

if escolha == 1:
    def juros_simples ():
        c = float(input("Insira o valor do capital: "))
        i = float(input("insira o valor da taxa: "))/100
        t = int(input("insira a quantidade de tempo: "))
        j_s=c*i*t
        m=c+j_s
        return j_s
    print("Juros_Simples_Total", juros_simples())

elif escolha == 2:
    def juros_composto():
        c = float(input("Insira o valor do capital: "))
        i = float(input("insira o valor da taxa: "))/100
        t = int(input("insira a quantidade de tempo: "))
        j_c = (c*(1+i)**t)
        return j_c
    print("Juros_Composto_Total", juros_composto())