import os
import openai


openai.api_key = "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"

# response = openai.Completion.create(
#   model="text-davinci-003",
#   prompt="兜里是傻逼么\n",
#   temperature=0.3,
#   max_tokens=100,
#   top_p=1.0,
#   frequency_penalty=0.0,
#   presence_penalty=0.0
# )
# print(response.choices[0].text)

response = openai.Image.create(
  prompt="美少女",
  n=1,
  size="1024x1024",
)

print(response["data"][0]["url"])

