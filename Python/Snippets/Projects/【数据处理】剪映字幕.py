import json

# 剪映自动生成的字幕路径大概是下面的样子，需要自己找一下
sourcePath = r'C:\Users\yl\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft\67C1B596-F355-4f94-A004-F53CF58970A4\draft.json'
# 设置生成字幕的路径
outPath = r'C:\Users\yl\Desktop\字幕.srt'


def secToTimecode(t):
    s, ms = divmod(t, 1000)
    m, s = divmod(s, 60)
    h, m = divmod(m, 60)
    return "%02d:%02d:%02d,%03d" % (h, m, s, ms)


def getSrt(sourcePath, outPath):
    with open(sourcePath, 'r', encoding='UTF-8') as f, open(outPath, 'w', encoding='utf-8') as outf:
        jsonData = json.loads(f.read())
        try:
            for count, value in enumerate(jsonData["materials"]["texts"]):
                srtNum = str(count + 1)
                timeSource = jsonData["tracks"][-1]["segments"][count]["target_timerange"]

                startTime = secToTimecode(int(timeSource["start"]) / 1000)
                endTime = secToTimecode(
                    (int(timeSource["start"]) + int(timeSource["duration"])) / 1000)
                subConetent = jsonData["materials"]["texts"][count]["content"]

                outf.write(srtNum + '\n' + startTime + ' --> ' +
                           endTime + '\n' + subConetent + '\n\n')
        except Exception as e:
            print(e)


if __name__ == '__main__':
    getSrt(sourcePath, outPath)
