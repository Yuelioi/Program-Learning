import asyncio
import json
import aiohttp


async def main(keyword):
    url = "https://music.163.com/api/cloudsearch/pc"

    params = {
        "s": keyword,
        "type": "1",
        "offset": "0",
        "total": "true",
        "limit": "1"}

    async with aiohttp.ClientSession() as session:
        async with session.get(url=url, params=params) as response:
            # content = await response.json()
            content = await response.text()
            content = json.loads(content)
            print(content["result"]["songs"][0]['id'])


loop = asyncio.get_event_loop()
loop.run_until_complete(
    main('透明惑星'))
