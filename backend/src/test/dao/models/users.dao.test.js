
const UsersService = require('../../../dao/models/users.dao');
// const CartsService = require('../../../dao/models/carts.dao');

const Users = require('../../../schemas/user.schema')
// const serviceCart = new CartsService();
const { generateMongo } = require('../../mocks')


const mockFindAll = jest.fn();
const service = new UsersService;


jest.mock('../../../dao/mongo.dao.js', () => jest.fn().mockImplementation(() => ({
  find: mockFindAll,
  findOne: () => { },
  createOne: () => { },
  update: () => { },
  delete: () => { },
})));


describe('Test for Users Dao', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Test for findUsers', () => {
    test('should return a list users', async () => {
      // Arrange
      const fakeUsers = generateMongo(Users, 10, true);
      // console.log('fake:',fakeUsers)
      mockFindAll.mockResolvedValue(fakeUsers);
      // Act
      const users = await service.find(50);
      // console.log('users:',users);
      // Assert
      expect(users.length).toEqual(fakeUsers.length);
      expect(mockFindAll).toHaveBeenCalled();
      expect(mockFindAll).toHaveBeenCalledTimes(1);
      expect(mockFindAll).toHaveBeenCalledWith(Users, 50);
    });
  });
});
