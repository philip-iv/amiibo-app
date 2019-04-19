import os

from PIL import Image

def convert_to_png(filename):
    print(f'converting {filename}')
    root = filename.split('.')[0]
    im = Image.open(filename)
    im.convert('RGB').save(f'{root}.png')

def no_png_version(filename):
    root = filename.split('.')[0]
    return f'{root}.png' not in os.listdir()

all_images = filter(lambda x: '.py' not in x, os.listdir())
non_pngs = filter(no_png_version, all_images)
for i in non_pngs:
    convert_to_png(i)

all_pngs = filter(lambda x: '.png' in x, os.listdir())
img_names = map(lambda x: x.split('.')[0], all_pngs)
print(list(img_names))