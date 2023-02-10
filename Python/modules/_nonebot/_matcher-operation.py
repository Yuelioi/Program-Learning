
from nonebot import on_command
import nonebot


# 消息事件
# https://v2.nonebot.dev/docs/tutorial/plugin/matcher-operation


nonebot.init()
test = on_command("test", priority=99, block=False)


@test.handle()
async def handle_test():
  msg = ""  # [str, Message, MessageSegment] 其他msg类别参考 _message
  await test.send(msg)
  await test.send(
    message=msg,
    reply_message=True,  # 是否回复,需要message_id
    message_id=123,  # 关联reply_message
    group_id=456, # 群聊参数,会覆盖私聊
    user_id=789,
    
    message_type="group|private 私聊还是群聊",
    at_sender="bool | 是否为群聊的艾特事件"
  )
