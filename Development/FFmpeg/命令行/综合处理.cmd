@REM 合并视频与音频
ffmpeg -i input.mp4 -i input.mp3 -c:v copy -c:a copy output.mp4
