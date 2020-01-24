const http = require('http');
const routes = require('./routes');

const server = new http.Server(routes);

server.listen(8888, 'localhost');