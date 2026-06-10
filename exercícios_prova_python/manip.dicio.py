d = {'a': 10, 'b': 20}

for k in list(d.keys()):
    d[k.upper()] = d.pop(k)*2
    
print(d)