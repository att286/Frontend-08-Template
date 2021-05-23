const http = require('http')
const unzipper = require('unzipper')

http.createServer((request, response) => {
  console.log(request.headers)

  request.pipe(unzipper.Extract({ path: '../server/public' }))

  request.on('end', chunk => {
    response.end('Success')
  })
}).listen(8082)
