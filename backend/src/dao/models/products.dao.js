const Products = require('../../schemas/product.schema');
const MongoLib = require('../mongo.dao')
const { paginateProducts } = require('../../services/products.service')

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
    // const options = {
    //   limit: size || 10,
    //   page: page || 1,
    //   sort: sort || { createdAt: -1 },
    //   lean: true
    // };

    // let result = await Products.paginate({},options);

    // result.prevLink = result.hasPrevPage?`http://localhost:8080/api/products/paginate?page=${result.prevPage}`:'';
    // result.nextLink = result.hasNextPage?`http://localhost:8080/api/products/paginate?page=${result.nextPage}`:'';

    // result.isValid= !(page<=0||page>result.totalPages)
    // // console.log(result)
    // return result

    paginateProducts(this.collection, size, page, sort)
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


