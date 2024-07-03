import os
import base64
import random
import asyncio

import aiohttp
import jsonpath
import requests
from tqdm import tqdm
from get_cookie import getCookie

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)
cookies_jar = getCookie()

agentsList = [
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60",
    "Opera/8.0 (Windows NT 5.1; U; en)",
    "Mozilla/5.0 (Windows NT 5.1; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.50",
    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 9.50",
    # Firefox
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0",
]
agentStr = random.choice(agentsList)

header = {"User-Agent": agentStr}


master_json_url = "https://78vod-adaptive.akamaized.net/exp=1715272884~acl=%2Fc94ce848-ff87-4275-9e53-58bc2bc132f5%2F%2A~hmac=7623e391593cdd4df0f3638b1396d605d40d95fa206f9d06d6d5d55e78847973/c94ce848-ff87-4275-9e53-58bc2bc132f5/sep/video/09e30944,0acd48ba,2d049833,37dc4cbb,5b2d47cb,b2e95a82/audio/37957f16,bc882535,e0b36009/master.json?base64_init=1&query_string_ranges=1"


video_filename = "v.mp4"
audio_filename = "a.mp3"


async def download_segment(segment, video_base_url, filename, headers, cookies_jar, proxy):
    segment_url = video_base_url + segment["url"]
    print(segment_url)
    async with aiohttp.ClientSession(headers=headers, cookies=cookies_jar) as session:
        async with session.get(segment_url, proxy=proxy) as response:
            if response.status == 200:
                with open(filename, "ab") as video_file:
                    async for data in response.content.iter_chunked(1024 * 1024):
                        video_file.write(data)
            else:
                print(f"Failed to download segment {segment['url']}, status code: {response.status}")


async def download_segments(segments, video_base_url, filename, headers, cookies_jar, proxy):
    tasks = []
    for segment in segments:
        task = asyncio.create_task(download_segment(segment, video_base_url, filename, headers, cookies_jar, proxy))
        tasks.append(task)
    await asyncio.gather(*tasks)


import time


def video_get2(master_json_url, filename):
    res = requests.get(
        master_json_url, headers=header, cookies=cookies_jar, verify=True, proxies={"http": "http://127.0.0.1:10809"}
    )
    content = res.json()
    video_data = content["video"]
    current_index = 0
    max_height = 0
    for index, data in enumerate(video_data):
        if data["height"] > max_height:
            max_height = data["height"]
            current_index = index

    video = video_data[current_index]

    base_url = master_json_url[: master_json_url.rfind("video", 0, -26)]
    video_base_url = f"{base_url}video/" + video["base_url"]
    with open(filename, "wb") as video_file:
        init_segment = base64.b64decode(video["init_segment"])
        video_file.write(init_segment)

        for segment in tqdm(video["segments"]):
            segment_url = video_base_url + segment["url"]

            while True:
                try:
                    resp = requests.get(
                        segment_url,
                        stream=True,
                        headers=header,
                        cookies=cookies_jar,
                        verify=True,
                        proxies={"http": "http://127.0.0.1:10809"},
                    )
                    break
                except Exception:
                    print("Let me sleep for 3 seconds")
                    print("ZZzzzz...")
                    time.sleep(3.5)
                    print("Was a nice sleep, now let me continue...")
                    continue

            for chunk in resp:
                video_file.write(chunk)

        video_file.flush()


def video_get(master_json_url, filename, header=None, cookies_jar=None, proxies=None):
    try:
        # 获取主 JSON 数据
        res = requests.get(master_json_url, headers=header, cookies=cookies_jar, verify=True, proxies=proxies)
        res.raise_for_status()  # 如果请求不成功，则引发异常
        content = res.json()

        # 找到最高分辨率的视频
        video_data = content["video"]
        max_height = 0
        for index, data in enumerate(video_data):
            if data["height"] > max_height:
                max_height = data["height"]
                current_index = index

        # 获取视频信息
        video = video_data[current_index]
        base_url = master_json_url[: master_json_url.rfind("video", 0, -26)]
        video_base_url = f"{base_url}video/" + video["base_url"]

        # 下载视频文件
        with open(filename, "wb") as video_file:
            init_segment = base64.b64decode(video["init_segment"])
            video_file.write(init_segment)

            for segment in tqdm(video["segments"], desc="Downloading segments"):
                segment_url = video_base_url + segment["url"]

                # 循环下载直到成功或达到最大尝试次数
                max_attempts = 3
                for attempt in range(max_attempts):
                    try:
                        resp = requests.get(
                            segment_url, stream=True, headers=header, cookies=cookies_jar, verify=True, proxies=proxies
                        )
                        resp.raise_for_status()  # 如果请求不成功，则引发异常
                        for chunk in resp.iter_content(chunk_size=8192):
                            if chunk:
                                video_file.write(chunk)
                        break  # 如果下载成功，跳出循环
                    except requests.exceptions.RequestException as e:
                        print(f"Error downloading segment {segment_url}: {e}")
                        if attempt < max_attempts - 1:
                            print("Retrying...")
                            time.sleep(3)  # 等待一段时间后重试
                        else:
                            print(f"Max attempts reached for segment {segment_url}. Skipping...")
                            break

            video_file.flush()

        print(f"Video downloaded successfully: {filename}")

    except requests.exceptions.RequestException as e:
        print(f"Error retrieving master JSON from {master_json_url}: {e}")
    except KeyError:
        print("Invalid JSON format: missing 'video' key")


def audio_get(master_json_url, filename):
    base_url = master_json_url[: master_json_url.rfind("video", 0, -26)]
    audio_url = (
        base_url.split("sep")[0]
        + "parcel/"
        + master_json_url[master_json_url.rfind("audio/", 0, -15) : master_json_url.find("master")].split(",")[0]
        + ".mp4"
    )

    r = requests.get(audio_url, stream=True, verify=True, proxies={"http": "http://127.0.0.1:10809"})
    f = open(filename, "wb")
    for chunk in r.iter_content(chunk_size=512):
        if chunk:
            f.write(chunk)


def get_mds_video(master_json_url, output_file):
    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(video_get_async(
    #     master_json_url, video_filename, proxy="http://127.0.0.1:10809"))

    video_get(master_json_url, video_filename)
    audio_get(master_json_url, audio_filename)

    # ffmpeg_param = f'ffmpeg -i {video_filename} -i {audio_filename} -vcodec copy -acodec copy "{output_file}"'

    # os.system(ffmpeg_param)
    # os.remove(video_filename)
    # os.remove(audio_filename)


get_mds_video(master_json_url, "20210707083453.mp4")
