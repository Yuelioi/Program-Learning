import inspect
import subprocess
from typing import Any
from pathlib import Path

import psutil
from metapensiero.pj.__main__ import transform_string


def alert(msg):
    ...


def write(source):
    script_file_path = Path("ae_generated_script.jsx").absolute()

    with open(script_file_path, "w") as script_file:
        script_file.write(source)


def compile(func):
    source = inspect.getsource(func)
    source = source.replace("print", "alert")
    source = "\n".join(source.split("\n")[2:-1])
    source = transform_string(source, enable_es6=True)
    return source


def get_ae_process_path():
    for process in psutil.process_iter():
        info = process.name()
        if "AfterFX.exe" in info:
            return process.exe()


def run(func, script_file_path):
    source = compile(func)
    print(source)
    write(source)

    ae_path = get_ae_process_path()
    subprocess.run([str(ae_path), "-r", script_file_path])


def ae_script_decorator(func):
    def wrapper(*args, **kwargs):
        run(func, "ae_generated_script.jsx")

    return wrapper


class Base:
    def _get(self, arg) -> Any:
        return


class A:
    p: int = 1


class B(Base):
    @property
    def getA(self) -> A:
        return self._get("A")


b = B()
print(b.getA.p)
