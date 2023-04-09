$Root = "H:\Snippets\Program-Learning\Development\PowerShell"

<#* 判断
是否存在
Test-Path -Path $Root
#>



<#* 遍历 

1.遍历文件
Get-ChildItem -Path $Root -File

2.遍历文件夹
Get-ChildItem -Path $Root -Directory

3.深层遍历
Get-ChildItem -Path $Root -Recurse

4.过滤
Get-ChildItem -Path $Root -Filter *.txt


5.遍历 并打印
# $files = Get-ChildItem -Path H:\Snippets\Program-Learning\Development\PowerShell -Recurse

# foreach ($file in $files) {
#     Write-Host $file.FullName
# }
#>

<#* 复制
1.只复制文件夹
Copy-Item -Path "C:\src_dir" -Destination "C:\tar_dir" -PassThru

2.深层复制 -Recurse
#>

<#* 创建
[System.IO.Directory]::CreateDirectory("F:\NewFolder\Child")
New-Item -ItemType Directory -Path "F:\NewFolder\Child" -Force
md F:\NewFolder\Child
#>

