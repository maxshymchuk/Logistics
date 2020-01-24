const userService = require('./services/users');

module.exports = function routes(req, res) {
  const users = userService.getUsers();
  if (req.url.match(/^\/users\/\d+$/)) {
    const id = req.url.replace('/users/', '');
    const user = userService.getUserById(id);
    if (user) {
      res.statusCode = 200;
      res.end(user.name);
    } else {
      res.statusCode = 404;
      res.end("Error, user not found");
    }
  } else if (req.url === '/users') {
    res.statusCode = 200;
    res.end(`Users: ${JSON.stringify(users)}`);
  } else {
    res.statusCode = 404;
    res.end("Error, not found");
  }
}