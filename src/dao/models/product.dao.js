const Products = require('../../schemas/product.schema');
const MongoLib = require('../mongo.dao')


class ProductsService {

  constructor() {
    this.collection = Products;
    this.mongoDB = new MongoLib(Products);
  }

  find(size) {
    return  this.mongoDB.find(this.collection, size)
  }

 findOne(pid) {
    return this.mongoDB.findOne(this.collection, pid);
  }

  createProduct(data) {
    return this.mongoDB.createOne(this.collection, data);
  }

  updateProduct(pid, changes) {
    return this.mongoDB.update(this.collection, pid, changes);
  }

 deleteProduct(pid) {
    return this.mongoDB.delete(this.collection, pid);
  }
}

module.exports = ProductsService


