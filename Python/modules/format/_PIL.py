# from PIL import Image
import random
# import time

# tStart = time.time()

# image = Image.open(r"C:\Users\yueli\Downloads\temp.jpg")
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
width = 20
clip = 50

image_width = 1000
image_height = 2000


for i in range(5):
    rnd_w = random.randint(1, image_width-width)
    rnd_h = random.randint(1, clip*2)

    if rnd_h > clip:
        rnd_h = image_height-rnd_h+clip

    print(rnd_w, rnd_h)
