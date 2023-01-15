from PIL import Image
import random
# import time

# tStart = time.time()

src = r"H:\Snippets\Program-Learning\_test\test.jpg"

image = Image.open(src)

image_copy = image.copy()
width = 1
clip = 20
image_new = Image.new('RGB', (width, width), (0, 0, 255))
image_width = image.width
image_height = image.height

box = (3, 3, image_width-3, image_height-3)

for i in range(5):
    rnd_w = random.randint(1, image_width-width)
    rnd_h = random.randint(1, clip*2)
    rnd = random.randint(width, image.width-width)
    if rnd_h > clip:
        rnd_h = image_height-rnd_h+clip
    image_copy.paste(image_new, (rnd_w, rnd_h, rnd_w+width, rnd_h+width))

im_crop = image_copy.crop(box)
out = r'H:\Snippets\Program-Learning\_test\test-out.jpg'
im_crop.save(out, quality=50)


# image = Image.open()
# image_copy = image.copy()
# width = 20
# clip = 50

# image_new = Image.new('RGB', (width, width), (0, 0, 255))

# for i in range(5):
#     rnd_w = random.randint(1, image.width-width)
#     rnd_h = random.randint(1, 50*2)
#     if rnd_h > clip:
#       rnd_h = image.width-clip

#     image_copy.paste(image_new, (rnd_w, rnd_h, rnd_w+width, rnd_h+width))
# image_copy.save(r"C:\Users\yueli\Downloads\temp2.jpg")
