from Snippets.sub_progress.get_cookie import getCookie
import jsonpath
import requests
import base64
from tqdm import tqdm
import random
import os
import asyncio
import aiohttp


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

header = {
    'User-Agent': agentStr
}


master_json_url = 'https://82vod-adaptive.akamaized.net/exp=1679799524~acl=%2F43469d31-8413-4e4b-9fe1-5b3121dfee29%2F%2A~hmac=e1b59cd80c3ab91f0376fd750093ea9b87d457e62451592a081cbd45f356379d/43469d31-8413-4e4b-9fe1-5b3121dfee29/sep/video/144c52ca,1c2faeef,1c3d35eb,a2d10fd7,bd6fc5ee,f33e0070/audio/331c579c,7f309904,bd151e76/master.json?base64_init=1&query_string_ranges=1'


video_filename = 'v.mp4'
audio_filename = 'a.mp3'


async def download_segment(segment, video_base_url, filename, headers, cookies_jar, proxy):
    segment_url = video_base_url + segment['url']
    print(segment_url)
    async with aiohttp.ClientSession(headers=headers, cookies=cookies_jar) as session:
        async with session.get(segment_url, proxy=proxy) as response:
            if response.status == 200:
                with open(filename, 'ab') as video_file:
                    async for data in response.content.iter_chunked(1024*1024):
                        video_file.write(data)
            else:
                print(
                    f"Failed to download segment {segment['url']}, status code: {response.status}")


async def download_segments(segments, video_base_url, filename, headers, cookies_jar, proxy):
    tasks = []
    for segment in segments:
        task = asyncio.create_task(download_segment(
            segment, video_base_url, filename, headers, cookies_jar, proxy))
        tasks.append(task)
    await asyncio.gather(*tasks)


async def video_get_async(master_json_url, filename, headers=None, cookies_jar=None, proxy=None):
    async with aiohttp.ClientSession(headers=headers, cookies=cookies_jar) as session:
        async with session.get(master_json_url, proxy=proxy) as response:
            if response.status == 200:
                content = await response.json()
                max_size = max(jsonpath.jsonpath(content, '$..height'))
                video = jsonpath.jsonpath(
                    content, f"$..video[?(@.height == {str(max_size)})]"
                )[0]
                base_url = master_json_url[:master_json_url.rfind(
                    'video', 0, -26)]
                video_base_url = f'{base_url}video/' + video['base_url']
                init_segment = base64.b64decode(video['init_segment'])
                with open(filename, 'wb') as video_file:
                    video_file.write(init_segment)
                await download_segments(video['segments'], video_base_url, filename, headers, cookies_jar, proxy)
            else:
                print(
                    f"Failed to download master json, status code: {response.status}")


def video_get(master_json_url, filename):
    res = requests.get(master_json_url, headers=header,
                       cookies=cookies_jar, verify=True, proxies={'http': "http://127.0.0.1:10809"})
    content = res.json()

    max_size = max(jsonpath.jsonpath(content, '$..height'))
    video = jsonpath.jsonpath(
        content, f"$..video[?(@.height == {str(max_size)})]"
    )[0]
    base_url = master_json_url[:master_json_url.rfind('video', 0, -26)]
    video_base_url = f'{base_url}video/' + video['base_url']
    with open(filename, 'wb') as video_file:
        init_segment = base64.b64decode(video['init_segment'])
        video_file.write(init_segment)

        for segment in tqdm(video['segments']):
            segment_url = video_base_url + segment['url']

            import time

            while True:
                try:
                    resp = requests.get(segment_url, stream=True,
                                        headers=header, cookies=cookies_jar, verify=True, proxies={'http': "http://127.0.0.1:10809"})
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


def audio_get(master_json_url, filename):
    base_url = master_json_url[:master_json_url.rfind('video', 0, -26)]
    audio_url = base_url.split('sep')[0] + 'parcel/' + master_json_url[master_json_url.rfind(
        'audio/', 0, -15):master_json_url.find('master')].split(',')[0] + '.mp4'

    r = requests.get(audio_url, stream=True, verify=True,
                     proxies={'http': "http://127.0.0.1:10809"})
    f = open(filename, "wb")
    for chunk in r.iter_content(chunk_size=512):
        if chunk:
            f.write(chunk)


def get_mds_video(master_json_url, output_file):
    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(video_get_async(
    #     master_json_url, video_filename, proxy="http://127.0.0.1:10809"))

    video_get(master_json_url, video_filename)
    # audio_get(master_json_url, audio_filename)

    # ffmpeg_param = f'ffmpeg -i {video_filename} -i {audio_filename} -vcodec copy -acodec copy "{output_file}"'

    # os.system(ffmpeg_param)
    # os.remove(video_filename)
    # os.remove(audio_filename)


get_mds_video(master_json_url, '20210707083453.mp4')
