import re
from collections import Counter
cnt = Counter()
for word in ['red', 'blue', 'red', 'green', 'blue', 'blue']:
    cnt[word] += 1
print(cnt)  # Counter({'blue': 3, 'red': 2, 'green': 1})
arr = ['red', 'blue', 'red', 'green', 'blue', 'blue']

cnt = Counter(arr)
print(cnt)
