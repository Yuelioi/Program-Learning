from PIL import Image

bg = Image.open("./test/0.png")

bg = bg.convert('RGBA')

user = Image.open("./test/1.jpg")

target_size = 255

target_width = max(target_size, min(
    target_size * user.width // user.height, user.width))
target_height = max(target_size, min(
    target_size * user.height // user.width, user.height))

user_resized = user.resize((target_width, target_height))

center_x = target_width // 2
center_y = target_height // 2

left = max(0, center_x - target_size // 2)
top = max(0, center_y - target_size // 2)
right = min(target_width, center_x + target_size // 2)
bottom = min(target_height, center_y + target_size // 2)
user_cropped = user_resized.crop((left, top, right, bottom))
user_cropped_resized = user_cropped.resize((target_size, target_size))

rotated_user = user_cropped_resized.rotate(
    7.53, expand=True)


result = Image.new('RGBA', bg.size, (0, 0, 0, 0))
result.paste(rotated_user, (55, 135))
result.paste(bg, (0, 0), mask=bg.getchannel("A"))


# Display the result
result.show()
