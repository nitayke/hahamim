from json import dumps

f = open('list.txt', encoding="utf8")
txt = f.read()
f.close()
data = [i.split('\n') for i in txt.split('\n\n')]
questions = {}
levels = ['easy', 'medium', 'hard']
for count, i in enumerate(levels):
    count_for_level = 0
    questions[i] = {}
    for count1, j in enumerate(range(count, count + 10, 3)):
        print(count1, j)
        for k in data[j]:
            if k == '':
                continue
            questions[i][count_for_level] = {"name": k, "type": count1}
            count_for_level += 1
    questions[i]["count"] = count_for_level
scores = {}
for i in range(180):
    scores[i] = 0

j = dumps({"questions": questions, "scores": scores}, ensure_ascii=False)
print(j)
with open('result.json', 'w', encoding="utf-8") as f:
    f.write(j)