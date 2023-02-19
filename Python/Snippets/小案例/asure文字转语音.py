import re
from typing import List


import azure.cognitiveservices.speech as speechsdk
from azure.cognitiveservices.speech import AudioDataStream


from pydub import AudioSegment

# 设置key 与 区域
# https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/SpeechServices
from ..secret import speech_key, service_region


def get_speech(srcText: List[str]):

    # 设置配置
    speech_config = speechsdk.SpeechConfig(
        subscription=speech_key, region=service_region)

    # 发音设置
    speech_config.speech_synthesis_voice_name = 'zh-CN-YunxiNeural'

    speech_synthesizer = speechsdk.SpeechSynthesizer(
        speech_config=speech_config)
    for text in srcText:

        speech_synthesis_result = speech_synthesizer.speak_text_async(
            text).get()

        filename = re.sub(r'[\\/*?:"<>|]', '', text)
        filename = '_'.join(filename.split()) + ".wav"

        stream = AudioDataStream(speech_synthesis_result)
        stream.save_to_wav_file("output.wav")
        sound = AudioSegment.from_file("output.wav")
        rate = 1.05
        sound_with_altered_frame_rate = sound._spawn(sound.raw_data, overrides={
            "frame_rate": int(sound.frame_rate * rate)
        })
        sound_slow = sound_with_altered_frame_rate.set_frame_rate(
            sound.frame_rate)

        sound_with_altered_frame_rate.export(filename, format="wav")
