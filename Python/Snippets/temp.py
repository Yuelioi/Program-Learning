import os
import openai



openai.api_key = "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"

response = openai.Completion.create(
  model="text-davinci-003",
  prompt="Translate this into Chinese :\n\nWhat rooms do you have available?\n",
  temperature=0.3,
  max_tokens=100,
  top_p=1.0,
  frequency_penalty=0.0,
  presence_penalty=0.0
)
# \u4f60\u6709\u4ec0\u4e48\u623f\u95f4\u53ef\u7528\uff1f
print(response.choices[0].text.encode("utf-8").decode('unicode'))