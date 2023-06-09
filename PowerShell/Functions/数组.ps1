$data = @(1, 2, 3, 3)

# 获取非重复值的3种方法
$data = $data | Select-Object -Unique
$data | Sort-Object -Unique
$data | Sort-Object | Get-Unique
