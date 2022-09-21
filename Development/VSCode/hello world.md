开发文档  https://code.visualstudio.com/api/get-started/your-first-extension
知乎专栏 https://zhuanlan.zhihu.com/p/99198980

官方示例  https://github.com/microsoft/vscode-extension-samples/
参考示例 https://github.com/benawad/vsinder/
视频教程  https://www.bilibili.com/video/BV1yA411p7rG?t=1.8
看笑话的插件  https://www.bilibili.com/video/BV1Vh411d7wp?t=868.3

## 初始化

默认环境不赘述 nodejs啥的

```shell
npm install -g yo generator-code  全局安装
```

用vscode打开一个空白文件夹 执行以下命令

```shell
yo code 构建示例
# ? What type of extension do you want to create? New Extension (TypeScript)
# ? 你想用什么创建(TS  也可以选js)

# ? What's the name of your extension? HelloWorld
# ? 名字叫啥
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? helloworld
# ? 给个id

# ? What's the description of your extension? LEAVE BLANK
# ? 项目描述

# ? Initialize a git repository? Yes
# ? 初始化git

# ? Bundle the source code with webpack? Yes
# ? 使用webpack打包工具

# ? Which package manager to use? npm
# ? 使用什么包管理工具


```

## 文件目录

![[../../ASSETS/Pasted image 20220903013934.png]]

## 源码

```javascript
// extension.ts
import * as vscode from 'vscode'; // 引入vscode

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "snippet-collections" is now active!');

  // 在上下文(context) 注册一个命令
  let disposable = vscode.commands.registerCommand('snippet-collections.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from snippet collections!');
  });
  // 上下文追加该命令
  context.subscriptions.push(disposable);

}

export function deactivate() {}
```

## 调试

此时按F5应该可以打开新的vscode界面,然后 ctrl shift p 执行命令

![[../../ASSETS/Pasted image 20220903014314.png]]

## 小坑

我运行后 并没有找到该命令

可以在 帮助 - 切换开发人员工具 查看报错信息

## 报错:提示version不对

原来我的配置项用的vscode是1.71,而我当前版本是1.70,改一下就好

```javascript
// package.json
{
...
  "engines": {
    "vscode": "^1.71.0"  →  1.70
  },
...
```

## 报错:不能用

需要把的preLaunchTask 注释掉(可能因为我用的webpack 这个会预执行自带的task
```javascript 
// lanch.json
// "preLaunchTask": "${defaultBuildTask}"
```


## 小技巧

代码更改后,调试是热更新的,但是窗口不是

可以 ctrl shift p  => developer:reload window(重新加载窗口)

