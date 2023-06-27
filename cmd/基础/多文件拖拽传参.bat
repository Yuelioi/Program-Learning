@echo off
chcp 65001 >nul

REM 获取拖放文件的数量
set "fileCount=0"
for %%A in (%*) do (
    set /a "fileCount+=1"
)

echo 拖放的文件数量：%fileCount%
echo.

REM 处理每个文件
for %%B in (%*) do (
    echo 文件路径：%%B
    echo 文件名：%%~nB
    echo 后缀：%%~xB
    echo.
)

echo 在这里执行您的操作...
echo 按任意键继续...

pause >nul
