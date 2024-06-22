const Users = require('../../schemas/user.schema');
const MongoLib = require('../mongo.dao')
const { getUserByCreds, deleteInactiveUsers, updateRole } = require('../../services/users.service')
const UserDTO = require('../../dto/UserDto');

class UsersService {

  constructor() {
    this.collection = Users;
    this.mongoDB = new MongoLib(Users);
  }

  find(size) {
    return this.mongoDB.find(this.collection, size)
  }

  async findDTO(size) {
    const users = await this.mongoDB.find(this.collection, size)
    return users.map(user => new UserDTO(user))
  }

  findOne(uid) {
    return this.mongoDB.findOne(this.collection, uid);
  }

  createUser(data) {
    return this.mongoDB.createOne(this.collection, data);
  }

  updateUser(uid, changes) {
    return this.mongoDB.update(this.collection, uid, changes);
  }

  deleteUser(uid) {
    return this.mongoDB.delete(this.collection, uid);
  }

  async deleteInactiveUsers() {
    await deleteInactiveUsers(this.collection)
  }

  findByEmail(email) {
    return this.collection.findOne({ email: email })
  }

  async getUserByCreds(email, password) {
    return await getUserByCreds(this.collection, email, password)
  }

  async updateRole(uid, role) {
    await updateRole(this.collection, uid, role)
  }

}

module.exports = UsersService
