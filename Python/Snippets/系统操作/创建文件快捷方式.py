import win32com.client as client
shell = client.Dispatch("WScript.Shell")

# 指定要保存的文件
SAVENAME = r"H:\\Scripting\\Python\\11.txt"
LINKNAME = f'{SAVENAME}.lnk'

# 使用快捷方式
shortcut = shell.CreateShortCut(LINKNAME)

# 指定快捷方式目标
shortcut.TargetPath = SAVENAME
shortcut.save()

print('Create link_copy success...')
