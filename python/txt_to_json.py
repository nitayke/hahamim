from uuid import uuid4
from json import dumps
from random import randint

f = open('list.txt', encoding="utf8")
txt = f.read()
f.close()
data = [i.split('\n') for i in txt.split('\n\n')]
print(data)
json = {}
levels = ['easy', 'medium', 'hard', 'exotic']
for count, i in enumerate(levels):
    count_for_level = 0
    json[i] = {}
    for count1, j in enumerate(range(count, count + 13, 4)):
        for k in data[j]:
            if k == '':
                continue
            json[i][count_for_level] = {"name": k, "type": count1}
            count_for_level += 1
    json[i]["count"] = count_for_level

j = dumps({"questions": json}, ensure_ascii=False)
print(j)
with open('result.json', 'w', encoding="utf-8") as f:
    f.write(j)