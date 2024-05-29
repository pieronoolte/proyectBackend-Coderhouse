const MongoLib = require('../mongo.dao')
const Products = require('../../schemas/product.schema');
const Carts = require('../../schemas/cart.schema');
const { addProductCart, deleteProductCart, updateCart, getRandomCart, createCart , productsCart} = require('../../services/carts.service')

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

  async createCart() {
    const service = await createCart(this.collection)
    return service
  }

  async getRandomCart() {
    const service = await getRandomCart(this.collection)
    return service
  }

  async productsCart() {
    const service = await productsCart(this.otherCollection)
    return service
  };



  async addProduct(cid, pid, quantity) {
    const service = await addProductCart(this.collection, cid, pid, quantity)
    return service
  }

  async deleteProduct(cid, pid) {
    const service = await deleteProductCart(this.collection, cid, pid)
    return service
  }

  async updateCart(cid) {
    const service = await updateCart(this.collection, this.otherCollection, cid)
    return service
  }

  deleteCart(cid) {
    return this.mongoDB.delete(this.collection, cid);
  }
}

module.exports = CartsService































// // const mongoose = require('mongoose');
// const Products = require('../../../../bd/schemas/product.schema');
// const Carts = require('../../../../bd/schemas/cart.schema');
// const MongoLib = require('../mongo.dao')
// // const boom = require('@hapi/boom');
// const { addProductCart, deleteProductCart, updateCart, getRandomCart, createCart , productsCart} = require('../../services/carts.service')
// class CartsService {

//   constructor() {
//     this.collection = Carts;
//     this.otherCollection = Products
//     this.mongoDB = new MongoLib(Carts, Products);
//   }

//   find(size) {
//     return  this.mongoDB.find(this.collection, size)
//   }

//  findOne(pid) {
//     return this.mongoDB.findOne(this.collection, pid);
//   }

//   async createCart() {
//     // return this.mongoDB.createCart(this.collection);
//     // const document = { products: [] }
//     // let newCart = await this.collection.create(document);
//     // return newCart;
//     createCart(this.collection)
//   }

//   async getRandomCart() {
//     // return this.mongoDB.getRandomCart(this.collection);
//     // const randomIndex = Math.floor(Math.random() * 10);
//     // const randomCart = await this.collection.findOne().skip(randomIndex).lean();
//     // return randomCart.products;
//     getRandomCart(this.collection)
//   }

//   async productsCart() {
//     // let products = [];
//     // const quantityProducts = Math.floor(Math.random() * (6 - 1) + 1);
//     // const randomIds = await this.otherCollection.aggregate([{ $sample: { size: quantityProducts } }]);
//     // products = randomIds.map(e => ({
//     //   _id: e._id,
//     //   quantity: Math.floor(Math.random() * (15 - 1) + 1)
//     // }));
//     // return products;
//     productsCart(this.otherCollection)

//   };

//   async addProduct(cid, pid, quantity) {
//     // return this.mongoDB.addProduct(this.collection, cid, pid, quantity);
//     // const document = await this.collection.findById(cid);
//     // if (!document) {
//     //   throw boom.notFound(`${this.collection} not found`);
//     // }

//     // if (mongoose.Types.ObjectId.isValid(pid)) {
//     //   const documentInc = await this.collection.findOneAndUpdate(
//     //     { _id: cid, products: { $elemMatch: { _id: pid } } },
//     //     { $inc: { 'products.$.quantity': 1 } },
//     //     { new: true }
//     //   );
//     //   return documentInc
//     // } else {
//     //   const documentUpdate = await this.collection.findOneAndUpdate(
//     //     { _id: cid },
//     //     {
//     //       $addToSet: {
//     //         products: {
//     //           _id: pid,
//     //           quantity: quantity || 1
//     //         }
//     //       }
//     //     },
//     //     { new: true }
//     //   );
//     //   return documentUpdate
//     // }

//     addProductCart(this.collection, cid, pid, quantity)
//   }

//   async deleteProduct(cid, pid) {
//     // return this.mongoDB.deleteProduct(this.collection, cid, pid);
//     // const document = await this.collection.findById(cid);
//     // if (!document) {
//     //   throw boom.notFound(`${this.collection} not found`);
//     // }

//     // if (mongoose.Types.ObjectId.isValid(pid)) {
//     //   // console.log("hola2")
//     //   // console.log(pid)
//     //   const documentInc = await this.collection.findOneAndUpdate(
//     //     { _id: cid },
//     //     { $pull: { products: { _id: new mongoose.Types.ObjectId(pid) } } },
//     //     { new: true }
//     //   ).lean();

//     //   if (!documentInc) {
//     //     throw boom.notFound(`${this.collection} found but product not found`);
//     //   }
//     //   // console.log(documentInc)
//     //   return documentInc
//     // } else {
//     //   // console.log("hola1")
//     //   throw boom.notFound(`${this.collection} found but product not found`);
//     // }

//     deleteProductCart(this.collection, cid, pid)
//   }

//   async updateCart(cid) {
//     // return this.mongoDB.updateCart(this.collection, cid, this.otherCollection);
//     // const document = await this.collection.findById(cid);
//     // if (document === null) {
//     //   throw boom.notFound(`${this.collection} not found`);
//     // }

//     // // const newProductsArray =  await Products.aggregate([{ $sample: { size: 1 } }]);
//     // const newProductsArray = await this.productsCart(this.otherCollection);

//     // let updateDocument;
//     // if (document.products && document.products.length > 0) {
//     //   updateDocument = await this.collection.updateOne(
//     //     { _id: cid },
//     //     { $set: { products: newProductsArray } }
//     //   );
//     // } else {
//     //   updateDocument = await this.collection.updateOne(
//     //     { _id: cid },
//     //     { $set: { products: newProductsArray } },
//     //     { upsert: true }
//     //   );
//     // }
//     // return updateDocument;

//     updateCart(this.collection, this.otherCollection, cid)
//   }

//   deleteCart(cid) {
//     return this.mongoDB.delete(this.collection, cid);
//   }
// }

// module.exports = CartsService
