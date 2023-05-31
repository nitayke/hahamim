from uuid import uuid4
from json import dumps
from random import randint

f = open('list.txt', encoding="utf8")
txt = f.read()
f.close()
data = [i.split('\n') for i in txt.split('\n\n')]
print(data)
print(len(data))
json = {}
levels = ['easy', 'medium', 'hard', 'exotic']
for count, i in enumerate(levels):
    json[i] = {}
    for count1, j in enumerate(range(count, count + 13, 4)):
        for k in data[j]:
            if k == '':
                continue
            key = uuid4().hex[:16]
            json[i][key] = {}
            json[i][key]["name"] = k
            json[i][key]["random_num"] = randint(0, 100)
            json[i][key]["type"] = count1

j = dumps({"questions": json}, ensure_ascii=False)
with open('result.json', 'w', encoding="utf-8") as f:
    f.write(j)