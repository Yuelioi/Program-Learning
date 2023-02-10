
def glossary_replace(src_content, file_path):

    with open(file_path, encoding='utf-8') as f:
        for line in f:
            src = line.split('\t')[0]
            trg = ""
            try:
                trg = line.split('\t')[1].split('\n')[0]
            except BaseException:
                ...
            res_content = src_content.replace(src, trg)
    return res_content


def sub_gl_en_zh(src_content):
    return glossary_replace(src_content, 'glossary_en_1.txt')


def sub_tichun_zh(src_content):
    return glossary_replace(src_content, 'glossary_zh_1.txt')
