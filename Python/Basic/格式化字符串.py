from string import Template
name = "John"
age = 30


# Using % operator
s = "My name is %s and I am %d years old." % (name, age)
print(s)  # My name is John and I am 30 years old.


# Using .format() method
s = "My name is {} and I am {} years old.".format(name, age)
s = "My name is {name} and I am {age} years old.".format(name=name, age=age)
print(s)  # My name is John and I am 30 years old.


# Using f-strings
s = f"My name is {name} and I am {age} years old."
print(s)  # My name is John and I am 30 years old.

# Object
coord1 = (3, 5)
coord2 = (4, 7)
p = 'X: {0[0]};  Y: {1[1]}'.format(coord1, coord2)  # X: 3;  Y: 7
print(p)


# Format
f = 12345.6789
'{:+.2f}'.format(f)  # +12345.68
'{:,}'.format(f)  # 12,345.6789
'{:.2%}'.format(f)  # 1234567.89%
'{:.2%}'.format(f)  # 1234567.89%


s = Template('$who likes $what')
s.substitute(who='tim', what='kung pao')

d = dict(who='tim')


out = Template('$who likes $what').safe_substitute(d)
print(out)
