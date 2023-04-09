New-Module -Name UtilModule -ScriptBlock {
    function Get-Process-By-Port {
        param(
            [Parameter(Mandatory = $true)]
            [int]$Port
        )
        return Get-Process -Id (Get-NetTCPConnection -LocalPort $Port).OwningProcess
    }
}

Export-ModuleMember -Function Get-Process-By-Port
