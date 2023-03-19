# https://pysubs2.readthedocs.io/en/latest/tutorial.html


import pysubs2


# read
subs = pysubs2.load("subtitle.srt")

# write

SIMPLE_FILE = """\
1
00:00:00,000 --> 00:01:00,000
Once upon a time,

2
00:01:00,000 --> 00:02:00,000
there was a SubRip file
with two subtitles.
"""
# with open("subtitles.srt", "w") as fp:
#     fp.write(SIMPLE_FILE)

# or subs.save(xx)

# loop
# for sub in subs:
#     print(sub)
#     print(sub.start)
#     print(sub.text)

sub = subs[0]
# sub property
sub.start  # milliseconds
sub.end
sub.duration
sub.text

sub.shift(ms=1000)  # 整体向后移动1000ms


# time convert
# subs[1].start = pysubs2.make_time(s=2)  # h/m/s/ms

print(pysubs2.time.ms_to_str(1050, True))  # 0:00:01.050
