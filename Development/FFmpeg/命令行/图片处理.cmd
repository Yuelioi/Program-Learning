
@REM 图片旋转90, -90, 180,  水平/垂直
ffmpeg -i input.jpg -vf "transpose=1" output.jpg
ffmpeg -i input.jpg -vf "transpose=2" output.jpg
ffmpeg -i input.jpg -vf "transpose=1,transpose=1" output.jpg

ffmpeg -i input.jpg -vf "hflip" output.jpg
ffmpeg -i input.jpg -vf "vflip" output.jpg

@REM 调整图像大小
ffmpeg -i input.jpg -vf "scale=640:480" output.jpg

@REM 图片裁剪
ffmpeg -i input.jpg -vf "crop=320:240:160:120" output.jpg

@REM 添加边框
ffmpeg -i input.jpg -vf "pad=640:480:80:60:black" output.jpg


@REM 图像模糊
ffmpeg -i input.jpg -vf "boxblur=5:1" output.jpg

