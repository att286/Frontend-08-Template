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
    #container{
      width: 500px;
      height: 300px;
      display: flex;
      background-color: rgb(255, 255, 255);
    }
    #container #myid{
      width: 200px;
      height: 100px;
      background-color: rgb(255, 0, 0);
    }
    #container .c1{
      flex: 1;
      background-color: rgb(0, 255, 0);
    }
  </style>
</head>
<body>
  <div id='container'>
    <div id='myId' />
    <div class='c1' />
  </div>
</body>
</html>`
  );
});

server.listen(8088);

console.log('[server] started');
