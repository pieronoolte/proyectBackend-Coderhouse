const Products = require('../../schemas/product.schema');
const Users = require('../../schemas/user.schema');
const MongoLib = require('../mongo.dao')
const { paginateProducts } = require('../../services/products.service')
const path = require('path');
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'pieronolte@gmail.com',
    pass: 'ejfj vkmt amqr qyac'
  }
})

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

  async findMyProducts(ownerId) {
    return this.collection.find({ owner: ownerId }).lean()
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

  async deleteProduct(pid) {


    const product = await this.collection.findOne({ _id: pid });
    const user = await Users.findOne({ _id: product.owner});

    console.log(user)
    console.log(product)

    let imagePath = path.join(__dirname, '..', '..', 'public', 'images', 'imageMail.png');
    await transport.sendMail({
      from: 'pieronolte@gmail.com',
      to: user.email,
      subject: 'Eliminación de producto',
      html: `
              <div>
                <h1>Estimad@ ${user.name} ${user.lastname}</h1>
                <p>El producto ${product.title} ha sido eliminado</p>
                <p>Lo invitamos a registrar nuevos productos!</p>
                <img src="cid:imageMail"/>
              </div>`,
      attachments: [{
        filename: 'imageMail.png',
        path: imagePath,
        cid: 'imageMail'
      }]
    });


    return this.mongoDB.delete(this.collection, pid);
  }
}

module.exports = ProductsService


