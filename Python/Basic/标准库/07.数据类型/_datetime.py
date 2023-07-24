import datetime

out = datetime.datetime.now()

print(out.isoweekday())
print(out.strftime("%Y%m%d"))
print(out)


def _():
    timestamp = 1675233711
    date = datetime.datetime.fromtimestamp(timestamp)
    print(date)


def _():
    date = datetime.datetime(2022, 12, 24, 10, 45, 11)
    timestamp = int(date.timestamp())
    print(timestamp)
