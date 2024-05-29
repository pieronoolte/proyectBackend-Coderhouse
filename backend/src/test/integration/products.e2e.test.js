const request = require('supertest');
const { MongoClient } = require('mongodb');
const { createServer } = require('http');
const app = require('../../app'); // Asegúrate de que la ruta sea correcta
const port = 8083;
const { config } = require('../../../config');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
// const ProductsService = require('../../dao/models/products.dao');
const Products = require('../../schemas/product.schema')

// const { generateMongo } = require('../mocks')


// const service = new ProductsService;

const DB_NAME = config.dbName;
const MONGO_URI_TEST = config.dbUrlTest;


describe('Test for products', () => {
  let server;
  let database;
  let client;
  beforeAll(async () => {
    server = createServer(app);
    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log('Esta funcionando en ' + port);
    });
    // client = new MongoClient(MONGO_URI_TEST, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // await client.connect();
    // database = client.db(DB_NAME);

    if (mongoose.connection.readyState === 0) {
      mongoose.connect(MONGO_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    client = mongoose.connection;

    client.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
    client.once('open', function () {
    console.log('Conectado a la base de datos MongoDB');
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe('test for [GET]', () => {
    test('should return list books', async () => {
      // Arrange
      await Products.deleteMany({});;
      const seedData = await Products.insertMany([{
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        code: Math.floor(Math.random() * (50000 - 10000) + 10000),
        price: parseInt(faker.commerce.price(), 10),
        status: faker.datatype.boolean(),
        stock: Math.floor(Math.random() * (100 - 10) + 10),
        category: faker.commerce.department(),
        thumbnails: faker.image.url(),
      },
      {
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        code: Math.floor(Math.random() * (50000 - 10000) + 10000),
        price: parseInt(faker.commerce.price(), 10),
        status: faker.datatype.boolean(),
        stock: Math.floor(Math.random() * (100 - 10) + 10),
        category: faker.commerce.department(),
        thumbnails: faker.image.url(),
      }]);
      console.log(seedData);
      // Act
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          // Assert
          expect(body.length).toEqual(seedData.length);
        });
    });
  });
});
