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
sio.connect("https://server.yuelili.com")

msg = Message(owner="999", data={"raw": "是的"})
sio.emit(f"message", asdict(msg))


sio.wait()
