@echo off
(
-c:v copy =  -codec:v copy
)

@REM 通用转换
ffmpeg -i input.mp4 output.mov

@REM MOV
ffmpeg -i input.mp4 -f mov output.mov
ffmpeg -i input.avi -c:v copy -c:a copy output.mov


@REM MP4
ffmpeg -i input.mkv -codec copy output.mp4 @REM 只改变封装格式 直接copy就行
ffmpeg -i input.avi -c:v libx264 -c:a aac output.mp4

