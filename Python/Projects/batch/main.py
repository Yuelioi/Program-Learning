import os
import subprocess

import pysubs2


def video_render(currentPath):
    input_video = f'"{currentPath}.mp4"'.replace("\\", "/")
    input_sub = f"'{currentPath}.ass'".replace("\\", "/").replace(":", "\\:")
    output_video = f'"{currentPath}.output.mp4"'.replace("\\", "/")

    # ffmpeg 命令压制 ass 字幕并使用 ultrafast 预设以提高速度
    command = f'ffmpeg -y -hwaccel cuda -i {input_video} -vf "ass={input_sub}" -c:v h264_nvenc -preset fast -crf 23.5 -threads 4 {output_video}'

    print(command)

    subprocess.run(command, shell=True, check=True)


# 根据文件名生成ass
def srt2ass(currentPath):

    en_subs = pysubs2.load(f"{currentPath}.en.srt", encoding="utf-8")
    for line in en_subs:
        line.style = "Default-L2"

    # 读取 zh.srt 文件
    zh_subs = pysubs2.load(f"{currentPath}.zh.srt", encoding="utf-8")
    for line in zh_subs:
        line.style = "Default"

    # 合并字幕
    merged_subs = pysubs2.load(r"E:\Project\Program-Learning\Python\Projects\sub_template.ass", encoding="utf-8")
    merged_subs.events.extend(en_subs)
    merged_subs.events.extend(zh_subs)

    # 保存合并后的文件
    merged_subs.save(f"{currentPath}.ass", encoding="utf-8")


# 批量处理文件夹下的所有文件
def batch_process(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".mp4"):
                file_path = os.path.join(root, file)
                base_name = os.path.splitext(file_path)[0]
                # srt2ass(base_name)
                video_render(base_name)


if __name__ == "__main__":

    os.chdir(os.path.dirname(__file__))
    folder_path = r"E:\Project\Program-Learning\Python\Projects\youtube_downloader\output"
    batch_process(folder_path)
