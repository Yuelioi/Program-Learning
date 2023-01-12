## on_shell_command

https://v2.nonebot.dev/docs/tutorial/plugin/create-matcher

cmd: 指定命令内容
rule: 事件响应规则 meta_event、message、notice、request
aliases: 命令别名
permission: 事件响应权限
handlers: 事件处理函数列表
temp: 是否为临时事件响应器（仅执行一次）
expire_time: 事件响应器最终有效时间点，过时即被删除
priority: 事件响应器优先级
block: 是否阻止事件向更低优先级传递
state: 默认 state

```python
from nonebot import get_driver, logger, on_shell_command
from nonebot.rule import ArgumentParser
from nonebot.adapters.onebot.v11 import Bot, GroupMessageEvent
from nonebot.adapters.onebot.v11.message import Message
from nonebot.typing import T_State

recovery_command = get_driver().config.dict().get('recovery_command', "恢复群文件") # 获取配置项
recovery_parser = ArgumentParser(add_help=False)
recovery = on_shell_command(recovery_command, parser=recovery_parser, priority=1)

m = on_command("test", aliases={"setu", "涩图"},priority=99, block=True)

m = on_message(priority=10, block=False) # 需要加参数, 不然不能同时存在

@recovery.handle()
async def recover(bot: Bot, event: GroupMessageEvent, state: T_State, args: Message=CommandArg()):
  gid=event.group_id
  arg=args.extract_plain_text()
```

## on_message
