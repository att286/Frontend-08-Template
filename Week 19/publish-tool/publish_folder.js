const http = require('http')
const fs = require('fs')
const archiver = require('archiver')

const request = http.request({
  hostname: '127.0.0.1',
  port: '8082', //8882发布到服务器，8082发布到本地
  method: 'post', //要发送流式内容需要做成post请求
  headers: {
    'Content-Type': 'application/octet-stream', //写死，常见流式传输内容类型，详见http的rfc标准
    // 'Content-Length': stats.size
  }
}, response => {
  console.log(response)
})

const archive = archiver('zip', {
  zlib: { level: 9 }
})
archive.directory('./sample/', false)
archive.finalize()
// archive.pipe(fs.createWriteStream('tmp.zip'))
archive.pipe(request)
