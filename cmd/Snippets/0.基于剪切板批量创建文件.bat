@echo off
rem,复制文件名到剪切板，一行一个文件。文件后缀改下面的md 
rem,by yueli
SET CurrentDir=%~dp0
for /f "eol=; tokens=*" %%I in ('powershell Get-Clipboard') do (
cd.>"%CurrentDir%"/%%I.md
)

exit