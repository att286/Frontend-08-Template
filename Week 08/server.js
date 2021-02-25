const http = require('http');

http.createServer((request, response) => {
  let body = [];
  request.on('error', err => {
    console.error('[server] on error: ', err);
  }).on('data', chunk => {
    console.log('[server] on data: ', chunk, chunk.toString());
    body.push(chunk);
  }).on('end', () => {
    console.log('[server] on end, body: ', body);
    body = Buffer.concat(body).toString();
    console.log('[server] on end, body: ', body);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('Hello World\n');
  })
}).listen(8088);

console.log('[server] started');
