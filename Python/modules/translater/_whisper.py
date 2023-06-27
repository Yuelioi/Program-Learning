# @docs: https://github.com/openai/whisper
# @description: Robust Speech Recognition via Large-Scale Weak Supervision
# @require: pip install -U openai-whisper
# @require: ffmpeg

import whisper
model = whisper.load_model("tiny")  # tiny
audio = whisper.load_audio(r"test.mp3")
# audio = whisper.pad_or_trim(audio) # 只用30秒

options = {
    "model": model,
    "audio": audio,
    'verbose': True,
    "language": "en",  # input language, if omitted is auto detected
    "task": "transcribe",  # "translate" or "transcribe" if you just want transcription

}

result = whisper.transcribe(**options)
text = result["text"]
