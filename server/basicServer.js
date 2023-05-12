'use strict';
const http = require('http');
const fs = require('fs');
const server = http.createServer();

server.on('request', (req, res) => {
    console.log(req.method);
    switch (req.url.split('.')[1]) {
    case undefined: {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(fs.readFileSync('../index.html'));
    }
        break;
    case 'css': {
        res.writeHead(200, { 'Content-type': 'text/css' });
        res.end(fs.readFileSync(`..${req.url}`));
    }
        break;
    case 'js': {
        res.writeHead(200, { 'Content-type': 'text/javascript' });
        res.end(fs.readFileSync(`..${req.url}`));
    }
        break;
    case 'ico': {
        res.writeHead(200, { 'Content-type': 'image/jpg' });
        res.end(fs.readFileSync('../resources/icon.jpg'));
    }
        break;
    default: {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(fs.readFileSync('../index.html'));
    }
    }
});
server.listen(3000, 'localhost', () => console.log('it`s working'));
