const http = require('http');
const url = require('url');

const users = [
  {
    name: 'Bill Gates',
    iq: 150
  },
  {
    name: 'Ilon Musk',
    iq: 151
  },
  {
    name: 'Greta Turnberg',
    iq: 16
  },
]

const server = new http.Server((req, res) => {
  const urlParsed = url.parse(req.url);
  if (urlParsed.pathname === '/get') {
    if (urlParsed.query.match(/([Uu]sers\/)[0-9]+/)) {
      res.statusCode = 200;
      res.end(users.filter(i => i.iq == urlParsed.query.replace('users/', ''))[0].name);
    } else if (urlParsed.query.match(/[Uu]sers/)) {
      res.statusCode = 200;
      res.end(`Users: ${JSON.stringify(users)}`);
    } else {
      res.statusCode = 404;
      res.end("Error, not found");
    }
  }
})

server.listen(8888, 'localhost');