import inspect
import subprocess
from typing import Any
from pathlib import Path

import psutil
from metapensiero.pj.__main__ import transform_string


class AE:
    script: str

    def get_ae_process_path(self):
        for process in psutil.process_iter():
            info = process.name()
            if "AfterFX.exe" in info:
                return process.exe()

    def run(self):
        ae_path = self.get_ae_process_path()

        if ae_path:
            command = f'"{ae_path}" -s {self.script}'
            subprocess.run(command, shell=True)
            print(f"AE script started successfully.")
        else:
            print("AE is not currently running.")


class Layer:
    startTime: int
    name: str

    def moveBefore(self, target: "Layer"):
        ...


class CompItem:
    bgColor: Any
    selectedLayers: list[Layer]


class Project:
    activeItem: CompItem


class APP:
    project: Project


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


def run(func, script_file_path):
    source = compile(func)
    print(source)
    write(source)
    ae = AE()
    ae_path = ae.get_ae_process_path()
    subprocess.run([str(ae_path), "-r", script_file_path])


def ae_script_decorator(func):
    def wrapper(*args, **kwargs):
        run(func, "ae_generated_script.jsx")

    return wrapper


app = APP()


def alert(msg):
    ...


@ae_script_decorator
def main():
    selLayers = app.project.activeItem.selectedLayers
    for layer in selLayers:
        layer.moveBefore(selLayers[1])
        print(layer.name)


main()
