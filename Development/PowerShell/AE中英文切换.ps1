# Author:Yueli
# Description: Change Language of After Effects
# Link: https://www.yuelili.com/?p=22357


# Get After Effects Version
$versions = Get-ChildItem 'HKLM:\SOFTWARE\Adobe\After Effects' |
Select-Object -ExpandProperty Name |
ForEach-Object { $_ -replace 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Adobe\\After Effects\\' }

# Show Version
for ($i = 0; $i -lt $versions.Count; $i++) {
    Write-Host ($i + 1)$($versions[$i])
}

# Select Version
while ($true) {
    $choice = Read-Host "Select After Effects Version"
    if (-not [int]::TryParse($choice, [ref]$null) -or $choice -lt 1 -or $choice -gt $versions.Count) {
        Write-Host "Please Select Correct Version(index)"
    }
    else {
        break
    }

}

$version = $versions[$choice - 1]
$path = Get-ItemPropertyValue "HKLM:\SOFTWARE\Adobe\After Effects\$version" -Name "InstallPath"


# Lang list
$languages = "zh_CN", "en_US"

for ($i = 0; $i -lt $languages.Count; $i++) {
    Write-Host ($i + 1) $languages[$i]
}


while ($true) {
    $lang_id = Read-Host "Select Language ID"
    if (-not [int]::TryParse($lang_id, [ref]$null) -or $lang_id -lt 1 -or $lang_id -gt $languages.Count) {
        Write-Host "Please Select Correct Version(index)"
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
    Write-Host "Success! Have Changed to" $newLang
}
else {
    Write-Host "Something Error"
}


pause