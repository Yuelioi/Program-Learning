from PIL import Image
from wordcloud import WordCloud

text = "asdfamfqwo mqw mewqope mqw'pome wqopme powqke'po wkq e"

wc = WordCloud(width=800, height=400)
wc.generate(text)
img = wc.to_image()
img.show()
