@echo off
chcp 65001 >nul
set "filepath=%~1"
echo.

echo 文件完整路径：%1
echo 文件名(去除引号)：%~1
echo 文件名不带后缀：%~n1
echo 文件后缀(带.)：%~x1

pause >nul