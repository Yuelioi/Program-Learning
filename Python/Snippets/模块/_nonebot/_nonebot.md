## 判断消息是私聊还是群聊

```python
from nonebot.adapters.onebot.v11 import (
    Bot,
    Message,
    MessageEvent,
    GroupMessageEvent,
    GroupRecallNoticeEvent,
)
print(id)
async def _(bot: Bot, event: MessageEvent, msg: Message = CommandArg()):
    if isinstance(event, GroupMessageEvent):
        msg_type = "group"
        id = event.group_id
    else:
        msg_type = "private"
        id = event.user_id
    # id=event.session_id # 在群里就是群号 私聊就是qq号
```
