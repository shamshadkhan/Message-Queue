const http = require('http');
var fs = require('fs');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
    fs.readFile('app/data.txt', function(err, data) {
      if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(data);
        res.end();
      });
});

server.listen(port, hostname);
