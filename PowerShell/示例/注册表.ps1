Get-ItemProperty -Path Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion

$versions = Get-ChildItem 'HKLM:\SOFTWARE\Adobe\After Effects'