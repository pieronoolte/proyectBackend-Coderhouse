const express = require('express');
const CartsService = require('../services/cart.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getCartSchema} = require('../schemas/cart.schema');
const router = express.Router();
const service = new CartsService();



router.get('/', async (req, res) => {
  const { limit } = req.query;
  const size = limit || 20;
  const products = await service.find(size)
  res.json(products);

});


router.get('/:cid',
  validatorHandler(getCartSchema, 'params'),
  async (req, res, next) => {
    try {
      const { cid } = req.params;
      const product = await service.findOne(cid);
      res.json(product);
    } catch (error) {
      next(error)
    }
  });


router.post('/',
  async (req, res) => {
    const newProduct = await service.createCart();
    res.status(201).json(newProduct);
  })



router.post('/:cid/product/:pid',
  validatorHandler(getCartSchema, 'params'),
  async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const { qty } = req.query;
      const quantity = qty;
      const product = await service.addProduct(cid, pid, quantity);
      res.json(product);
    } catch (error) {
      next(error)
    }
  });



module.exports = router