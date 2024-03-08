
const mongoose = require('mongoose');
const Products = require('../schemas/product.schema')
const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const Users = require('../schemas/user.schema')
const Carts = require('../schemas/cart.schema')
// const { ObjectId } = mongoose.Types;
// const ProductsService = require('../dao/models/product.dao')
// const service = new ProductsService;

class MongoLib {

  constructor(schema, otherSchema) {
    this.structureSchema = {};
    this.stringSchema = '';
    this.generate(schema, otherSchema)
  }

  async generate(schema, otherSchema) {

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
            products: await this.productsCart(otherSchema),
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
    let document;
    // let result;
    if (schema === Carts) {
      document = await schema.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'products._id',
            foreignField: '_id',
            as: 'product'
          }
        },
        {
          $addFields: {
            products: {
              $map: {
                input: "$products",
                as: "prod",
                in: {
                  product: {
                    $arrayElemAt: ["$product", { $indexOfArray: ["$product._id", "$$prod._id"] }]
                  },
                  quantity: "$$prod.quantity"
                }
              }
            }
          }
        },
        { $limit: size }
      ])
      // const text = JSON.stringify(document, null, 2);
      // // console.log(text);
    } else {
      document = await schema.find().limit(size).lean();
    }
    return document
  }


  async findOne(schema, id) {
    let document;
    if (schema === Carts) {

      const carts = await this.find(Carts, 200);
      const cartsJSON = JSON.stringify(carts);
      const parsedCarts = JSON.parse(cartsJSON);
      const as = parsedCarts.map(el => {
        const product = el.products;
        if (product) {
          return product;
        } else {
          return null;
        }
      }).filter(el => el !== null);

      const cart = await schema.findById(id).lean();

      for (let i = 0; i < as.length; i++) {
        let cartFOR = parsedCarts[i];
        if (cartFOR && cartFOR._id == cart._id) {
          let document1 = as[i]
        //   let completeProducts = document1.map(item => ({
        //     product: item.product,
        //     quantity: item.quantity
        // }));
          document = {
            _id: cartFOR._id,
            products: document1
        }
        }
      }





    } else {
      document = await schema.findById(id);
    }
    if (!document) {
      const schemaName = this.stringSchema;
      throw boom.notFound(`${schemaName} not found`);
    }
    if (!document.status && schema === 'products') {
      throw boom.conflict('Product is block');
    }

    console.log(document.products)
        console.log(document)
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

  async updateCart(schema, id, otherSchema) {
    const schemaName = this.stringSchema;
    const document = await schema.findById(id);
    if (document === null) {
      throw boom.notFound(`${schemaName} not found`);
    }

    // const newProductsArray =  await Products.aggregate([{ $sample: { size: 1 } }]);
    const newProductsArray = await this.productsCart(otherSchema);

    let updateDocument;
    if (document.products && document.products.length > 0) {
      updateDocument = await schema.updateOne(
        { _id: id },
        { $set: { products: newProductsArray } }
      );
    } else {
      updateDocument = await schema.updateOne(
        { _id: id },
        { $set: { products: newProductsArray } },
        { upsert: true }
      );
    }
    return updateDocument;
  }


  async addProduct(schema, cid, pid, quantity) {

    const document = await schema.findById(cid);
    if (!document) {
      const schemaName = this.stringSchema;
      throw boom.notFound(`${schemaName} not found`);
    }

    if (mongoose.Types.ObjectId.isValid(pid)) {
      const documentInc = await schema.findOneAndUpdate(
        { _id: cid, products: { $elemMatch: { _id: pid } } },
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

  async deleteProduct(schema, cid, pid) {

    const document = await schema.findById(cid);
    if (!document) {
      const schemaName = this.stringSchema;
      throw boom.notFound(`${schemaName} not found`);
    }

    if (mongoose.Types.ObjectId.isValid(pid)) {
      // console.log("hola2")
      // console.log(pid)
      const documentInc = await schema.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { _id: new mongoose.Types.ObjectId(pid) } } },
        { new: true }
      ).lean();

      if (!documentInc) {
        const schemaName = this.stringSchema;
        throw boom.notFound(`${schemaName} found but product not found`);
      }
      console.log(documentInc)
      return documentInc
    } else {
      // console.log("hola1")
      const schemaName = this.stringSchema;
      throw boom.notFound(`${schemaName} found but product not found`);
    }
  }

  async productsCart(otherSchema) {
    let products = [];
    const quantityProducts = Math.floor(Math.random() * (6 - 1) + 1);
    const randomIds = await otherSchema.aggregate([{ $sample: { size: quantityProducts } }]);
    products = randomIds.map(e => ({
      _id: e._id,
      quantity: Math.floor(Math.random() * (15 - 1) + 1)
    }));
    return products;
  };


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
