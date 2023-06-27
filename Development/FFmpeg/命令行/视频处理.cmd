
@REM 视频截图 第10秒 第1帧
ffmpeg -i input.mp4 -ss 00:00:10 -vframes 1 output.jpg
@REM 视频截图 每10帧截一张
ffmpeg -i input.mp4 -vf "select=not(mod(n\,10))" -vsync vfr output_%04d.png


@REM 视频旋转 
@REM 0.不旋转 
@REM 1.逆时针旋转90度 
@REM 2.顺时针旋转90度 
@REM 3.旋转180度
ffmpeg -i input.mp4 -vf "transpose=1" output.mp4

@REM 视频裁剪 0.33秒 => + 30帧
ffmpeg -i input.mp4 -ss 00:00:00.33 -frames:v 30 output.mp4

@REM 提取视频
ffmpeg -i input.mp4 -an -c:v copy output.mp4

@REM 提取音频
@REM -vn:  no video
@REM -q:a: 设置质量,默认4,0~9,越低越好
ffmpeg -i input.mp4 -vn -c:a copy output.aac # 提取aac
ffmpeg -i input.mp4 -vn output.mp3 # 不管 直接转mp3
ffmpeg -i input.mp4 -vn -c:a libmp3lame -q:a 0 output.mp3 # 转mp3, 质量设置最高

@REM 合并视频1
ffmpeg -i 11.mp4 -i 22.mp4 -filter_complex "[0:v] [0:a] [1:v] [1:a]\
concat=n=2:v=1:a=1 [v] [a]" -map "[v]" -map "[a]" output.mp4

@REM 合并视频2
@REM # filelist.txt
@REM file '11.mp4'
@REM file '22.mp4'
ffmpeg -f concat -safe 0 -i filelist.txt -y output.mp4

