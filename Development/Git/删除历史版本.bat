@REM 1. 创建一个新的空白分支并进入仓库目录
git checkout --orphan clean-history

@REM 2. 添加所有文件到暂存区
git add -A

@REM 3. 提交清理后的文件
git commit -m "Clean up history"

@REM 4. 删除原来的默认分支（例如，"master" 或 "main"）
git branch -D master

@REM 5. 将当前分支重命名为原来的默认分支名称（例如，将 "clean-history" 重命名为 "master"）
git branch -m master

@REM # 6. 将本地分支与远程仓库关联
git remote add origin git@github.com:Yuelioi/NoteP.git

@REM 7. 强制推送到远程仓库
git push -f origin master
