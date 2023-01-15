https://pypa.github.io/pipx/
https://python-poetry.org/docs/#installing-with-pipx

```cmd
python -m pip install --user pipx # 全局安装
cd C:\Python310 # 因为我的pyhton是自定义安装的 所以要配置下
pipx ensurepath

# 安装poetry
pipx install poetry
```

```cmd
poetry new poetry-demo # 创建项目
```

poetry-demo 目录

```txt
poetry-demo
├── pyproject.toml
├── README.md
├── poetry_demo
│   └── __init__.py
└── tests
    └── __init__.py
```

```toml
pyproject.toml

[tool.poetry]
name = "poetry-demo"
version = "0.1.0"
description = ""
authors = ["Sébastien Eustace <sebastien@eustace.io>"]
readme = "README.md"
packages = [{include = "poetry_demo"}]

[tool.poetry.dependencies]
python = "^3.7.0"
bs4 = "^1.0.0"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

```cmd

poetry config --list


poetry init
poetry add xx

poetry run
poetry run python your_script.py
```
