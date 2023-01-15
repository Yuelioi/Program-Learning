路径不要有空格, 不然运行乱码

安插件 code runner

setting.json

```json
"code-runner.executorMap": {
  "python": "set PYTHONIOENCODING=utf-8 && $pythonPath $fullFileName",
}
```
