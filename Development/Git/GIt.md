https://www.liaoxuefeng.com/wiki/896043488029600
https://git-scm.com/book/zh/v2
https://liaoxuefeng.gitee.io/resource.liaoxuefeng.com/git/git-cheat-sheet.pdf
https://www.bilibili.com/video/BV1vy4y1s7k6

https://blog.csdn.net/zcube/article/details/47841175







## git
reset 清屏

## 文件管理
mkdir foldername 创建文件夹
ls 查看文件列表
pwd 查看文件路径
start filename 打开文件
touch filename 创建文件
rm filename 删除文件
rm -r foldername
cat filename 查看文件内容

git rm 从版本控制中删除文件


git commit -m "append GPL"

## 状态
git diff
git status
git log

## 版本控制 ``
git reflog 命令历史
git reset --hard HEAD^ 回退上一个版本
git reset --hard 3e3908e4891e24951b11282de308d324f4a3d07e 回退到指定版本，可以只写几位
git reset HEAD readme.txt （暂存区到工作区）

git checkout/restore  -- readme.txt 撤销修改 （发布的到暂存区，暂存区到工作区）

git stash 储存分区（不用 commit 了）
git stash pop 恢复现场

git stash list 查看
git stash apply stash@{0} 恢复指定现场

## 分支
主分支为master

git branch name 创建分支
git switch -c name / git checkout -b name （= git branch dev + git checkout dev ）创建并切换分支
git switch name / git checkout name：切换分支
git switch - 切换上一个分支




git branch 查看所有分支 并显示当前分支（\*）

git merge name 合并某分支到当前。
git merge --no-ff -m "balabala" branch_name 合并分支，显示历史，并添加注释
git branch -d name 删除分支（-D 是强行删除）

git log --graph 查看分支合并图

git cherry-pick 4c805e2.. 把该提交记录的文件弄到本分支



## 推送

git pull

git remote add origin git@github.com:yuelioi/learngit.git 绑定
git push -u origin master 推送（第一次）

git push 直接登录并推送
git push origin master 推送（以后）

git pull origin master 取回远程分支并 与本地master合并
git fetch origin master 取回远程分支，不合并

## 删除远程库（解绑）

git remote -v 查看
git remote rm name 删除

## clone

git clone git@github.com:Yuelioi/youtube-subtitle-srt.git

## 多人
查看远程库信息，使用 git remote -v；

首先，可以试图用 git push origin branch-name 推送自己的修改；

如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；

如果合并有冲突，则解决冲突，并在本地提交；

没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！

如果 git pull 提示 no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令 git branch --set-upstream-to branch-name origin/ branch-name。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。



在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；

建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；


git rebase 提交变成一条直线

## tag
跟 commit 指针一样，只不过好记

git tag v1.0 创建
git tag v0.9 f52c633 创建到指定 commit id
git tag 查看
git show v0.9
git tag -d v0.8 删除

git push origin v1.0 推送 1 个标签
git push origin --tags 推送所有标签
git push origin :refs/tags/v0.9 删除远程标签

## 别名

.git/config 文件

git config --global alias.st status
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
git config --global alias.last 'log -1' （git last 显示最后一次提交）

git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

git lg（查看 commit 记录，简洁版）


##
source tree 关闭了 ssl 验证
git config --global http.sslVerify false


