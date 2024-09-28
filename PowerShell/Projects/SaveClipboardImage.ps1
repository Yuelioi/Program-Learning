# 加载必要的 .NET 组件
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

# 检查是否提供了文件路径参数
if ($args.Count -eq 0) {
    Write-Host "请提供一个文件路径作为参数。"
    exit
}

# 获取命令行参数中的文件路径
$filePath = $args[0]

# 从剪贴板获取图片
$image = [System.Windows.Forms.Clipboard]::GetImage()

# 如果剪贴板中有图片，则保存
if ($image) {
    try {
        $bitmap = New-Object System.Drawing.Bitmap($image)
        $bitmap.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "图片已保存至 $filePath"
    } catch {
        Write-Host "保存图片时发生错误: $_"
    }
} else {
    Write-Host "剪贴板中没有图片"
}