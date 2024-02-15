const Users = require('../../schemas/user.schema');
const MongoLib = require('../mongo.dao')


class UsersService {

  constructor() {
    this.collection = Users;
    this.mongoDB = new MongoLib(Users);
  }

  find(size) {
    return  this.mongoDB.find(this.collection, size)
  }

 findOne(uid) {
    return this.mongoDB.findOne(this.collection, uid);
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
}

module.exports = UsersService
