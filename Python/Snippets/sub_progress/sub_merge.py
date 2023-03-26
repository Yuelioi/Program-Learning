import os
def merge(self):
    print('开始合并视频')

    try:

        self.s1 = self.path1.replace("\\", '/').replace(":",
                                                        r"\:") + '/' + self.file_title + '/' + self.file_title + 'en.srt'
        self.s2 = self.path1.replace("\\", '/').replace(":",
                                                        r"\:") + '/' + self.file_title + '/' + self.file_title + '_gl_cn_auto.srt'
        self.v2 = self.path1 + '/' + self.file_title + '/' + self.file_title + "_out.mp4"
        self.line_v1.setText(self.v1)
        self.line_v2.setText(self.v2)
        self.line_s1.setText(self.s1)
        self.line_s2.setText(self.s2)
        ffmpeg_param = 'ffmpeg -i ' + '"' + self.v1 + '" -vf scale=1920:1040,pad=1920:1130,scale=1920:1080,"subtitles=' + "'" + self.s1 + "'" + ':force_style=' + "'Fontsize=7,MarginL=0,MarginV=5'" + '","' + 'subtitles=' + "'" + self.s2 + "'" + ':force_style=' + "'Fontsize=12,MarginL=0,MarginV=10'" + '"' + ' "' + self.v2 + '"'
        os.system(ffmpeg_param)
    except Exception as e:
        print(e)
    # subprocess.call(ffmpeg, shell=True)


def merge_2(self):
    print('开始合并视频')
    try:
        v1 = self.line_v1.text()
        s1 = self.line_s1.text()
        s2 = self.line_s2.text()
        v2 = self.line_v2.text()
        ffmpeg_param = 'ffmpeg -i ' + '"' + v1 + '" -vf scale=1920:1040,pad=1920:1130,scale=1920:1080,"subtitles=' + "'" + s1 + "'" + ':force_style=' + "'Fontsize=7,MarginL=0,MarginV=5'" + '","' + 'subtitles=' + "'" + s2 + "'" + ':force_style=' + "'Fontsize=12,MarginL=0,MarginV=10'" + '"' + ' "' + v2 + '"'
        os.system(ffmpeg_param)
    except Exception as e:
        print(e)