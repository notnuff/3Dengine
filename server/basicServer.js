'use strict';
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    console.log(req.url, req.method, req.headers);
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('my 3D server');
});

server.listen(3000, 'localhost', () => console.log('it`s working'));
