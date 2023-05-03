Write-Output "打印 并且可以交互"
Write-Host "普通打印"
Write-Warning "输出报错信息"


$name = Read-Host -Prompt "请输入你的名字"
Write-Host $name