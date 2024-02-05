import webbrowser

import socketio

sio = socketio.Client()

event_name = "435826135"
url = ""


# sio.emit(event_name, "https://www.bilibili.com/")
# sio.wait()


from nicegui import ui
from nicegui.events import ValueChangeEventArguments


def create_client():
    global sio
    sio = socketio.Client()

    @sio.event
    def on_event(data):
        webbrowser.open(data)

    sio.on(f"ev_{event_name}", on_event)
    sio.connect("https://server.yuelili.com")


def close_client():
    global sio
    if sio:
        sio.disconnect()


def text_change(event: ValueChangeEventArguments):
    global event_name
    event_name = event.value


def show(event: ValueChangeEventArguments):
    if event.value:
        create_client()
        ui.notify(f"已启动服务")
    else:
        close_client()
        ui.notify(f"已关闭动服务")


def show_url(event: ValueChangeEventArguments):
    global url
    url = event.value


def send_url():
    sio.emit("ev_435826135", url)


with ui.row():
    ui.input("输入你的QQ号", on_change=text_change)
    ui.switch("运行", on_change=show)


with ui.row():
    ui.input("输入测试连接", on_change=show_url)
    ui.button("发送测试", on_click=send_url)

ui.html(
    """<strong>使用方法</strong>
输入你的QQ号, 然后单击启动服务即可,如果更改qq, 请先关闭服务"""
)

ui.run(reload=False, native=False, port=10078)
