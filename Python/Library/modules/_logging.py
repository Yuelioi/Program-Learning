import logging

# https://zhuanlan.zhihu.com/p/425678081

# create a logger with the name of the current module
logger = logging.getLogger(__name__)

# set the logging level
# critical > error > warning > info > debug

# logger.setLevel(logging.INFO) # 此为只显示info以上的log,不包含info
# logging.basicConfig(level=logging.INFO) # 此为只显示info以上的log,包含info
logging.basicConfig(format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p') # 可以设置报错时间 01/05/2023 11:31:47 AM Python warning


# create a handler to log messages to the console
console_handler = logging.StreamHandler()

# add the handler to the logger
logger.addHandler(console_handler)

# log a message
logging.debug('Python debug')
logging.info('Python info')
logging.warning('Python warning')
logging.error('Python Error')
logging.critical('Python critical')
