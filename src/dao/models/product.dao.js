const Products = require('../../schemas/product.schema');
const MongoLib = require('../mongo.dao')


class ProductsService {

  constructor() {
    this.collection = Products;
    this.mongoDB = new MongoLib(Products);
  }

  find(size) {
    return this.mongoDB.find(this.collection, size);
  }

  findOne(pid) {
    return this.mongoDB.findOne(this.collection, pid);
  }

  async paginate(size, page, sort) {
    const options = {
      limit: size || 10,
      page: page || 1,
      sort: sort || { createdAt: -1 }
    };

    let result = await Products.paginate({},options)
    return result
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


