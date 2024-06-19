
const UsersService = require('../../../dao/models/users.dao');
// const CartsService = require('../../../dao/models/carts.dao');
const Users = require('../../../schemas/user.schema')
// const serviceCart = new CartsService();
const { generateMongo } = require('../../mocks')



const mockFindByEmail = jest.fn();
const service = new UsersService;

jest.mock('../../../dao/models/users.dao.js', () => jest.fn().mockImplementation(() => ({
  findByEmail: mockFindByEmail,
  findOne: () => { },
  createOne: () => { },
  update: () => { },
  delete: () => { },
})));

describe('Test for Users Dao', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Test for findUserByEmail', () => {
    test('should return a user since email', async () => {
      // Arrange
      const fakeUser = generateMongo(Users, 1, true);
      // console.log('fake:',fakeUser[0])
      mockFindByEmail.mockResolvedValue(fakeUser);
      // Act
      const user = await service.findByEmail(fakeUser[0].email);
      // console.log('users:',user);
      // console.log(mockFindByEmail)
      // Assert
      expect(user.length).toEqual(fakeUser.length);
      expect(mockFindByEmail).toHaveBeenCalled();
      expect(mockFindByEmail).toHaveBeenCalledTimes(1);
      expect(mockFindByEmail).toHaveBeenCalledWith(fakeUser[0].email);
    });
  });
});
