
// const mongoose = require('mongoose');
// const Products = require('../schemas/product.schema');
// const { faker } = require('@faker-js/faker');
// const boom = require('@hapi/boom');
// const { ObjectId } = mongoose.Types;
const { generateMongo, findMongo, findOneMongo, updateMongo, deleteMongo } = require('../services/mongo.service')

class MongoLib {

  constructor(schema, otherSchema) {
    this.structureSchema = {};
    this.stringSchema = '';
    this.generate(schema, 3, otherSchema)
  }

  async generate(schema, otherSchema, quantity) {
    generateMongo(schema, quantity, otherSchema)
  }

  async find(schema, size) {
    const service = await findMongo(schema, size)
    return service
  }

  async findOne(schema, id) {
    const service = await findOneMongo(this, schema, id)
    return service
  }

  async createOne(schema, data) {
    const service = await schema.create(data);
    return service;
  }

  async update(schema, id, changes) {
    const service = await updateMongo(schema, id, changes)
    return service
  }

  async delete(schema, id) {
    const service = await deleteMongo(schema, id)
    return service
  }

// abstraer a cart.dao.js
  // async getRandomCart(schema) {
  //   const randomIndex = Math.floor(Math.random() * 10);
  //   const randomCart = await schema.findOne().skip(randomIndex).lean();
  //   return randomCart.products;
  // }

  // abstraer a cart.dao.js
  // async createCart(schema) {
  //   const document = {
  //     products: []
  //   }
  //   let newCart = await schema.create(document);
  //   return newCart;

  // }

  // // abstraer a cart.dao.js
  // async updateCart(schema, id, otherSchema) {
  //   const schemaName = this.stringSchema;
  //   const document = await schema.findById(id);
  //   if (document === null) {
  //     throw boom.notFound(`${schemaName} not found`);
  //   }

  //   // const newProductsArray =  await Products.aggregate([{ $sample: { size: 1 } }]);
  //   const newProductsArray = await this.productsCart(otherSchema);

  //   let updateDocument;
  //   if (document.products && document.products.length > 0) {
  //     updateDocument = await schema.updateOne(
  //       { _id: id },
  //       { $set: { products: newProductsArray } }
  //     );
  //   } else {
  //     updateDocument = await schema.updateOne(
  //       { _id: id },
  //       { $set: { products: newProductsArray } },
  //       { upsert: true }
  //     );
  //   }
  //   return updateDocument;
  // }

  // // abstraer a cart.dao.js

  // async addProduct(schema, cid, pid, quantity) {

  //   const document = await schema.findById(cid);
  //   if (!document) {
  //     const schemaName = this.stringSchema;
  //     throw boom.notFound(`${schemaName} not found`);
  //   }

  //   if (mongoose.Types.ObjectId.isValid(pid)) {
  //     const documentInc = await schema.findOneAndUpdate(
  //       { _id: cid, products: { $elemMatch: { _id: pid } } },
  //       { $inc: { 'products.$.quantity': 1 } },
  //       { new: true }
  //     );
  //     return documentInc
  //   } else {
  //     const documentUpdate = await schema.findOneAndUpdate(
  //       { _id: cid },
  //       {
  //         $addToSet: {
  //           products: {
  //             _id: pid,
  //             quantity: quantity || 1
  //           }
  //         }
  //       },
  //       { new: true }
  //     );
  //     return documentUpdate
  //   }
  // }

  // // abstraer a cart.dao.js

  // async deleteProduct(schema, cid, pid) {

  //   const document = await schema.findById(cid);
  //   if (!document) {
  //     const schemaName = this.stringSchema;
  //     throw boom.notFound(`${schemaName} not found`);
  //   }

  //   if (mongoose.Types.ObjectId.isValid(pid)) {
  //     // console.log("hola2")
  //     // console.log(pid)
  //     const documentInc = await schema.findOneAndUpdate(
  //       { _id: cid },
  //       { $pull: { products: { _id: new mongoose.Types.ObjectId(pid) } } },
  //       { new: true }
  //     ).lean();

  //     if (!documentInc) {
  //       const schemaName = this.stringSchema;
  //       throw boom.notFound(`${schemaName} found but product not found`);
  //     }
  //     // console.log(documentInc)
  //     return documentInc
  //   } else {
  //     // console.log("hola1")
  //     const schemaName = this.stringSchema;
  //     throw boom.notFound(`${schemaName} found but product not found`);
  //   }
  // }

  // abstraer a cart.dao.js
  // async productsCart(otherSchema) {
  //   let products = [];
  //   const quantityProducts = Math.floor(Math.random() * (6 - 1) + 1);
  //   const randomIds = await otherSchema.aggregate([{ $sample: { size: quantityProducts } }]);
  //   products = randomIds.map(e => ({
  //     _id: e._id,
  //     quantity: Math.floor(Math.random() * (15 - 1) + 1)
  //   }));
  //   return products;
  // };


  // async productsCart(otherSchema) {
  //   let products = [];
  //   const quantityProducts = Math.floor(Math.random() * (6 - 1) + 1);
  //   const randomIds = await otherSchema.aggregate([{ $sample: { size: quantityProducts } }]);
  //   products = randomIds.map(e => ({
  //     _id: e._id,
  //     quantity: Math.floor(Math.random() * (15 - 1) + 1)
  //   }));
  //   return products;
  // };

  //   async productsCart() {
  //   let products = [];
  //   const quantityProducts = Math.floor(Math.random() * (6 - 1) + 1);
  //   for (let i = 0; i < quantityProducts; i++) {
  //     products.push({
  //       _id: new ObjectId(),
  //       quantity: Math.floor(Math.random() * (15 - 1) + 1),
  //     });
  //   }
  //   return products;
  // };
}


module.exports = MongoLib;
