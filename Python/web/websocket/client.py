import webbrowser
from dataclasses import field, asdict, dataclass

import socketio

event_name = "435826135"


@dataclass
class Message:
    type: str = "text"
    data: dict[str, str] = field(default_factory=dict)
    owner: str = ""
    name: str = ""
    avatar: str = ""
    sendTime: int = 0


sio = socketio.Client()


@sio.event
def on_event(data):
    webbrowser.open(data)


sio.on(f"ev_{event_name}", on_event)
sio.connect("https://server.yuelili.com")
msg = Message(owner="999", data={"raw": "是的"})
sio.emit("message", asdict(msg))

sio.wait()
