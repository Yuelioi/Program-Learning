'''
https://github.com/botuniverse/onebot-11/blob/master/event/README.md
post_type

消息事件 message
└--群消息
└--私聊消息
└--频道消息
请求事件 notice
└--加群
└--加好友...
通知事件 request
└--群成员变动
└--好友变动...
元事件 meta_event
└--OneBot 生命周期
└--心跳
'''

# 分类
import nonebot
from nonebot.adapters.onebot.v11.message import Matcher
from nonebot.adapters.onebot.v11 import PokeNotifyEvent
from nonebot import on_message
matcher = on_message()
nonebot.init()


@matcher.permission_updater
async def update_type(matcher: Matcher):
  return matcher.permission  # return same without session_id check
