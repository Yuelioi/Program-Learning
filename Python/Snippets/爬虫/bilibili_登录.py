import asyncio
import aiohttp

import qrcode

# 参考:https://blog.csdn.net/a1397852386/article/details/123914169


async def generate_qr_code(url, file_path):
    # 创建QRCode对象
    qr = qrcode.QRCode(  # type: ignore
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,  # type: ignore
        box_size=10,
        border=4,
    )
    # 将链接添加到QRCode对象中
    qr.add_data(url)
    qr.make(fit=True)

    # 创建Image对象并保存二维码图片

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(file_path)


async def event_loop(oauth_key):
    post_data = {"oauthKey": oauth_key}
    async with aiohttp.ClientSession() as sessioin:
        async with sessioin.post(
            "https://passport.bilibili.com/qrcode/getLoginInfo", data=post_data
        ) as response:
            return await response.json() if response.status == 200 else {}


async def fetch(url):
    async with aiohttp.ClientSession() as sessioin:
        async with sessioin.get(url) as response:
            return await response.json() if response.status == 200 else {}


async def login():
    # 获取登录验证链接
    data = await fetch("https://passport.bilibili.com/qrcode/getLoginUrl")
    oauth_key = data.get("data", {}).get("oauthKey", "")
    url = data.get("data", {}).get("url", "")

    if oauth_key and url:
        await generate_qr_code(url, "./test.png")
        # 处理生成的二维码
        ...

        is_success, lost_time, login_info = False, 60, {}
        # 循环获取登录状态
        while not is_success and lost_time > 0:
            login_info = await event_loop(oauth_key)
            is_success = login_info.get("status", False)
            lost_time -= 3
            await asyncio.sleep(3)

        print("绑定成功" if is_success else "绑定失败/超时")


loop = asyncio.get_event_loop()
loop.run_until_complete(login())
