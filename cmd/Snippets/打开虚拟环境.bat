chcp 65001

call .venv\Scripts\activate
if errorlevel 1 (
    echo 激活失败
) else (
    echo 激活成功, 请继续您的操作
)
@cmd /k
