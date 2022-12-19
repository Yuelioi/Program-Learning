import datetime

now_time = datetime.datetime.now()
now_time.strftime("%Y%m%d-%H%M%S%f")[:-4]
