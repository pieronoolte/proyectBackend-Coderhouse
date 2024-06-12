
const ProductsService = require('../../../dao/models/products.dao');
const Products = require('../../../schemas/product.schema')

const { generateMongo } = require('../../mocks')


const mockFindAll = jest.fn();
const mockFindOne = jest.fn();
const service = new ProductsService;


jest.mock('../../../dao/mongo.dao.js', () => jest.fn().mockImplementation(() => ({
  find: mockFindAll,
  findOne: mockFindOne,
  createOne: () => { },
  update: () => { },
  delete: () => { },
})));


describe('Test for Products Dao', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Test for findProducts', () => {
    test('should return a list of products', async () => {
      // Arrange
      const fakeProducts  = generateMongo(Products, 10, true);
      mockFindAll.mockResolvedValue(fakeProducts);
      // Act
      const products = await service.find(50);
      // Assert
      expect(products.length).toEqual(fakeProducts.length);
      expect(mockFindAll).toHaveBeenCalled();
      expect(mockFindAll).toHaveBeenCalledTimes(1);
      expect(mockFindAll).toHaveBeenCalledWith(Products, 50);
    });
  });

  describe('Test for findOneProduct', () => {
    test('should return a list of products', async () => {
      // Arrange
      const fakeProduct  = generateMongo(Products, 1, true);
      mockFindOne.mockResolvedValue(fakeProduct);
      // Act
      const product = await service.findOne(fakeProduct[0]._id);
      // Assert
      expect(product.length).toEqual(fakeProduct.length);
      expect(mockFindOne).toHaveBeenCalled();
      expect(mockFindOne).toHaveBeenCalledTimes(1);
      expect(mockFindOne).toHaveBeenCalledWith(Products, fakeProduct[0]._id);
    });
  });
});
