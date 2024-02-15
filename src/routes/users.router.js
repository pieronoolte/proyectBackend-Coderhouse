const express = require('express');
const UsersService = require('../dao/models/user.dao');
const CartsService = require('../dao/models/cart.dao');
const router = express.Router();
const service = new UsersService();
const serviceCart = new CartsService();


router.get('/', async (req, res) => {
  const { limit } = req.query;
  const size = limit || 50;
  const users = await service.find(size)
  res.json(users);

});

router.get('/:uid',
  async (req, res, next) => {
    try {
      const isActiveString = req.query.isActive;
      const isActive = isActiveString ? isActiveString.toLowerCase() === 'true' : false;
      const { uid } = req.params;
      const user = await service.findOne(uid)
      console.log(isActive);
      console.log(user.name);
      const productsCart = await serviceCart.getRandomCart()

        res.render('index', {
          name: user.name,
          isActive: isActive,
          products: productsCart
        });
    } catch (error) {
      next(error)
    }
  });

module.exports = router
