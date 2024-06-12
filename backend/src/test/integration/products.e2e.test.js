const request = require('supertest');
const { createServer } = require('http');
const app = require('../../app');
const port = 8083;
const { config } = require('../../../config');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

const Products = require('../../schemas/product.schema')
const { generateMongo } = require('../mocks')

const DB_NAME = config.dbName;
const MONGO_URI_TEST = config.dbUrlTest;


describe('Test for products', () => {
  let server;
  beforeAll(async () => {
    server = createServer(app);
    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log('Esta funcionando en ' + port);
    });

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    mongoose.connection.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
    mongoose.connection.once('open', function () {
      console.log('Conectado a la base de datos MongoDB');
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await new Promise(resolve => server.close(resolve))
  });




  describe('test for [GET]', () => {
    test('should return list books', async () => {
      // Arrange
      await Products.deleteMany({});;
      // const seedData = await Products.insertMany([{
      //   title: faker.commerce.productName(),
      //   description: faker.lorem.sentence(),
      //   code: Math.floor(Math.random() * (50000 - 10000) + 10000),
      //   price: parseInt(faker.commerce.price(), 10),
      //   status: faker.datatype.boolean(),
      //   stock: Math.floor(Math.random() * (100 - 10) + 10),
      //   category: faker.commerce.department(),
      //   thumbnails: faker.image.url(),
      // },
      // {
      //   title: faker.commerce.productName(),
      //   description: faker.lorem.sentence(),
      //   code: Math.floor(Math.random() * (50000 - 10000) + 10000),
      //   price: parseInt(faker.commerce.price(), 10),
      //   status: faker.datatype.boolean(),
      //   stock: Math.floor(Math.random() * (100 - 10) + 10),
      //   category: faker.commerce.department(),
      //   thumbnails: faker.image.url(),
      // }]);
      const seedData = await Products.insertMany(generateMongo(Products, 2, false));
      // console.log(seedData);
      // Act
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(({ body }) => {
          // console.log(body);
          // Assert
          expect(body.length).toEqual(seedData.length);
        });
    });
  });

  describe('test for [POST]', () => {
    test('should return 201 created', async () => {
      // Arrange
      const inputData = {
        title: "test 1",
        description: faker.lorem.sentence(),
        code: Math.floor(Math.random() * (50000 - 10000) + 10000),
        price: parseInt(faker.commerce.price(), 10),
        status: faker.datatype.boolean(),
        stock: 20,
        category: faker.commerce.department(),
        thumbnails: faker.image.url()
      }
      // Act
      return request(app)
        .post('/api/products')
        .send(inputData)
        .then(({ body, statusCode }) => {
          console.log("response: ", body)
          // Assert
          expect(statusCode).toEqual(201);
        });
    });

    test('should return 400 bad request', async () => {
      // Arrange
      const inputData = {
        title: null,
        description: faker.lorem.sentence(),
        code: Math.floor(Math.random() * (50000 - 10000) + 10000),
        price: parseInt(faker.commerce.price(), 10),
        status: faker.datatype.boolean(),
        stock: 20,
        category: faker.commerce.department(),
        thumbnails: faker.image.url()
      }
      // Act
      const response = await request(app)
        .post('/api/products')
        .send(inputData);

      console.log("response: ", response.error);

      // Assert
      expect(response.statusCode).toEqual(500)
      // expect(response.error).toEqual("[Error: cannot POST /api/products (500)]");
    });
  });
});
