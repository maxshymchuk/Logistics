const users = [
  {
    name: 'Bill Gates',
    id: 150
  },
  {
    name: 'Ilon Musk',
    id: 151
  },
  {
    name: 'Greta Turnberg',
    id: 16
  },
]

module.exports = userService = {
  getUserById(id) {
    return users.find(i => i.id == id);
  },
  getUsers() {
    return users;
  }
}