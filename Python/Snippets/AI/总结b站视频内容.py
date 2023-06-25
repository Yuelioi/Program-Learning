import os
import sys
import whisper

import uuid
from os import getenv


package_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.append(package_path)

from modules.Ai import _chatapi


"""
cd Python\Snippets\AI
pandora --token_file "token.txt"
"""


access_tokens = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJ5dWVsaW9pMTIxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vYXV0aCI6eyJ1c2VyX2lkIjoidXNlci10QkxhRDhrekdNUHpyOU01dGtCa0NaSjEifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE0MjM5NDg4NzI2MjYwOTgzNjk5IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NzE4ODk1NywiZXhwIjoxNjg4Mzk4NTU3LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSJ9.p1LP5IgKx7-nrgXtYPiaiH9rff0r45XUFCbduBW8ZEBh1pNaHyymj5fJfU08_gsy_2I1xX4LMxrYijgt2pOSNTRGZR9aCRSwTxavWqqsfy4XFQhNc6CVbP8mOMaVeN18Rrx98d8u51LlFbFQweMOu29X7owlaU9JEOrlVW-iYigVn2yNmxa9hgFJqa2Ff0sRuGR_cBzI3hWS82d98Q39RPshYkRYdlxMw-AmeBb6LAzLoScT-rknUt1P7yIBzW-9Lz7SOiFg1EwuxBbKtyx2fUkqUKn6cHyamRmGLxGq5KWr2yQ2DI0-KtRuuWGyiPk1OeiPjNqBdEE3h-PsA2lyJQ"
api_prefix = getenv('CHATGPT_API_PREFIX', 'https://ai.fakeopen.com')
proxy = "http://127.0.0.1:10809"

chatgpt = _chatapi.ChatGPT({access_tokens: access_tokens}, proxy=proxy)


def generate_uuid():
    return str(uuid.uuid4())


def convert_to_srt(data):
    srt = ""
    for index, item in enumerate(data):
        start_time = item['start']
        end_time = item['end']
        text = item['text'].strip()

        srt += f"{index + 1}\n"
        srt += f"{convert_time_format(start_time)} --> {convert_time_format(end_time)}\n"
        srt += f"{text}\n\n"

    return srt

def send_to_gpt(prompt):

    model="text-davinci-002-render-sha"
    final = ""
    last_message_id = generate_uuid()
    conversation_id= None
    end_turn = False


    while True:
        if end_turn == False:
            end_turn,res,conversation_id,last_message_id = chatgpt.talk(
                prompt= prompt if conversation_id is None else "继续",
                model=model,
                message_id=generate_uuid(),
                parent_message_id=last_message_id,
                conversation_id=conversation_id
            )
    
            final += res
        else:
            return final
    


def convert_time_format(time):
    milliseconds = int((time - int(time)) * 1000)
    hours = int(time / 3600)
    minutes = int((time % 3600) / 60)
    seconds = int((time % 3600) % 60)

    return f"{hours:02d}:{minutes:02d}:{seconds:02d},{milliseconds:03d}"

def get_whisper():
    # 加载模型与音频
    model = whisper.load_model("tiny")  # tiny 
    audio = whisper.load_audio(r"test.mp3")
    # audio = whisper.pad_or_trim(audio)

    options = {
        "model": model,
        "audio": audio,
        'verbose': True,
        "language": "en",  # input language, if omitted is auto detected
        # "task": "transcribe",  # "translate" or "transcribe" if you just want transcription

    }

    result = whisper.transcribe(**options)
    return  result["text"]

if __name__ == "__main__":
    
    # 设置工作路径
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    text = get_whisper()

    prompt = "请帮我使用中文总结一下, 限定500字以内:\n" + str(text)
    
    print(send_to_gpt(prompt=prompt))
