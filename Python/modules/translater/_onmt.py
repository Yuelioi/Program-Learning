import onmt
translator = onmt.translate(
    models=['model1.pt', 'model2.pt'],
    src_lang='en',
    tgt_lang='zh'
)
src_text = 'Hello, world!'
tgt_text, scores = translator.translate(src_text)
print(tgt_text)  # 输出: 你好，世界！
