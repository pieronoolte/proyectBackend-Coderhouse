const Products = require('../../schemas/product.schema');
const Users = require('../../schemas/user.schema');
const MongoLib = require('../mongo.dao')
const { paginateProducts, deleteProductMailer } = require('../../services/products.service')
const path = require('path');
const nodemailer = require('nodemailer')

// const transport = nodemailer.createTransport({
//   service: 'gmail',
//   port: 587,
//   auth: {
//     user: 'pieronolte@gmail.com',
//     pass: 'ejfj vkmt amqr qyac'
//   }
// })

class ProductsService {

  constructor() {
    this.collection = Products;
    this.mongoDB = new MongoLib(Products);
    if (!ProductsService.hasGenerated) {
      this.mongoDB.generate(Products, 20);
      this.mongoDB.generate(Users, 5);
      ProductsService.hasGenerated = true;
    }
  }

  static hasGenerated = false;

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


