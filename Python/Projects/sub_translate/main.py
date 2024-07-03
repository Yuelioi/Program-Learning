import os

import deepl


def tran_deepl_pro(src_list):

    auth_key = ""
    translator = deepl.Translator(auth_key)
    result = translator.translate_text(src_list, target_lang="ZH")

    return [r.text for r in result]


def translate_srt_files():
    # 获取当前目录下的所有 SRT 文件
    folder_path = r"E:\Scripting\Program-Learning\Python\Projects\sub_translate"

    srt_files = [f for f in os.listdir(folder_path) if f.endswith(".srt")]

    for srt_file in srt_files:
        # 读取 SRT 文件内容
        with open(folder_path + "/" + srt_file, "r", encoding="utf-8") as file:
            srt_content = file.read()

        # 解析 SRT 文件内容
        srt_lines = srt_content.split("\n")
        original_texts = []
        translated_texts = []
        current_text = ""
        for line in srt_lines:
            if line.strip().isdigit():
                # 如果是数字，则说明是字幕序号
                if current_text:
                    original_texts.append(current_text.strip())
                    current_text = ""
            elif "-->" in line:
                # 如果包含时间轴，则跳过
                continue

            else:
                # 否则为字幕文本
                current_text += line + " "

        if current_text:
            original_texts.append(current_text.strip())

        # 翻译原文
        translated_texts = tran_deepl_pro(original_texts)

        # 重新构建翻译后的 SRT 内容
        translated_srt_content = ""
        index = 0
        for line in srt_lines:
            if line.strip().isdigit():
                # 如果是数字，则说明是字幕序号
                translated_srt_content += line + "\n"
                index += 1
            elif "-->" in line:
                # 如果包含时间轴，则直接添加到翻译后的内容中
                translated_srt_content += line + "\n"

            elif line.strip():
                translated_srt_content += translated_texts[index - 1] + "\n"
            else:
                print(line)
                translated_srt_content += line + "\n"

        # 保存翻译后的 SRT 文件
        translated_srt_file = srt_file.replace(".srt", ".zh.srt")
        with open(folder_path + "/" + translated_srt_file, "w", encoding="utf-8") as file:
            file.write(translated_srt_content)

        print(f"Translation of {srt_file} completed. Translated SRT file saved as {translated_srt_file}")


if __name__ == "__main__":
    translate_srt_files()
