import base64

res = base64.b64decode(s="hell")
print(res)
# base64.b64encode(s="")

# # Open an image file
# with open(r"H:\Snippets\Program-Learning\_test\test.jpg", "rb") as image_file:
#   # Read the contents of the image file
#   image_data = image_file.read()
#   # Encode the image data using base64
#   image_base64 = f"base64://{base64.b64encode(image_data).decode()}"
#   print(image_base64)
