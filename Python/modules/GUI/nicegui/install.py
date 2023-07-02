import os
import subprocess
from pathlib import Path
import sys
import nicegui


script_path = Path(__file__)  / "demo.py" # 要打包的app.py位置
venv_path = sys.prefix  # 当前 Python 解释器的虚拟环境路径
pyinstaller_path = Path(venv_path , "Scripts", "pyinstaller.exe")   # 虚拟环境中的 PyInstaller 可执行文件路径

cmd = [
    pyinstaller_path,
    "--name", "myapp",
    "--onedir",
    "--windowed",
    "--clean",
    "--add-data", f'{Path(nicegui.__file__).parent}{os.pathsep}nicegui',
    str(script_path)
]


subprocess.call(cmd)