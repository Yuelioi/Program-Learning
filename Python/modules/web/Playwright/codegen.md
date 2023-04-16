codegen 是一个好用的交互式工具

```powershell
playwright codegen bilibili.com
playwright codegen https://www.bilibili.com/video/BV1UD4y1s7Wi/
```

```powershell
playwright codegen www.baidu.com 

# 指定尺寸
playwright codegen --viewport-size=800,600 www.baidu.com 
# 指定设备
playwright codegen --device="iPhone 13" www.baidu.com 
# 保存登录信息
playwright codegen --save-storage=auth.json bilibili.com
# 加载登录信息登录
playwright codegen --load-storage=auth.json bilibili.com
```
