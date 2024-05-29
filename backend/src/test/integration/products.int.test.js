const mockFindAll = jest.fn();
const mockFindOne = jest.fn();
const request = require('supertest');
const { createServer } = require('http');
const app = require('../../app'); // Asegúrate de que la ruta sea correcta
const port = 8082;



// const ProductsService = require('../../dao/models/products.dao');
const Products = require('../../schemas/product.schema')

const { generateMongo } = require('../mocks')


// const service = new ProductsService;


jest.mock('../../dao/mongo.dao.js', () => jest.fn().mockImplementation(() => ({
  find: mockFindAll,
  findOne: mockFindOne,
  createOne: () => { },
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

  afterAll((done) => {
    server.close(done);
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
          console.log(body)
          // Assert
          expect(body.length).toEqual(fakeProducts.length);
        });
    });
  });
});
