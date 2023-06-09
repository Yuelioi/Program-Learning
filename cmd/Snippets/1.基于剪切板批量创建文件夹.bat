@echo off
rem,复制文件夹名到剪切板，一行一个文件夹名。
rem,by yueli
SET CurrentDir=%~dp0
for /f "eol=; tokens=*" %%I in ('powershell Get-Clipboard') do (
md "%CurrentDir%%%I"
)
exit

