var http = require('http');
var lc = require('lower-case');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(lc.lowerCase("Hello World!"));
  res.end();
}).listen(8089, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:8080');
});;