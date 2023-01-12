from nonebot.adapters.onebot.v11 import Bot, GroupMessageEvent
from nonebot.params import EventPlainText
from nonebot.typing import T_State
from nonebot.rule import ArgumentParser
from nonebot.adapters.onebot.v11.message import Message
from nonebot.adapters.onebot.v11 import MessageSegment as MS
from nonebot.params import CommandArg, RawCommand
from pathlib import Path
from PIL import Image

import requests
import random
import time
import aiohttp
import asyncio

from aiohttp import TCPConnector
import openai
from config import *
import datetime


def generate_pos(image_width):


async def handle_image(src):
    src = Path(src).resolve()
    image = Image.open(src)

    image_copy = image.copy()
    width = 3
    image_new = Image.new('RGB', (width, width), (0, 0, 255))
    image_width = image.width
    image_height = image.height

    for i in range(5):
        nd_w = random.randint(1, image_width-width)
        rnd_h = random.randint(1, clip*2)
        rnd = random.randint(width, image.width-width)
        if rnd_h > clip:
            rnd_h = image_height-rnd_h+clip
        image_copy.paste(image_new, (rnd_w, rnd_h, rnd+width, rnd+width))
    out = r'/www/wwwroot/project/Robot/nobotX/diy/temp/' + \
        datetime.datetime.now().strftime("%Y%m%d-%H%M%S%f")[:-4] + src.suffix
    image_copy.save(out)
    return out


@test.handle()
async def handle_test(bot: Bot, event: GroupMessageEvent):

    await test.finish(MS.image(Path("/www/wwwroot/project/Robot/nobotX/diy/images/96102232.jpg")))


@reply.handle()
async def handle_reply(bot: Bot, msg: Message = EventPlainText()):
    for key in reply_data.keys():
        if key in msg:
            await reply.finish(MS.text(reply_data[key]))

    for wd in one_word_list.keys():
        if wd == msg:
            await reply.finish(MS.text(one_word_list[wd]))


def get_chat(prompt):
    openai.api_key = random.choice(api_keys)
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.3,
        max_tokens=800,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )

    return response.choices[0].text.strip()


def get_ai_image(prompt):
    openai.api_key = random.choice(api_keys)
    response = openai.Image.create(
        prompt=prompt,
        n=1,
        size="1024x1024"
    )
    return response["data"][0]["url"]


@ai_image.handle()
async def ai_imagee(bot: Bot, event: GroupMessageEvent, state: T_State, args: Message = CommandArg()):
    arg = args.extract_plain_text()
    if arg:
        await ai_image.finish(MS.image(get_ai_image(arg)))
    else:
        await ai_image.finish(MS.text("你倒是说话啊 baka"))


@ chat.handle()
async def chatt(bot: Bot, event: GroupMessageEvent, state: T_State, args: Message = CommandArg()):
    arg = args.extract_plain_text()
    if arg:
        await chat.finish(MS.text(get_chat(arg)))
    else:
        await chat.finish(MS.text("你倒是说话啊 baka"))


async def get_url2(url, cmd):
    params = {}
    if cmd == "r18":
        params = {"r18": 1}
    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params) as response:
            json = await response.json()
            tar_url = json["data"][0]["urls"]["original"]
            name = json["data"][0]["pid"]
            img = await session.get(tar_url, proxy='http://127.0.0.1:10809')
            content = await img.read()
            target = "diy/images/" + str(name) + "." + tar_url.split(".")[-1]

            with open(target, 'wb') as f:
                f.write(content)

            return target


@ get_setu.handle()
async def get_setuu(bot: Bot, event: GroupMessageEvent, state: T_State, cmd: str = RawCommand()):
    gid = event.group_id
    if gid in setu_group:

        try:
            img_path = await get_url2("https://api.lolicon.app/setu/v2", cmd)
        except:
            img_path = await get_url("https://www.dmoe.cc/random.php")

        file_path = await handle_image(img_path)
        try:
            msg = MS.image(Path(file_path).as_uri())
        except:
            msg = MS.text("获取失败喵")
        await get_setu.finish(msg)
    await get_setu.finish(MS.text("暂无权限喵 请联系管理员开通"))


async def get_url(url):
    async with aiohttp.ClientSession(connector=TCPConnector(ssl=False)) as session:
        async with session.get(url) as response:
            return response.url


@ get_image.handle()
async def get_imagee(bot: Bot, event: GroupMessageEvent, state: T_State):
    gid = event.group_id

    try:
        msg = await get_url("https://api.ixiaowai.cn/api/api.php")
        await get_image.finish(MS.image(str(msg)))
    except:
        msg = await get_url("https://www.dmoe.cc/random.php")

    await get_image.finish(MS.image(str(msg)))
