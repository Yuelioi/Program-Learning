import random
import string

def generate_random_string():
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(8))

print(generate_random_string()) # SefnlH3X