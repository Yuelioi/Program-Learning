# https://github.com/pengzhile/pandora/blob/master/doc/wiki.md
# token: https://chat.openai.com/api/auth/session

import uuid
from os import getenv
import _chatapi

"""
cd Python\Snippets\AI
pandora -t "token.txt"
"""


access_tokens = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJ5dWVsaW9pMTIxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vYXV0aCI6eyJ1c2VyX2lkIjoidXNlci10QkxhRDhrekdNUHpyOU01dGtCa0NaSjEifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE0MjM5NDg4NzI2MjYwOTgzNjk5IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NzE4ODk1NywiZXhwIjoxNjg4Mzk4NTU3LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSJ9.p1LP5IgKx7-nrgXtYPiaiH9rff0r45XUFCbduBW8ZEBh1pNaHyymj5fJfU08_gsy_2I1xX4LMxrYijgt2pOSNTRGZR9aCRSwTxavWqqsfy4XFQhNc6CVbP8mOMaVeN18Rrx98d8u51LlFbFQweMOu29X7owlaU9JEOrlVW-iYigVn2yNmxa9hgFJqa2Ff0sRuGR_cBzI3hWS82d98Q39RPshYkRYdlxMw-AmeBb6LAzLoScT-rknUt1P7yIBzW-9Lz7SOiFg1EwuxBbKtyx2fUkqUKn6cHyamRmGLxGq5KWr2yQ2DI0-KtRuuWGyiPk1OeiPjNqBdEE3h-PsA2lyJQ"
api_prefix = getenv('CHATGPT_API_PREFIX', 'https://ai.fakeopen.com')
proxy = "http://127.0.0.1:10809"

chatgpt = _chatapi.ChatGPT({access_tokens: access_tokens}, proxy=proxy)


def generate_uuid():
    return str(uuid.uuid4())


prompt = r"翻译成中文:\nThank you very much for listening."
model="text-davinci-002-render-sha",
parent_message_id = generate_uuid()

res = chatgpt.talk(
    prompt=prompt,
    model=model,
    message_id=generate_uuid(),
    parent_message_id=parent_message_id)

chatgpt.goon(model=model,parent_message_id=parent_message_id,conversation_id="")

print(res)
