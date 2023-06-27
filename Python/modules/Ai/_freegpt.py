from freeGPT import gpt3

# https://github.com/Ruu3f/freeGPT
prompt = "hello everyone and welcome to the first ever episode of the Lair podcast. I'm your host Antoni Prattish and let me start by thinking you so much for just giving us a go and having a listen because if you're made it this far it's already a great win for me. Again welcome this will be episode zero and just so you know this will be a bit different than what we'll be doing for the other episodes to come. Episode zero will be an intro about the podcast I'll talk about what this is and I'm talk about what my ideas are for the future and I'll also try to introduce myself a bit so you know why I'm so you have an idea of why I'm doing it."
print(len(prompt))

# try:
#     proxy = "http://127.0.0.1:10809"
#     resp = gpt3.Completion.create(prompt=prompt, chat=[], proxies= proxy)
#     print(f"🤖 > {str(resp['text'])}")
# except Exception as e:
#     print(f"🤖 > {str(e)}")