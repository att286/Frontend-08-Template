// node server.js
const http = require('http');

const server = http.createServer((request, response) => {
  console.log('[server] request received');
  console.log('[server] headers: ', request.headers);
  response.setHeader('Content-Type', 'text/html');
  response.setHeader('X-Foo', 'bar');
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end(`
<html lang='en'>
<head>
  <style>
    body div #myDiv{
      width: 100px;
      background-color: #ff5000;
    }
    body div img{
      width: 30px;
      background-color: #ffffff;
    }
  </style>
</head>
<body>
  <div>
    <img id='myId' />
    <img />
  </div>
</body>
</html>`
  );
});

server.listen(8088);

console.log('[server] started');
