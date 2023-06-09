## 属性

src: 源

controls: 属性, 增加播放控件

autoplay: 自动播放, 需要muted

muted: 静音

loop: 循环

poster: 封面

width: 宽度

```html
<video src="foo.mp4" autoplay muted loop controls poster="bar.png"></video>
```

## video对象

获取: document.xxx(video)

curremtTime: 当前时间, 秒

duration: 持续时间, 秒

volume: 音量[0:1]

paused: 暂停

play()

pause())

## 事件

### 加载事件

loadedstart: 当浏览器开始加载视频时触发。

loadedmetadata: 当视频元数据（例如视频的持续时间、尺寸等）被加载时触发。这意味着视频的第一帧可能已经加载，但是整个视频还没有完全加载。

loadeddata: 当视频的第一帧和足够的数据已经被加载时触发。这意味着视频已经可以播放，但是可能还没有完全加载完成。

canplay: 当视频可以开始播放时触发。

canplaythrough: 当视频可以连续播放到结尾时触发。

progress: 当视频正在下载时，每次下载完成一部分时触发。

ended: 当视频播放结束时触发。

abort: 当视频的加载被中止时触发。

error: 加载失败

suspend: 当浏览器停止获取视频数据时触发。

### 播放事件

canplay: 当浏览器可以开始播放视频时触发。

canplaythrough: 当浏览器可以连续播放到结尾时触发。

durationchange: 当视频的总时长发生变化时触发。

emptied: 当当前播放列表为空时触发。

ended: 当视频播放结束时触发。

pause: 当视频暂停时触发。

play: 当视频开始播放时触发。

playing: 当视频正在播放时触发。

progress: 当视频正在下载时，每次下载完成一部分时触发。

ratechange: 当视频播放速率发生变化时触发。

seeked: 当视频跳转至新的时间点时触发。

seeking: 当视频正在跳转至新的时间点时触发。

stalled: 当视频因为需要缓冲更多数据而停止时触发。

timeupdate: 当视频当前时间更新时触发，可以用于显示视频播放进度。

volumechange: 当视频音量发生变化时触发。

waiting: 当视频因为需要缓冲更多数据而暂停时触发。
