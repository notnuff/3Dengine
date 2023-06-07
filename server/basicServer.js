'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

const contentTypeMap = {
  '': 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  ico: 'image/jpg',
};

server.on('request', (req, res) => {
  console.log(req.method, req.url);
  const extension = req.url.split('.')[1] || '';
  const contentType = contentTypeMap[extension] || 'text/html';
  const filePath = extension ? `..${req.url}` : '../index.html';

  fs.readFile(path.join(__dirname, filePath), (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }

    res.writeHead(200, { 'Content-type': contentType });
    res.end(data);
  });
});

server.listen(3000, 'localhost', () => console.log('It\'s working'));
