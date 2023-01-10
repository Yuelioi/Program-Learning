from nonebot import get_driver, logger, on_command
from nonebot.adapters.onebot.v11 import Bot, GroupMessageEvent
from nonebot.typing import T_State
from nonebot.rule import ArgumentParser
from nonebot.adapters.onebot.v11.message import Message
from nonebot.adapters.onebot.v11 import MessageSegment as MS
from nonebot.params import CommandArg
import requests
import aiohttp
import asyncio
import openai


aliases = {"召唤老婆", "召唤mswd", "召唤马子哥", "召唤鹤梦"}
key_douli = ["独立", "兜里", "杜丽", "渡狸", "肚里", "肚狸", "毒理", "毒狸", "杜梨", "独力"]
sb = ["傻逼", "笨蛋", "是猪"]

for key in key_douli:
    for s in sb:
      aliases.add(key + s)
      aliases.add(s + key)
      aliases.add("召唤" + key)

get_image = on_command("moe", aliases=aliases)


async def get_url(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return response.url


async def get_url2(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            json = await response.json()
            return json["data"][0]["urls"]["original"]


openai.api_key = "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"


def get_chat(prompt):

    response = openai.Completion.create(
      model="text-davinci-003",
      prompt=prompt,
      temperature=0.3,
      max_tokens=300,
      top_p=1.0,
      frequency_penalty=0.0,
      presence_penalty=0.0
    )

    return response.choices[0].text.strip()


def get_ai_image(prompt):
    response = openai.Image.create(
      prompt=prompt,
      n=1,
      size="1024x1024"
    )
    return response["data"][0]["url"]


ai_image = on_command("生成图片", priority=99, block=True)


@ai_image.handle()
async def systemInfo(bot: Bot, event: GroupMessageEvent, state: T_State, args: Message = CommandArg()):
    arg = args.extract_plain_text()
    if arg:
        await ai_image.finish(MS.image(get_ai_image(arg)))
    else:
        await ai_image.finish(MS.text("你倒是说话啊 baka"))

chat=on_command("chat", priority=99, block=True)
@ chat.handle()
async def systemInfo(bot: Bot, event: GroupMessageEvent, state: T_State, args: Message=CommandArg()):
    arg=args.extract_plain_text()
    if arg:
        await chat.finish(MS.text(get_chat(arg)))
    else:
        await chat.finish(MS.text("你倒是说话啊 baka"))


get_setu=on_command("setu", aliases={"setu", "涩图"})
setu_group=[491207941, 827264496]

@ get_setu.handle()
async def systemInfo(bot: Bot, event: GroupMessageEvent, state: T_State):
    gid=event.group_id
    if gid in setu_group:

        try:
            msg=await get_url2("https://api.lolicon.app/setu/v2")
        except:
            msg=await get_url("https://www.dmoe.cc/random.php")


        await get_setu.finish(MS.image(str(msg)))
    await get_setu.finish(MS.text("暂无权限喵 请联系管理员开通"))


@ get_image.handle()
async def systemInfo(bot: Bot, event: GroupMessageEvent, state: T_State):
    gid=event.group_id

    try:
        msg=await get_url("https://api.ixiaowai.cn/api/api.php")
    except:
        msg=await get_url("https://www.dmoe.cc/random.php")


    await get_image.finish(MS.image(str(msg)))
