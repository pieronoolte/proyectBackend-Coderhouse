
const Products = require('../schemas/product.schema')
const { faker } = require('@faker-js/faker');
const Users = require('../schemas/user.schema');
const Carts = require('../schemas/cart.schema');
const { productsCart } = require('../services/carts.service')

const generateMongo = (schema, quantity, otherSchema ) => {
  let fakeData=[];
  for (let i = 0; i < quantity; i++) {
    let structureSchema = {};
    switch (schema) {
      case Products:
        structureSchema = {
          _id: Math.floor(Math.random() * (50000 - 10000) + 10000),
          title: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          code: Math.floor(Math.random() * (50000 - 10000) + 10000),
          price: parseInt(faker.commerce.price(), 10),
          status: faker.datatype.boolean(),
          stock: Math.floor(Math.random() * (100 - 10) + 10),
          category: faker.commerce.department(),
          thumbnails: faker.image.url(),
        };
        break;
      case Users:
        structureSchema = {
          _id: Math.floor(Math.random() * (50000 - 10000) + 10000),
          name: faker.person.firstName(),
          lastname: faker.person.lastName(),
          birthdate: faker.date.birthdate(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          address: faker.address.streetAddress(),
          password: faker.internet.password()
        };
        break;
      case Carts:
        structureSchema = {
          _id: Math.floor(Math.random() * (50000 - 10000) + 10000),
          products: productsCart(otherSchema),
        };
        break;
      default:
        break;
    }
    fakeData= [...fakeData, structureSchema]
  }
  return fakeData
}
module.exports= { generateMongo }
