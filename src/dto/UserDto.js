class UserDTO {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.lastConnection = user.lastConnection.toISOString().split('T')[0];
  }
}

module.exports = UserDTO;
