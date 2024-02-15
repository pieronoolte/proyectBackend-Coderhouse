const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const Products = require('../schemas/product.schema')
const Users = require('../schemas/user.schema')
const Carts = require('../schemas/cart.schema')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
class MongoLib {

  constructor(schema) {
    this.structureSchema = {};
    this.stringSchema = '';
    this.generate(schema)
  }

  async generate(schema) {

    for (let i = 0; i < 10; i++) {
      switch (schema) {
        case Products:
          this.structureSchema = {
            title: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            code: Math.floor(Math.random() * (50000 - 10000) + 10000),
            price: parseInt(faker.commerce.price(), 10),
            status: faker.datatype.boolean(),
            stock: Math.floor(Math.random() * (100 - 10) + 10),
            category: faker.commerce.department(),
            thumbnails: faker.image.url(),
          };
          this.stringSchema = 'Product';
          break;
        case Users:
          this.structureSchema = {
            name: faker.person.firstName(),
            lastname: faker.person.lastName(),
            birthdate: faker.date.birthdate(),
            mail: faker.internet.email(),
            phone: faker.phone.number(),
            adress: faker.location.direction(),
            password: faker.internet.password()
          };
          this.stringSchema = 'User';
          break;
        case Carts:
          this.structureSchema = {
            products: await this.productsCart(),
          };
          this.stringSchema = 'Cart';
          break;
        default:
          break;
      }
    }

    try {
      await schema.create(this.structureSchema)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  async find(schema, size) {
    let document = await schema.find().limit(size).lean();
    return document
  }


  async findOne(schema, id) {
    const document = await schema.findById(id);
    if (!document) {
      const schemaName = this.stringSchema;
      throw boom.notFound(`${schemaName} not found`);
    }
    if (!document.status && schema === 'products') {
      throw boom.conflict('Product is block');
    }
    return document;
  }

  async createOne(schema, data) {
    const document = await schema.create(data);

    return document;
  }

  async update(schema, id, changes) {
    const schemaName = this.stringSchema;
    const document = await schema.findById(id);
    if (document === null) {
      throw boom.notFound(`${schemaName} not found`);
    }
    const updateDocument = await schema.updateOne(
      { _id: id },
      { $set: changes }
    );
    return updateDocument;
  }

  async delete(schema, pid) {
    const schemaName = this.stringSchema;
    const document = await schema.findById(pid);
    if (document === null) {
      throw boom.notFound(`${schemaName} not found`);
    }
    const deleteDocument = await schema.findByIdAndDelete(pid);
    return {
      state: `${schemaName} delete successfully`,
      delete: deleteDocument
    };
  }

  async getRandomCart(schema) {
    const randomIndex = Math.floor(Math.random() * 10);
    const randomCart = await schema.findOne().skip(randomIndex).lean();
    return randomCart.products;
  }

  async createCart(schema) {
    const document = {
      products: []
    }
    let newCart = await schema.create(document);
    return newCart;
  }

  async addProduct(schema, cid, pid, quantity) {

    const document = await schema.findById(cid);
    if (!document) {
      const schemaName = this.stringSchema;
      throw boom.notFound(`${schemaName} not found`);
    }

    if (mongoose.Types.ObjectId.isValid(pid)) {
      const documentInc = await schema.findOneAndUpdate(
        { _id: cid, products: { $elemMatch: { _id: pid }}},
        { $inc: { 'products.$.quantity': 1 } },
        { new: true }
      );
      return documentInc
    } else {
      const documentUpdate = await schema.findOneAndUpdate(
        { _id: cid },
        {
          $addToSet: {
            products: {
              _id: pid,
              quantity: quantity || 1
            }
          }
        },
        { new: true }
      );
      return documentUpdate
    }
  }

  async productsCart() {
    let products = [];
    const quantityProducts = Math.floor(Math.random() * (6 - 1) + 1);
    for (let i = 0; i < quantityProducts; i++) {
      products.push({
        _id: new ObjectId(),
        quantity: Math.floor(Math.random() * (15 - 1) + 1),
      });
    }
    return products;
  };
}

module.exports = MongoLib;
