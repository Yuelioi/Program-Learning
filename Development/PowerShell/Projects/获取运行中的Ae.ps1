$AfterFx = Get-WmiObject -Class Win32_Process -Filter 'Name="AfterFX1.exe"'
$AfterFx
if ($AfterFx) {
    $AfterFx
}
