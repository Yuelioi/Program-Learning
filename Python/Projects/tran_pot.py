from pygoogletranslation import Translator
from popy.po_file import PoFile


def tran_google():
    ...


def tran_po(path_in, path_out):
    """ 调用PoFile模块用于解析"""
    file = PoFile(path=path_in)
    mes = file.get_messages()

    # 获取要翻译的列表
    print('获取翻译列表')
    to_tran_list = []
    for m in mes:
        cont = m.msgid

        if '%' not in cont and '\\' not in cont \
                and '{' not in cont and len(cont) > 5 and len(m.msgstr[0]) < 3:
            to_tran_list.append(cont)

    # 翻译列表
    print('开始翻译')
    tr_list = tran_google(to_tran_list)

    # 修改内容
    print('修改内容')
    t_loop = 0
    for m in mes:
        cont = m.msgidmsgid
        if '%' not in cont and '\\' not in cont \
                and '{' not in cont \
                and len(cont) > 5 \
                and len(m.msgstr[0]) < 3:

            t = tr_list[t_loop]
            m.msgstr = [t[:-1]] if t.endswith('.') else [t]
            t_loop += 1
    # 写入
    print('开始写入')
    file2 = PoFile(path=path_out)
    file2.write_messages(mes)


if __name__ == '__main__':
    PATH1 = r'C:\Users\yl\Downloads\scisco.pot\ans.po'
    PATH2 = r'C:\Users\yl\Downloads\scisco.pot\ans-out.po'
    tran_po(PATH1, PATH2)
