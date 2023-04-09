# 使用 $Env:PATH 获取环境变量
$newPath = $Env:PATH + ";C:\MyFolder"
$newPath

# 使用 SetEnvironmentVariable 修改
# [Environment]::SetEnvironmentVariable("PATH", $newPath, [EnvironmentVariableTarget]::Machine)
# Write-Output $Env:PATH
