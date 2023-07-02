from PyQt5.Qt import QWidget, QApplication
from resource.数据处理工具 import Ui_Form1
import re
import os


class SubPane(QWidget, Ui_Form1):
    currentPath = os.getcwd()

    def __init__(self, parent=None, *args, **kwargs):
        (super().__init__)(parent, *args, **kwargs)
        self.setupUi(self)

    def conven(self):
        s = self.sub_input1.toPlainText()

        pa = re.compile('<.{0,1}div.+')
        output = re.sub(pa, '', s)

        self.sub_output1.setPlainText(output)

    #     self.sub_output1.setPlainText(output)
    def conven1(self):
        s = self.sub_input1.toPlainText()

        import re

        def _change_blank(matched):
            intStr = matched.group("number")

            if intStr.find("(") + 1:

                tid = intStr.find("(")
                title = f"{intStr[:tid]}()"

                addedValue = (
                    f"{title}<h2>"
                    + "\n\n全名："
                    + intStr.replace("<h2>", "").replace("</h2>", "")
                )
            else:
                addedValue = intStr + "\n\n说明："

            return addedValue

        replacedStr = re.sub("(?P<number><h2.+)", _change_blank, s)

        replacedStr = replacedStr.replace("说明：\n参数", "说明：\n\n参数")

        # replacedStr = replacedStr.replace("说明：\n","说明：")

        self.sub_output1.setPlainText(replacedStr)

    def conven2(self):
        s = self.sub_input1.toPlainText()

        def _change_blank(matched):
            intStr = matched.group("number").strip()
            intStr = intStr.replace("classmethod", "classmethod ")
            if intStr.find("(") + 1:

                tid = intStr.find("(")
                title = f"{intStr[:tid]}()"

                addedValue = f"<h2>{title}</h2>" + "\n\n全名：" + intStr + "\n"
            else:
                addedValue = f"<h2>{intStr}" + "</h2>\n\n说明："

            return addedValue

        s = re.sub("(?P<number>.+)", _change_blank, s)

        rep_list = [
            "",
            "(readonly)",
            "Type\n",
            "Returns\n",
            "Parameters\n",
            "(never None)",
            'Return type\n',
            "(optional)",
            "(string)",
            "never None",
            "optional",
            "default ‘’",
            "The class or default when not found.",
            "The RNA type or default when not found.",
            "说明\n",
            "–",
            "base class —",
            "readonly",
            ', ，',
            "string, default “*”,",
            "(int in",
            "。 ",
            "(string,",
            "None) 。",
            "string,",
            "(AnyType,",
            "(boolean",
            "int in",
            'default “”'
        ]

        to_rep_list = [
            "",
            "只读",
            "类型：",
            "返回：",
            "参数：",
            "不会为None",
            "返回类型：",
            "，可选",
            "不为None",
            "，可选",
            "可选",
            '默认为""',
            "类，未找到则为默认。",
            "RNA类型，未找到则为默认。",
            "说明",
            "。",
            "基类：",
            "只读",
            "，",
            '字符串，默认为""',
            "整数，",
            "。",
            "：字符串，",
            "None。",
            "字符串，",
            "：AnyType，",
            "布尔值",
            "整数",
            '默认为""'
        ]

        for i in range(len(rep_list)):
            s = s.replace(rep_list[i], to_rep_list[i])

        self.sub_output1.setPlainText(s)

    def time2str(self, seconds):
        """Function to return timecode from seconds"""
        secs = int(seconds % 60)
        ms = int((seconds % 1) * 1000)
        mins = int((seconds / 60) % 60)
        hrs = int((seconds / 60) / 60)
        return "{hh:02d}:{mm:02d}:{ss:02d},{ms:03d}".format(hh=hrs, mm=mins, ss=secs, ms=ms)

    def conven3(self):
        s = self.sub_output1.toPlainText()
        s = s.replace("说明：\n", "说明：")
        self.sub_output1.setPlainText(s)
        print(self.lineEdit.text())

    def conven4(self):
        ...


if __name__ == '__main__':
    import sys
    app = QApplication(sys.argv)
    window = SubPane()
    window.show()
    sys.exit(app.exec_())
