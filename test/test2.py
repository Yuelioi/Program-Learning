

import subprocess

url = 'https://upos-sz-mirror08ct.bilivideo.com/upgcxcode/23/37/941203723/941203723-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1681599954&gen=playurlv2&os=08ctbv&oi=1700146302&trid=6a2f5e24e1d24069b563a44060b3a59cu&mid=4279370&platform=pc&upsig=94b2f647c734af18e06980e2fce6750a&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&bvc=vod&nettype=0&orderid=0,3&buvid=7380002E-AC6C-7D99-6B92-C282D2DB4F6749511infoc&build=0&agrr=0&bw=17341&logo=80000000'
aria2c_path = r"D:\Program\aria2c.exe"

# subprocess.run([aria2c_path, "-s16", "-x16", "-k1M", "-o", "example.mp4", url])

# 调用 aria2c 命令
cmd = [aria2c_path, "-s16", "-x16", "-k1M", "-o", "example.mp4", url]
result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
