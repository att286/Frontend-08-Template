const http = require('http')
const https = require('https')
const unzipper = require('unzipper')
const queryString = require('querystring')

// 怎么把token回传给客户端？publish-tool是命令行工具，而auth之后auth路由是在浏览器打开，无法跟命令行工具通讯。
// 让client端再启动一个本地服务器，在浏览器跳转到本地服务器，进行发布

// 2. auth路由：接收code，用 code + cliend_id + client_secret 换取 token
function auth(request, response) {
  const query = queryString.parse(request.url.match(/^\/auth\?([\s\S]+)/)[1])
  console.log('--- query2', query)
  getToken(query.code, info => {
    console.log('getToken callback', info)
    // response.write(JSON.stringify(info))
    response.write(`<a href='http://localhost:8083/?token=${info.access_token}'>publish</a>`)
    response.end()
  })
}
function getToken(code, callback) {
  // console.log(`https://github.com/login/oauth/access_token?code=${code}&client_id=Iv1.bbf9fd76fe60fe8b&client_secret=217edf820620262b004d29d74a25a50885e0fa63`)
  // return
  const request = https.request({
    hostname: 'github.com',
    path: `/login/oauth/access_token?code=${code}&client_id=Iv1.bbf9fd76fe60fe8b&client_secret=217edf820620262b004d29d74a25a50885e0fa63`,
    port: 443,
    method: 'POST'
  }, response => {
    // console.log('--->', response)
    let body = ''
    response.on('data', (chunk) => {
      console.log('===2 on data', chunk.toString())
      body += chunk.toString()
    });
    response.on('end', (chunk) => {
      console.log('===2 on end', body)
      callback && callback(queryString.parse(body))
    });
  })
  request.on('error', (e) => {
    console.error('xxx2 error', e);
  });
  request.end()
}

// 4. publish路由：用token获取用户信息，检查权限，接受发布
function publish(request, response) {
  const query = queryString.parse(request.url.match(/^\/publish\?([\s\S]+)/)[1])
  console.log('--- query4', query)
  if (query.token) {
    getUser(query.token, info => {
      console.log('====== getUser done', info, typeof info)
      if (info.login === 'att286') {
        console.log('###### will public')
        request.pipe(unzipper.Extract({ path: '../server/public' }))
        request.on('end', chunk => {
          console.log('###### public done')
          response.end('Success')
        })
      }
    })
  }
}

function getUser(token, callback) {
  const request = https.request({
    hostname: 'api.github.com',
    path: `/user`,
    port: 443,
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'User-Agent': 'toy-publish'
    }
  }, response => {
    // console.log('--->', response)
    let body = ''
    response.on('data', (chunk) => {
      console.log('===4 on data', chunk.toString())
      body += chunk.toString()
    });
    response.on('end', (chunk) => {
      console.log('===4 on end', body, typeof body)
      callback && callback(JSON.parse(body))
    });
  })
  request.on('error', (e) => {
    console.error('xxx4 error', e);
  });
  request.end()
}

http.createServer((request, response) => {
  // console.log(request.headers)
  if (request.url.match(/^\/auth\?/)) {
    return auth(request, response)
  }
  if (request.url.match(/^\/publish\?/)) {
    return publish(request, response)
  }
}).listen(8082)
