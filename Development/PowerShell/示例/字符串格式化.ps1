$str1, $str2 = "hello" , "world"

# 直接输出 => hello world
Write-Host $str1 $str2

# + => helloworld
Write-Host ($str1 + $str2)

# join => hello.world
Write-Host ($str1, $str2 -join ".")

# 格式化处理 => hello.world
$concatString = "{0}.{1}" -f $str1, $str2
Write-Host $concatString





# 换行
Write-Host "第一行文本 `r`n第二行文本"
