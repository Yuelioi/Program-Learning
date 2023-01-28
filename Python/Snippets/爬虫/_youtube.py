

import aiohttp
import asyncio


asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())


async def main(video_id: str, api_key: str):
    url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={video_id}&key={api_key}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url, proxy='http://127.0.0.1:10809') as response:

            if response.status == 200:
                data = await response.json()

                title = data["items"][0]["snippet"]["title"]
                description = data["items"][0]["snippet"]["description"]
                thumbnail_url = data["items"][0]["snippet"]["thumbnails"]["standard"]["url"]
                print(
                    f"链接：https://www.youtube.com/watch?v={video_id}\n标题：{title}\n简介：{description}")
                print(thumbnail_url)
                return thumbnail_url

video_id = "27KYsQx8aRE"
youtube_key = "AIzaSyDvKk4zrOCcF4MJEZeerPt9MdLNaUuw6Vs"

loop = asyncio.get_event_loop()
loop.run_until_complete(
    main('https://www.youtube.com/watch?v=27KYsQx8aRE&ab_channel=MagnetVFX', video_id, youtube_key))
