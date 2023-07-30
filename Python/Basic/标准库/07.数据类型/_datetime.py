import datetime
import time


def _date():
    today = datetime.date.today()

    print(today.year)  # 2023
    print(today.month)  # 7
    print(today.day)  # 27

    print(datetime.date.ctime(today))  # Thu Jul 27 00:00:00 2023
    print(datetime.date.today())

    # *格式化
    print(datetime.date.isoformat(today))  # str,YYYY-MM-DD格式 2023-07-27
    print(datetime.date.strftime(today, "%y/%m/%d"))  # str, 23/07/27

    print(datetime.date.fromisocalendar(2023, 30, 4))  # date, 2023-07-27
    print(datetime.date.fromisoformat(str(today)))  # date, 2023-07-27

    # *奇葩推日期
    print(datetime.date.fromordinal(738728))  # 2023-07-27
    print(datetime.date.fromtimestamp(1))  # 1970-01-01

    # *周几
    print(datetime.date.isoweekday(today))  # 4
    print(datetime.date.weekday(today))  # 3

    # *更改日期
    print(datetime.date.replace(today, 2020, 1, 1))  # 2020-01-21

    # *详细信息
    # 日历信息 (year=2023, week=30, weekday=4)
    print(datetime.date.isocalendar(today))
    # 好长信息 (tm_year=2023, tm_mon=7, tm_mday=27, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=208, tm_isdst=-1)
    print(datetime.date.timetuple(today))

    print(datetime.date.toordinal(today))  # 0001-01-01至今天数 738728

    # *度量
    print(datetime.date.max)  # 最大 9999-12-31
    print(datetime.date.min)  # 最小 0001-01-01
    print(datetime.date.resolution)  # 间隔 1 day, 0:00:00

    # print("\n".join(dir(datetime.date)))


def _datetime():
    now = datetime.datetime.now()

    # *属性
    print(now.fold)  # 0 夏令时
    print(now.year)  # 2023
    print(now.month)  # 7
    print(now.day)  # 27
    print(now.hour)  # 1
    print(now.minute)  # 36
    print(now.second)  # 8
    print(now.microsecond)  # 603848
    print(datetime.datetime.resolution)  # 精度, 0:00:00.000001

    # *获取日期
    # datetime,2023-07-27 01:36:08.603848+08:00
    print(datetime.datetime.astimezone(now))

    print(datetime.datetime.date(now))  # _Date, 2023-07-27
    print(datetime.datetime.today())  # datetime, 2023-07-27 02:42:49.243627
    print(datetime.datetime.now())  # datetime, 2023-07-27 02:42:49.243627

    # datetime, 2023-07-27 00:00:00
    print(datetime.datetime.strptime("230727", "%y%m%d"))
    # datetime,Thu Jul 27 02:42:49 2023
    print(datetime.datetime.fromisoformat("2023-07-27"))

    print(datetime.datetime.ctime(now))  # str, Thu Jul 27 02:42:49 2023
    print(datetime.datetime.strftime(now, "%y%m%d"))  # str,230727
    print(datetime.datetime.isoformat(now))  # str,2023-07-27T02:42:49.243627

    # datetime, 2023-07-27 00:00:00
    print(datetime.datetime.fromordinal(738728))
    print(datetime.datetime.fromtimestamp(1))  # 1970-01-01 08:00:01

    # datetime, 2023-07-27 02:42:49.243627

    print(datetime.datetime.time(now))  # _Time, 02:42:49.243627
    print(datetime.datetime.timetz(now))  # _Time, 02:42:49.243627
    print(datetime.datetime.timestamp(now))  # float, 1690397093.075116

    # *更改时间
    print(datetime.datetime.replace(now, 2023))
    # datetime, 2023-07-27 01:36:08.603848+08:00
    print(datetime.datetime.combine(now, datetime.time()))
    print(datetime.datetime.fromisocalendar(
        2023, 30, 4))  # datetime,日历时间 2023-07-27 00:00:00

    print(datetime.datetime.toordinal(now))  # 738728
    print(datetime.datetime.isoweekday(now))  # 4
    print(datetime.datetime.weekday(now))  # 3

    # * 详细信息
    # datetime.IsoCalendarDate(year=2023, week=30, weekday=4)
    print(datetime.datetime.isocalendar(now))
    # (tm_year=2023, tm_mon=7, tm_mday=27, tm_hour=2, tm_min=44, tm_sec=53, tm_wday=3, tm_yday=208, tm_isdst=-1)
    print(datetime.datetime.timetuple(now))
    # (tm_year=2023, tm_mon=7, tm_mday=27, tm_hour=2, tm_min=46, tm_sec=51, tm_wday=3, tm_yday=208, tm_isdst=0)
    print(datetime.datetime.utctimetuple(now))

    # *时差相关
    print(datetime.datetime.dst(now))  # 时差

    # datetime, UTC时间, 2023-07-26 18:46:51.673983
    print(datetime.datetime.utcnow())
    # datetime, UTC时间戳, 1970-01-01 00:00:01
    print(datetime.datetime.utcfromtimestamp(1))
    print(datetime.datetime.utcoffset(now))  # None

    print(datetime.datetime.tzname(now))  # None
    # <attribute 'tzinfo' of 'datetime.datetime' objects>
    print(datetime.datetime.tzinfo)

    print(datetime.datetime.max)  # 9999-12-31 23:59:59.999999
    print(datetime.datetime.min)  # 0001-01-01 00:00:00

    # print("\nprint(datetime.datetime.".join(dir(datetime.datetime)))


def _time():
    now = datetime.time(3, 28, 29, 121716)

    # print(datetime.time.fromisoformat(
    #     datetime.datetime.now().strftime("%H:%M:%S.%f")))  # time 03:28:29.121716

    # time 03:28:29.121716
    print(datetime.time.fromisoformat(str(datetime.datetime.now().time())))
    print(now.hour)  # 3
    print(now.minute)  # 28
    print(now.second)  # 29
    print(now.microsecond)  # 121716

    print(datetime.time.isoformat(now))  # str
    print(datetime.time.strftime(now, ""))  # str

    print(datetime.time.max)  # 23:59:59.999999
    print(datetime.time.min)  # 00:00:00

    print(datetime.time.replace(now))
    print(datetime.time.resolution)  # 0:00:00.000001

    # print(datetime.time.tzinfo)
    # print(datetime.time.dst(now))  # None
    # print(now.fold)  # 0
    # print(datetime.time.tzname(now))
    # print(datetime.time.utcoffset(now))

    # print("\nprint(datetime.time.".join(dir(datetime.time)))


if __name__ == "__main__":
    # _date()
    # _datetime()
    # _time()
    datetime.timedelta()
