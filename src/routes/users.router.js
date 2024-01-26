const express = require('express');
const UsersService = require('../services/user.service');
const CartsService = require('../services/cart.service');
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
  // validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const isActiveString = req.query.isActive;
      const isActive = isActiveString ? isActiveString.toLowerCase() === 'true' : false;
      const { uid } = req.params;
      const userone = await service.findOne(uid);
      const productsCart = await serviceCart.getRandomCart();
      console.log(isActive);
      res.render('index', {
        user: userone,
        isActive: isActive,
        products: productsCart
      });
    } catch (error) {
      next(error)
    }
  });


// router.get('/:uid/cart/_cid',
//   // validatorHandler(getProductSchema, 'params'),
//   async (req, res, next) => {
//     try {

//       const isActiveString = req.query.isActive;
//       const isActive = isActiveString.toLowerCase() === 'true';
//       const { uid } = req.params;
//       const shop = isActive || "false"
//       const userone = await service.findOne(uid);
//       const cartone = await serviceCart.matchUser();
//       res.render('index', {
//         user: userone,
//         isActive: shop,
//         cart: cartone
//       });
//     } catch (error) {
//       next(error)
//     }
//   });

module.exports = router
