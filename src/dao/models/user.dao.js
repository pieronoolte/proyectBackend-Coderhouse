const Users = require('../../schemas/user.schema');
const MongoLib = require('../mongo.dao')
const bcrypt = require('bcrypt');

class UsersService {

  constructor() {
    this.collection = Users;
    this.mongoDB = new MongoLib(Users);
  }

  find(size) {
    return this.mongoDB.find(this.collection, size)
  }

  findOne(uid) {
    return this.mongoDB.findOne(this.collection, uid);
  }

  createUser(data) {
    return this.mongoDB.createOne(this.collection, data);
  }

  createProduct(data) {
    return this.mongoDB.createOne(this.collection, data);
  }

  updateProduct(uid, changes) {
    return this.mongoDB.update(this.collection, uid, changes);
  }

  deleteProduct(uid) {
    return this.mongoDB.delete(this.collection, uid);
  }

  getUserByEmail(email) {
    return this.mongoDB.findByEMail(this.collection,email);
  }

  async getUserByCreds(email, password) {
    let user = await this.mongoDB.findByEMail(this.collection,email);
    console.log(user.password)
    if (user && user.password) {

      let correctPwd =  bcrypt.compareSync(password, user.password);

      if (correctPwd) {
        delete user.password;
        return user;
      }

    }

    return null;
  }

}

module.exports = UsersService
