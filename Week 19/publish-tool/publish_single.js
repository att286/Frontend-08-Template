let http = require('http')
let fs = require('fs')

/****** 更新3: 把处理流程放到fs.state回调函数中 ******/
fs.stat('./sample.html', (err, stats) => {
  let request = http.request({
    hostname: '127.0.0.1',
    port: '8082', //8882发布到服务器，8082发布到本地
    method: 'post', //要发送流式内容需要做成post请求
    headers: {
      'Content-Type': 'application/octet-stream', //写死，常见流式传输内容类型，详见http的rfc标准
      'Content-Length': stats.size
    }
  }, response => {
    console.log(response)
  })

  /****** 更新2: 引入pipe之后就不需要file.onData监听了 ******/
  let file = fs.createReadStream('./sample.html')
  file.pipe(request)

  // file.on('data', chunk => {
  //   console.log(chunk.toString())
  //   //客户端的request是一个可写的流，会写进body里
  //   request.write(chunk)
  // })
  file.on('end', chunk => {
    console.log('read finished')
    request.end(chunk)
  })

  /******  更新1: request.end移到file.onEnd ******/
  // request.end()
})
