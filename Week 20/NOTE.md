# 学习笔记

## 持续集成 | 发布前检查的相关知识
## 持续集成 | Git Hooks基本用法
- mkdir git-demo
  cd git-demo
  touch README.md
  git init
  git add README.md
  git commit -a -m 'init'
  git status
  git log
  ls -a（列出所有，包含隐藏）
  open ./.git（finder中打开.git目录）
  which node（找到node环境路径）
  在hooks下新建pre-commit文件
  cd .git/hooks
  ls -l ./pre-commit（查看文件权限）
  chmod +x ./pre-commit（赋予文件可执行权限）
  修改pre-commit文件内容，添加输出
  ./pre-commit（执行脚本）查看结果
  修改README.md
  git add .
  rm ./.DS_Store
  git commit -m 'A sample change'
  看到pre-commit的输出，说明脚本正常运行
## 持续集成 | ESLint基本用法
- mkdir eslint-demo
  cd eslint-demo
  npm init
  npm install -D eslint
  npx eslint --init
  创建index.js并添加内容
  npx eslint ./index.js（使用eslint检查index.js）
## 持续集成 | ESLint API及其高级用法
- 把eslint例子代码写进pre-commit文件
  进入git-demo，复制index.js进来
  npm init
  npm install -D eslint
  npx eslint --init
  添加.gitignore文件并设置
  git add .
  git commit -m 'add index.js'
  虽然检查到错误，但还是提交了
  修改pre-commit代码，进行errorCount检验
- 边界情况
  修改index.js(v1)
  git add index.js
  再次修改index.js(v2)
  此时git status会标出来一绿(v1)一红(v2)两个index.js
  此时commit的会是绿色(v1)的版本，但却是是对红色(v2)版本执行检查
  这就需要用到git stash push命令，创建一条git stash命令。（像是创建了一个临时区域，只保留add过的内容）
  git status
  git stash list
  git stash pop（还原为真实状态）
  git status
  发现两次更改被合成了一次，即v1和v2被合并了
  git add index.js(v1)
  git status
  修改index.js(v2)
  git stash push -k
  git status
  发现当前只有绿色v1版本存在
  npx eslint --init
  npx eslint ./index.js（对v1版本检查）
  git commit -m 'update by stash'
  git stash pop（可能产生冲突，解决后重新提交）
  git add index.js
  git commit -m 'update 5'
- 思路：可以使用child process放到hooks里面去执行git stash命令，可实现自动化
- 服务端web hook
## 持续集成 | 使用无头浏览器检查DOM
- PhantomJS过于老旧，使用Chrome的Headless模式
  资料：https://developers.google.com/web/updates/2017/04/headless-chrome
  命令行运行：alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
  ⬆️可以通过chrome命令调起浏览器窗口
  chrome
  chrome --headless
  chrome --headless --dump-dom about:bank
  chrome --headless --dump-dom about:bank > tmp.txt
  cat tmp.txt
- mkdir headless-demo
  cd headless-demo
  touch main.js
  npm init
  引入puppeteer依赖库（命令行的简单封装）：https://www.npmjs.com/package/puppeteer
  npm install -D puppeteer
  main.js中添加puppeteer的例子代码并修改
  webpack serve 启动15周作业，访问http://localhost:8080/main.html
  运行main.js读取dom数据
