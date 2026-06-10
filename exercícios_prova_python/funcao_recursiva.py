def func(n, res = 1)   :
    if n == 0:
        return res

    return func(n - 1, res * n)
print(func(4))