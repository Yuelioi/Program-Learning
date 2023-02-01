name = "John"
age = 30

# Using % operator
s = "My name is %s and I am %d years old." % (name, age)
print(s)  # My name is John and I am 30 years old.


# Using .format() method
s = "My name is {} and I am {} years old.".format(name, age)
print(s)  # My name is John and I am 30 years old.


# Using f-strings
s = f"My name is {name} and I am {age} years old."
print(s)  # My name is John and I am 30 years old.
