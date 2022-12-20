def getYYMMDD():
    """
    获取年月日时分秒毫秒时间戳
    20221221-02242638
    """
    import datetime

    now_time = datetime.datetime.now()
    return now_time.strftime("%Y%m%d-%H%M%S%f")[:-4]
