import copy

l = [1, 2, 3, [4, 5, 6]]

l2 = copy.copy(l)
l3 = copy.deepcopy(l)

print(l2)
print(l3)

l2[1] = 1
l3[1] = 1

print(l)
