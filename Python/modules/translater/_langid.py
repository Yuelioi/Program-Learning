# pip install langid
import langid
text = "Bonjour tout le monde!"
language, confidence = langid.classify(text)
print(language, confidence)  # 输出: fr 0.9999984502812336

text = "かわいかわい!"
language, confidence = langid.classify(text)
print(language, confidence)  #

text = "你个ばか"
language, confidence = langid.classify(text)
print(language, confidence)  #
