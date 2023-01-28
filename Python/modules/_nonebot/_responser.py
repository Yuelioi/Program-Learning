'''
响应器

正则: on_regex
└--群消息
└--私聊消息
└--频道消息
请求事件
└--加群
└--加好友
提醒事件
└--系统
└--...
'''
from nonebot import on_command
from nonebot.adapters.onebot.v11 import Bot, GroupMessageEvent, MessageSegment
from nonebot.adapters.onebot.v11.message import Message
import nonebot
from nonebot.adapters.onebot.v11 import (
    Bot,
    Event,
    Message,
    MessageEvent,
    PrivateMessageEvent,
    GroupMessageEvent,
    GroupRecallNoticeEvent,

)

nonebot.init()
test = on_command("test", priority=99, block=False)


@test.handle()
async def handle_test(event: GroupMessageEvent):
    ...
