## 配置文件

https://v2.nonebot.dev/docs/tutorial/configuration

- .env.\*
- bot.py

### 读取配置文件

```python
import nonebot
# driver
nonebot.get_driver().config.custom_config
# bot
nonebot.get_bot().config.custom_config
# adapter
nonebot.get_driver()._adapters["adapter_name"].config.custom_config
```

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
