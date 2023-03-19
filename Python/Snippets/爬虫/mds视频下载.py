from pathlib import Path
import json
import os


script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

src_url = r"https://85vod-adaptive.akamaized.net/exp=1679145079~acl=%2F014d4ff1-2470-4f37-aab9-6878a553028c%2F%2A~hmac=be3b3fdbc7233fd4dfd28f0128147d61ed7161348ec687bf665508c43f334597/014d4ff1-2470-4f37-aab9-6878a553028c/parcel/"

with open(Path("./master.json"), "r") as f:
    master = json.load(f)

# 获取视频的基础URL和分段信息
video_data = master["video"]
# print(video_data)
video_base_url = video_data[0]["base_url"]
video_segments = video_data[0]["segments"]

video_trg_url = src_url + video_base_url + video_segments[0]['url']
print(video_trg_url)

# # 下载每个分段并合并为完整的视频
# video_parts = []
# for segment in segments:
#     # 构建分段的完整URL
#     segment_url = base_url + segment["url"]
#     # 下载分段
#     response = requests.get(segment_url)
#     # 将分段数据存储到列表中
#     video_parts.append(response.content)

# # 合并分段为完整的视频
# video_data = b"".join(video_parts)

# # 将视频数据写入文件
# with open("video.mp4", "wb") as f:
#     f.write(video_data)

# https://85vod-adaptive.akamaized.net/exp=1679146071~acl=%2F014d4ff1-2470-4f37-aab9-6878a553028c%2F%2A~hmac=93aea18b3ee04196eca080b6395f8acace298da337980fa2dec36d66c02e1b9c/014d4ff1-2470-4f37-aab9-6878a553028c/parcel/audio/49c43766.mp4?r=dXM%3D&range=80149-153848
# https://85vod-adaptive.akamaized.net/exp=1679145079~acl=%2F014d4ff1-2470-4f37-aab9-6878a553028c%2F%2A~hmac=be3b3fdbc7233fd4dfd28f0128147d61ed7161348ec687bf665508c43f334597/014d4ff1-2470-4f37-aab9-6878a553028c/parcel/audio/49c43766.mp4?r=dXM%3D&range=6963-80148
# https://85vod-adaptive.akamaized.net/exp=1679145079~acl=%2F014d4ff1-2470-4f37-aab9-6878a553028c%2F%2A~hmac=be3b3fdbc7233fd4dfd28f0128147d61ed7161348ec687bf665508c43f334597/014d4ff1-2470-4f37-aab9-6878a553028c/parcel/audio/49c43766.mp4?r=dXM%3D&range=80149-153848
# https://85vod-adaptive.akamaized.net/exp=1679145079~acl=%2F014d4ff1-2470-4f37-aab9-6878a553028c%2F%2A~hmac=be3b3fdbc7233fd4dfd28f0128147d61ed7161348ec687bf665508c43f334597/014d4ff1-2470-4f37-aab9-6878a553028c/parcel/video/7b81879f.mp4?r=dXMtZWFzdDE%3D&range=7816452-8179453
# https://85vod-adaptive.akamaized.net/exp=1679145079~acl=%2F014d4ff1-2470-4f37-aab9-6878a553028c%2F%2A~hmac=be3b3fdbc7233fd4dfd28f0128147d61ed7161348ec687bf665508c43f334597/014d4ff1-2470-4f37-aab9-6878a553028c/parcel/video/1989ea8a.mp4?r=dXMtY2VudHJhbDE%3D&range=6959-825837
