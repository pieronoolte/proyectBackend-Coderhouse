const UsersService = require('../dao/models/users.dao');
const CartsService = require('../dao/models/carts.dao');
const service = new UsersService();
const serviceCart = new CartsService();

const getUsers = async (req, res) => {
  const { limit } = req.query;
  const size = limit || 50;
  const users = await service.find(size)
  res.json(users);

}

const getUser = async (req, res, next) => {
  try {
    const isActiveString = req.query.isActive;
    const isActive = isActiveString ? isActiveString.toLowerCase() === 'true' : false;
    const { uid } = req.params;
    const user = await service.findOne(uid)
    const productsCart = await serviceCart.getRandomCart()
    console.log(productsCart)

      res.render('index', {
        name: user.name,
        isActive: isActive,
        products: productsCart
      });
  } catch (error) {
    next(error)
  }
}

module.exports = { getUser, getUsers }
