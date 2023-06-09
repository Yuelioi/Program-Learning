
# 版本1:直接下载 Invoke-Expression (New-Object Net.WebClient).DownloadString('https://tool.yuelili.com/file/ae-change-language.ps1')

Invoke-Expression (New-Object Net.WebClient -Property @{ Encoding = [System.Text.Encoding]::UTF8 }).DownloadString('https://tool.yuelili.com/file/ae-change-language.ps1')

