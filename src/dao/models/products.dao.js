const Products = require('../../schemas/product.schema');
const MongoLib = require('../mongo.dao')
const { paginateProducts, deleteProductMailer } = require('../../services/products.service')



class ProductsService {

  constructor() {
    this.collection = Products;
    this.mongoDB = new MongoLib(Products);
    this.mongoDB.generate(10);
  }

  find(size) {
    return this.mongoDB.find(this.collection, size);
  }

  findOne(pid) {
    return this.mongoDB.findOne(this.collection, pid);
  }

  async findMyProducts(ownerId) {
    return this.collection.find({ owner: ownerId }).lean()
  }

  async paginate(size, page, sort) {
    paginateProducts(this.collection, size, page, sort)
  }


  createProduct(data) {
    return this.mongoDB.createOne(this.collection, data);
  }

  updateProduct(pid, changes) {
    return this.mongoDB.update(this.collection, pid, changes);
  }

  async deleteProduct(pid) {
    deleteProductMailer(this.collection, pid);
    return this.mongoDB.delete(this.collection, pid);
  }
}

module.exports = ProductsService


