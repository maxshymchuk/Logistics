const routes = require('./routes');

function routeRequest(url) {
  let results;
  const req = { 
    url: url
  };
  const res = { 
    end(value) { 
      results = value;
    }
  }
  routes(req, res);
  return results;
}

test('Request "/users/150" return "Bill Gates"', () => {
  expect(routeRequest('/users/150')).toBe('Bill Gates');
});

test('Request "/users/151" return "Ilon Musk"', () => {
  expect(routeRequest('/users/151')).toBe('Ilon Musk');
});

test('Request "/users/16" return "Greta Turnberg"', () => {
  expect(routeRequest('/users/16')).toBe('Greta Turnberg');
});

test('Request "/users/1111" return "Error, user not found"', () => {
  expect(routeRequest('/users/1111')).toBe('Error, user not found');
});

test('Request "/user" return "Error, not found"', () => {
  expect(routeRequest('/user')).toBe('Error, not found');
});