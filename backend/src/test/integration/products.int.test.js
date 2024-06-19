const mockFindAll = jest.fn();
const mockFindOne = jest.fn();
const mockCreateOne = jest.fn();
const request = require('supertest');
const { createServer } = require('http');
const app = require('../../app'); // Asegúrate de que la ruta sea correcta
const port = 8082;
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');


// const ProductsService = require('../../dao/models/products.dao');
const Products = require('../../schemas/product.schema')

const { generateMongo } = require('../mocks')


// const service = new ProductsService;


jest.mock('../../dao/mongo.dao.js', () => jest.fn().mockImplementation(() => ({
  find: mockFindAll,
  findOne: mockFindOne,
  createOne: mockCreateOne,
  update: () => { },
  delete: () => { },
})));

describe('Test for products', () => {
  let server;

  beforeAll(() => {
    server = createServer(app);
    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log('Esta funcionando en ' + port);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await new Promise(resolve => server.close(resolve))
  });

  describe('test for [GET]', () => {
    test('should return list books', () => {
      // Arrange
      const fakeProducts = generateMongo(Products, 10);
      mockFindAll.mockResolvedValue(fakeProducts);
      // Act
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(({ body }) => {
          // console.log(body)
          // Assert
          expect(body.length).toEqual(fakeProducts.length);
        });
    });
  });

  // describe('test for [POST]', () => {
  //   test('should return 400 bad request', () => {
  //     // Arrange
  //     const inputData = {
  //       description: faker.lorem.sentence(),
  //       code: Math.floor(Math.random() * (50000 - 10000) + 10000),
  //       price: parseInt(faker.commerce.price(), 10),
  //       status: faker.datatype.boolean(),
  //     }
  //     mockCreateOne.mockResolvedValue(inputData)
  //     // Act
  //     return request(app)
  //       .post('/api/products')
  //       .send(inputData)
  //       .then((response) => {
  //         console.log(response.body)
  //         // Assert
  //         expect(response.statusCode).toEqual(400);
  //         expect(response.body.error).toBe('Title is required');
  //       });
  //   });
  // });
});
