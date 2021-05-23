let http = require('http')

let fs = require('fs')

http.createServer((request, response) => {
  console.log(request.headers)

  let outFile = fs.createWriteStream('../server/public/index.html')

  /****** 更新2: 引入pipe之后就不需要request.onData监听了 ******/
  request.pipe(outFile)

  // 服务端的request是一个可读的流，客户端的request通往服务端的request
  // 用流的方式读取request
  // request.on('data', chunk => {
  //   console.log(chunk.toString())
  //   outFile.write(chunk)
  // })
  request.on('end', chunk => {
    outFile.end()
    response.end('Success')
  })

  /****** 更新1: request.end移到file.onEnd ******/
  // response.end('Hello world')
}).listen(8082)