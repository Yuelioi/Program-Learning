import webbrowser

import socketio

sio = socketio.Client()

event_name = "435826135"


sio = socketio.Client()


@sio.event
def on_event(data):
    webbrowser.open(data)


sio.on(f"ev_{event_name}", on_event)
sio.connect("https://server.yuelili.com")


sio.wait()
