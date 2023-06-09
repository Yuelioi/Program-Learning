Add-Type -AssemblyName PresentationFramework
[System.Windows.MessageBox]::Show('Hello')
[System.Windows.MessageBox]::Show('Do you want to proceed?', 'Confirm', 'YesNoCancel', 'Error')

Add-Type -AssemblyName Microsoft.VisualBasic
$User = [Microsoft.VisualBasic.Interaction]::InputBox('Username:', 'User', "Enter username here")