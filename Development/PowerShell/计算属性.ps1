Get-WmiObject win32_logicaldisk -Filter "deviceID='C:'" |  # 获取C盘
Select-Object @{N = 'FREEGB'; E = { $_.FREESPACE / 1GB } } # 获取剩余空间(FREESPACE),并使用计算属性 把字节转为GB

# N：定义计算属性的名称，这里定义的是 'FREEGB'，表示空闲磁盘空间的大小（单位为 GB）。
# E：定义计算属性的表达式，它将根据现有属性的值计算新属性的值。这里的表达式是 $_.FREESPACE / 1GB，它表示取当前对象的 'FREESPACE' 属性的值（单位为字节），然后将其除以 1GB，以便将结果转换为以 GB 为单位的空闲磁盘空间大小。
# 具体来说，$_ 是一个占位符，代表当前正在处理的对象。
