const http = require('http')
const fs = require('fs')
const archiver = require('archiver')
const child_process = require('child_process')
const queryString = require('querystring')

// 1. 打开 https://github.com/login/oauth/authorize
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.bbf9fd76fe60fe8b`)

// 3. 创建server，接受token，后点击发布
http.createServer((request, response) => {
  const query = queryString.parse(request.url.match(/^\/\?([\s\S]+)/)[1])
  console.log('--- query3', query)
  publish(query.token)
}).listen(8083)

function publish(token) {
  const request = http.request({
    hostname: '127.0.0.1',
    port: '8082', //8882发布到服务器，8082发布到本地
    method: 'POST', //要发送流式内容需要做成post请求
    path: `/publish?token=${token}`,
    headers: {
      'Content-Type': 'application/octet-stream', //写死，常见流式传输内容类型，详见http的rfc标准
      // 'Content-Length': stats.size
    }
  }, response => {
    // console.log(response)
  })

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })
  archive.directory('./sample/', false)
  archive.finalize()
  // archive.pipe(fs.createWriteStream('tmp.zip'))
  archive.pipe(request)
}
