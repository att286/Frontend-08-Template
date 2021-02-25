# 学习笔记

## 知识点
### 浏览器相关
1. 工作的5个步骤
  - URL通过HTTP请求得到HTML
  - HTML通过parse变成DOM树
  - 对DOM进行css computing得到一颗带CSS属性的DOM树
  - 通过对DOM树上的元素进行layout，把树上的的元素产生的盒（CSS生成的核）的位置计算出来
  - 通过render把DOM树画到一张图片（bitmap）上。再通过硬件API显示到屏幕上

2. (有限)状态机处理字符串
  - 每一个状态都是一个机器
    - 在每一个机器里，我们可以做计算/存储/输出...
    - 所有的这些机器接受的输入是一致的
    - 状态机的每一个机器本身没有状态，如果用函数表示，它应该是一个纯函数（无副作用）
  - 每一个状态机知道下一个状态
    - 每个机器都有确定的下一个状态（Moore）
    - 每个机器根据输入决定下一个状态（Mealy）

3. ISO-OSI七层网络模型 - 简单分类
  - HTTP（应用层/表示层/会话层）require('http')
  - TCP（传输层）require('net')
  - Internet（网络层）
  - 4G/5G/Wifi（数据链路层/物理层）

4. TCP与IP的一些基础知识
  - TCP层传输数据的概念是流
  - TCP是被计算机里的软件所使用，每个软件去网卡那数据，网卡根据端口把接收到的数据分给各个应用
  - TCP的传输的概念是包，IP根据地址找到这个包应该从哪到哪
  - IP协议的底层库使用C++的libnet（构造IP包并发送）和libcap（从网卡抓所有流经网卡的IP包）

5. HTTP
  - TCP是全双工，而HTTP先由客户端发起一个request，服务端再返回一个response，一一对应
  - HTTP协议是一个文本协议（跟二进制协议相对），所有内容都是字符串。
  - request构成
    - 第一行是Request line。POST /HTTP/1.1(method:POST/GET/PUT/DELETE/options, path:/, HTTP, HTTP版本 )
    - 接着是headers，多行，每一行都是kv值，以一个空行为结束标志，Content-type是必要值，另外Host也很重要
    - 接着是body，内容格式由Content-type决定格式，本质也是kv的组合
    - 所有HTTP协议里的换行都是由\r\n两个字符组成的换行符
  - response构成
    - 第一行是status line。HTTP/1.1 200 OK(HTTP, HTTP版本, HTTP状态码, HTTP状态文本)
    - 接着是headers，同request
    - 接着是body，内容格式由Content-type决定格式，典型的是chunked body（node的默认格式）
      - 第一行是一个16进制的数字
      - 内容部分
      - 又一个16进制的数字，0
      - 最后也是空行？


## 学习心得


## 可选作业
  - 如何用状态机完成完全位置的pattern？（字符串KMP算法）
