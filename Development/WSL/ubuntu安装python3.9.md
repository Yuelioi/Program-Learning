[如何在 Ubuntu 20.04 上安装 Python 3.9 | Linux化](https://linuxize.com/post/how-to-install-python-3-9-on-ubuntu-20-04/)

1.更新包列表并安装先决条件：

```powershell
sudo apt update
sudo apt install software-properties-common
```

2.将 deadsnakes PPA 添加到系统的源列表中：

```powershell
sudo add-apt-repository ppa:deadsnakes/ppa复制
```

出现提示时，按 `[Enter]`继续。

3.启用存储库后，您可以通过执行以下命令安装 Python 3.9：

```powershell
sudo apt install python3.9复制
```

4.通过键入以下内容验证安装是否成功：

```powershell
python3.9 --version
```
