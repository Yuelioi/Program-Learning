# @、?、|、$、% 和 =

<#* @
1.定义数组 $arr = @(1..4)

2.定义hash $hash = @{Name = "小明"; Age = 21 }

3. Here-String 类似python的r""
@'
My name is $name
'@

4.指定对象类型
$myObject = New-Object @([System.IO.FileInfo], "C:\myfile.txt")

5.枚举值
[System.IO.FileAttributes]::ReadOnly -band @([System.IO.FileAttributes]::Directory, [System.IO.FileAttributes]::Hidden)

#>

<#* ?
1. -Filter 的缩写
Get-ChildItem C:\MyFolder -Filter "*example*"
Get-ChildItem C:\yFolder ? *example*
Get-ChildItem C:\yFolder ? {($_.LastWriteTime -ge '$(Get-Date).Date') -and ($_.Extension -eq '.txt')}

2. Where-Object的别名
Get-Service | ? Status -eq "Running"

3. 条件运算符

4. 类型转换
#>


