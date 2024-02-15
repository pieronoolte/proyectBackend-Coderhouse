const Carts = require('../../schemas/cart.schema');
const MongoLib = require('../mongo.dao')


class CartsService {

  constructor() {
    this.collection = Carts;
    this.mongoDB = new MongoLib(Carts);
  }

  find(size) {
    return  this.mongoDB.find(this.collection, size)
  }

 findOne(pid) {
    return this.mongoDB.findOne(this.collection, pid);
  }

  createCart() {
    return this.mongoDB.createCart(this.collection);
  }

  getRandomCart() {
    return this.mongoDB.getRandomCart(this.collection);
  }

  addProduct(cid, pid, quantity) {
    return this.mongoDB.addProduct(this.collection, cid, pid, quantity);
  }
}

module.exports = CartsService
