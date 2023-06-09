# 脚本运行路径
$PSScriptRoot 

# 路径连接
$Root = "H:\Snippets\Program-Learning\Development\PowerShell"
Join-Path -Path $Root -ChildPath "Test"
Split-Path -Path $Root -Parent