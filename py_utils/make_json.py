from json import dumps
s = '''ברכות	שבת	עירובין	פסחים	ראש השנה	יומא	סוכה	ביצה	תענית	מגילה	מועד קטן	חגיגה	יבמות	כתובות	נדרים	נזיר	סוטה	גיטין	קידושין	בבא קמא	בבא מציעא	בבא בתרא	סנהדרין	מכות	שבועות	עבודה זרה	הוריות	זבחים	מנחות	חולין	בכורות	ערכין	תמורה	כריתות	מעילה	נידה
63	156	104	120	34	87	55	39	30	31	28	27	121	111	90	65	48	89	81	118	118	175	112	23	48	75	13	119	109	141	60	33	33	27	21	8	72'''

l = s.split('\n')
l1 = l[0].split('\t')
l2 = l[1].split('\t')
result = {}

for i in range(len(l1)):
    result[l1[i]] = l2[i]

f = open('../yeshivot.json', 'w')
f.write(dumps(result, ensure_ascii=False))
f.close()