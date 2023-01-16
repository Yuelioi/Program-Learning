from nonebot import on_command
from nonebot.adapters.onebot.v11 import Bot, GroupMessageEvent, MessageSegment
from nonebot.adapters.onebot.v11.message import Message
import nonebot
import base64

# 消息事件
# https://docs.go-cqhttp.org/cqcode/#json-%E6%B6%88%E6%81%AF
# https://github.com/botuniverse/onebot-11/blob/master/message/segment.md
# https://v2.nonebot.dev/docs/next/api/adapters/index#MessageSegment

nonebot.init()
test = on_command("test", priority=99, block=False)

# 消息是可以拼接的
# msg = msg1 + msg2
# bot.send(...msg)


@test.handle()
async def handle_test(bot: Bot, event: GroupMessageEvent):

    # CQ码 用Message发送 现在基本不用了
    msg = Message("[CQ:face,id=123]")
    await test.send(msg, at_sender=True)
  
    # 文字
    msg = MessageSegment.text("hello world")
    msg = MessageSegment.text("hello \nworld")

    # 图片 网络/本地/base64
    msg = MessageSegment.image("http://xx.com/1.png")
    # 绝对文件路径, 可以使用pathlib.Path(img_path).as_uri()
    msg = MessageSegment.image(r"file:///H:/test.jpg")
    image_data = ""  # rb格式读取图片数据 xxfile.read()
    msg = MessageSegment.image(
        f"base64://{base64.b64encode(image_data).decode()}")

    # json 具体看onebot文档
    # msg = MessageSegment.json('{\"app\": \"com.tencent.miniapp"&#44...\"}')

    # 语音 网络/本地
    msg = MessageSegment.record("http://xx.com/1.mp3")  # 还没测 其他参见图片 需要ffmpeg(在PATH配置cq自动处理)转amr或者silk

    # 匿名消息
    msg = MessageSegment.anonymous("hello")  # 还没测

    # @at
    msg = MessageSegment.at(10086)  # qq为all代表全体

    # node
    msg = MessageSegment.node(100) # 需要消息id 还没试

    # node_custom
    messages = []
    msg = MessageSegment.node_custom(nickname="自定义发送者" ,user_id=435826135,content= MessageSegment.text("hello"))
    messages.append(msg)
    await bot.send_group_forward_msg(group_id=491207941, messages=messages)

    # 合并转发 forward
    msg = MessageSegment.forward(100)  # 消息id 还没试
    messages.append(msg)
    await bot.send_group_forward_msg(group_id=491207941, messages=messages)
    # !!! 回复 reply 目前不行
    # msg = MessageSegment.reply(text="test",qq=435826135)

    # 骰子 dice

    # qq表情 face
    msg = MessageSegment.face(123)

    # music
    # share
    # msg = MessageSegment.share(url="http://baidu.com", title="百度")  # 失败了 可能会被封控

    bot.send_group_msg(group_id=event.group_id, message=msg)
