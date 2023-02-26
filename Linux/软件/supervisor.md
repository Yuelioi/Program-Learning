## 初始化

```cmd
# 安装
sudo yum install supervisor

# 运行
sudo /usr/bin/supervisord -c /etc/supervisord.conf
```

## 用 systemctl 管理

```cmd
# 配置文件, 没有则自己创建
/etc/systemd/system/supervisor.service

# 重载配置文件
sudo supervisorctl reread

# 更新配置文件
sudo supervisorctl update

# 启动
sudo systemctl start supervisor

# 停止
sudo systemctl stop supervisor

# 启动进程
sudo supervisorctl start myapp_name | all

# 停止进程
sudo supervisorctl stop myapp | all

# 重启进程
sudo supervisorctl restart process_name | all (在项目ini配置里)

# 查看进程状态
sudo supervisorctl status

```

## 开机时自动启动

```cmd
# 需要创建.service文件
sudo nano / etc/systemd/system/supervisor.service

# 重新加载systemd服务，使新的supervisor服务单元生效
sudo systemctl daemon-reload

# 开启
sudo systemctl enable supervisor

```

## 配置

```cmd
主配置文件
/etc/supervisord.conf
项目配置与日志
/etc/supervisord.d/

```

## 杀死程序

```cmd
ps aux | grep supervisord | grep -v grep
sudo kill 14730 15009
```
