from json import dumps

f = open('list.txt', encoding="utf8")
txt = f.read()
f.close()
data = [i.split('\n') for i in txt.split('\n\n')]
print(data)
questions = {}
levels = ['easy', 'medium', 'hard', 'exotic']
for count, i in enumerate(levels):
    count_for_level = 0
    questions[i] = {}
    for count1, j in enumerate(range(count, count + 13, 4)):
        for k in data[j]:
            if k == '':
                continue
            questions[i][count_for_level] = {"name": k, "type": count1}
            count_for_level += 1
    questions[i]["count"] = count_for_level
scores = {}
for i in range(200):
    scores[i] = 0

j = dumps({"questions": questions, "scores": scores}, ensure_ascii=False)
print(j)
with open('result.json', 'w', encoding="utf-8") as f:
    f.write(j)