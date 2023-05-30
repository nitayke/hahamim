from json import loads

f = open('../yeshivot.json')
t = f.read()
f.close()

j = loads(t)
f = open('values.txt', 'w')
s = 0

for i in j:
    f.write(str(s) + '\n')
    s += int(j[i])

f.close()