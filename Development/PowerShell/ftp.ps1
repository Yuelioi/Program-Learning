$ftpServer = "ftp://ftp.example.com/"
$ftpUser = "username"
$ftpPassword = "password"
$remoteFilePath = "/remote/path/file.txt"
$localFilePath = "C:\local\path\file.txt"

$ftpRequest = [System.Net.WebRequest]::Create($ftpServer + $remoteFilePath)
$ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
$ftpRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPassword)

$fileContents = [System.IO.File]::ReadAllBytes($localFilePath)
$ftpStream = $ftpRequest.GetRequestStream()
$ftpStream.Write($fileContents, 0, $fileContents.Length)
$ftpStream.Close()

$ftpResponse = $ftpRequest.GetResponse()
Write-Output "File uploaded successfully"
