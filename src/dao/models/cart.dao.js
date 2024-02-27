const Products = require('../../schemas/product.schema');
const Carts = require('../../schemas/cart.schema');
const MongoLib = require('../mongo.dao')


class CartsService {

  constructor() {
    this.collection = Carts;
    this.otherCollection = Products
    this.mongoDB = new MongoLib(Carts, Products);
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

  deleteProduct(cid, pid) {
    return this.mongoDB.deleteProduct(this.collection, cid, pid);
  }

  updateCart(cid) {
    return this.mongoDB.updateCart(this.collection, cid, this.otherCollection);
  }

  deleteCart(cid) {
    return this.mongoDB.delete(this.collection, cid);
  }
}

module.exports = CartsService
