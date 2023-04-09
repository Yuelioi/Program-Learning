[Environment]::Newline + (Get-Content -Raw $PROFILE) | Set-Content -Encoding utf8 $PROFILE

$description = "欢迎使用AE语言切换系统
版本:        1.2
作者:        月离
使用链接:     https://www.yuelili.com/?p=22357
"

Write-Host $description

# Get After Effects Version
$versions = Get-ChildItem 'HKLM:\SOFTWARE\Adobe\After Effects' |
Select-Object -ExpandProperty Name |
ForEach-Object { $_ -replace 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Adobe\\After Effects\\' }

if ($versions.Count -eq 1) {
    $version = $versions
    Write-Host "检测到Ae版本为:" $version
}
else {
    Write-Host "检测到本机安装以下几个版本Ae:"
    # Show Version
    for ($i = 0; $i -lt $versions.Count; $i++) {
        Write-Host (($i + 1).ToString() + ". " + $versions[$i])
    }

    # Select Version
    while ($true) {
        $choice = Read-Host "请输入序号"
        if (-not [int]::TryParse($choice, [ref]$null) -or $choice -lt 1 -or $choice -gt $versions.Count) {
            Write-Host "请选择正确的序号喔"
        }
        else {
            break
        }
    }

    $version = $versions[$choice - 1]
}


Write-Host ""

$path = Get-ItemPropertyValue "HKLM:\SOFTWARE\Adobe\After Effects\$version" -Name "InstallPath"

# Lang list
$languages = "zh_CN", "en_US"

for ($i = 0; $i -lt $languages.Count; $i++) {
    Write-Host (($i + 1).ToString() + ". " + $languages[$i])
}


while ($true) {
    $lang_id = Read-Host "请输入要修改的语言序号"
    if (-not [int]::TryParse($lang_id, [ref]$null) -or $lang_id -lt 1 -or $lang_id -gt $languages.Count) {
        Write-Host "请选择正确的序号喔"
    }
    else {
        break
    }
} 

$newLang = $languages[$lang_id - 1]

# Read XML File
$xmlPath = Join-Path $path "AMT\application.xml"
$xml = [xml](Get-Content $xmlPath)


$node = Select-Xml -Xml $xml -XPath "//Data[@key='installedLanguages']"

# Change Language
if ($node) {
    $node.Node.InnerText = $newLang
    $xml.Save($xmlPath)
    Write-Host "成功啦! 已经切换到" $newLang "重启AE以生效"
}
else {
    Write-Host "似乎出现了什么问题, 请联系作者"
}

pause