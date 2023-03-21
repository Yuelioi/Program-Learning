@REM mp3
@REM libmp3lame
ffmpeg -i audio.wav -acodec libmp3lame audio.mp3

@REM ogg
@REM libvorbis
ffmpeg -i audio.wav  -acodec libvorbis audio.ogg

@REM aac
@REM libfaac
ffmpeg -i audio.wav  -acodec libfaac audio.aac

@REM ac3
@REM libmp3lame
ffmpeg -i audio.wav -acodec libmp3lame audio.mp3

