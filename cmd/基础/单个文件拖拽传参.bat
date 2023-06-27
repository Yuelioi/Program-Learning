@echo off
chcp 65001 >nul

set "filepath=%~1"
echo 拖放的文件是：%filepath%
echo.

REM 提取文件后缀
set "filename=%~n1"
set "extension=%~x1"

echo 文件名：%filename%
echo 后缀：%extension%

echo.
echo 在这里执行您的操作...
echo 按任意键继续...
pause >nul
