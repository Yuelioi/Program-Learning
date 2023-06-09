# $AfterProcess = Get-WmiObject -Class Win32_Process -Filter 'Name="AfterFX.exe"' | Select-Object -ExpandProperty Path

# $ae = Get-ChildItem 'HKLM:\SOFTWARE\Adobe\After Effects' |
# Select-Object -ExpandProperty Name |
# ForEach-Object {
#     $name = $_ -replace 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Adobe\\After Effects\\'
#     $InstallPath = (Get-ItemPropertyValue ("HKLM:\SOFTWARE\Adobe\After Effects\${name}") -Name "InstallPath") + "AfterFX.exe"
#     if ($AfterProcess -contains $InstallPath) {
#         @{Name = $name; Path = $InstallPath }
#     }
# }
# $ae


$script = @'

$AfterProcess = Get-WmiObject -Class Win32_Process -Filter 'Name="AfterFX.exe"' | Select-Object -ExpandProperty Path

$ae = Get-ChildItem 'HKLM:\\SOFTWARE\\Adobe\\After Effects' |
Select-Object -ExpandProperty Name |
ForEach-Object {
    $name = $_ -replace 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Adobe\\After Effects\\'
    $InstallPath = (Get-ItemPropertyValue ("HKLM:\\SOFTWARE\\Adobe\\After Effects\\" + $name) -Name "InstallPath") + "AfterFX.exe"
    if ($AfterProcess -contains $InstallPath) {
        @{label = $name; description = $InstallPath }
    }
}
Write-Output ($ae | ConvertTo-Json -Compress)
'@
Invoke-Expression $script