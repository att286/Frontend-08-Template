# 学习笔记

## 安装Linux
  1. 虚拟机设置
    姓名：kin
    用户名：kin
    密码：11111111
  2. 安装设置
    名称：Node Server
  3. 修改Mirrow address
    http://cn.archive.ubuntu.com/ubuntu
    http://mirrors.ailiyun.com/ubuntu
    https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
  4. 系统设置
    name: kin
    server's name: kin-server
    username: kin
    password: 11111111
  5. 选中Install OpenSSH server
  6. 安装依赖
    sudo apt install nodejs
    sudo apt install npm
    sudo npm config set registry https://registry.npm.taobao.org
    sudo npm config list
    sudo npm install -g n
    sudo n latest 或者 sudo n v14.11.0
    PATH="$PATH"

## Express
  1. 初始化 - 本机
    mkdir server
    cd server
    npx express-generator
    npm install
    npm start
    localhost:3000访问
    修改app.js
    重新启动
    public文件夹新建index.html并写入内容
  2. 部署server到服务器
    服务器端运行 service ssh start 启动服务，默认22端口
    虚拟机设置端口转发。本机8022转发到虚拟机22。
    服务器创建server文件夹：mkdir server
    从本机拷贝文件到服务器：scp -P 8022 -r ./* kin@127.0.0.1:/home/kin/server (拷贝本机整个目录到服务器/home/kin/server目录下)
    虚拟机cd server然后npm start
    虚拟机设置端口转发。本机8080转发到虚拟机3000。
    本机通过localhost:8080即可访问到服务端的localhost:3000服务。
  3. 发布服务，由发布的服务器端和发布工具组成。把文件通过http的方式传给发布服务器。
    ### publish-server
      本机 mkdir publish-server（负责向真实的服务器 copy文件，使用express或者koa等框架，本例使用http api）
      进入文件夹，执行npm init
      创建server.js
      node ./server.js启动
      localhost:8082访问
    ### publish-tool
      本机mkdir publish-tool
      进入文件夹，执行npm init
      创建publish.js
      node publish.js启动
      localhost:8082访问
  4. 了解node的流式传输
    event的data事件：读取到数据
    event的close事件：读取完成
    publish.js引入文件系统的包fs
  5. 发布流程
    publish-tool的publish.js读取文件流，写进request
    publish-server的server.js从request读取文件流，写进server目录的public目录
    在publish-server的pachage.json中新加publish脚本（目标文件夹是服务器的publish-server目录）
    在publish-server的pachage.json中新加start脚本，方便启动服务
    在server目录的pachage.json中新加publish脚本（目标文件夹是服务器的server目录）
    在publish-server执行npm run publish
    在服务器的server目录执行npm start&
    在服务器的publish-server目录执行npm start&
    虚拟机设置端口转发。本机8882转发到虚拟机8082。
    修改publish-tool的publish.js中的port参数，由8082修改为8882，之后就会直接发布到服务器上
    运行publish-tool的脚本，发布文件到服务器，访问localhost:8080查看发布到服务器的文件
## 多文件发布
  使用archiver包: https://www.npmjs.com/package/archiver
  使用unzipper包: https://www.npmjs.com/package/unzipper
  使用nodejs的pip方法，把可读流导入可写流
  publish-tool执行 npm install -s archiver
  publish-server执行 npm install -s unzipper
## 登录鉴权
  到github setting创建新app: github.com - Settings - Developer settings - New GitHub App
    GitHub App name: toy-publish
    Homepage URL: http://localhost 或者 http://127.0.0.1
    Callback URL: http://localhost:8082/auth
    取消 Expire user authorization tokens
    取消 Webhook
    Where can this GitHub App be installed: Any account
    提交
    Generate a new client secret
  oAuth流程
    登录 https://github.com/login/oauth/authorize 返回code。 https://github.com/login/oauth/authorize?client_id=Iv1.bbf9fd76fe60fe8b
    到 https://github.com/login/oauth/access_token 换取token
    带上 Authorization: token 的头访问 https://api.github.com/user
