const express = require('express');
const CartsService = require('../dao/models/cart.dao');
const router = express.Router();
const service = new CartsService();

router.get('/', async (req, res) => {
  const { limit } = req.query;
  const size = limit || 20;
  const products = await service.find(size)
  res.json(products);

});

router.get('/:cid',
  async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cart = await service.findOne(cid);
      res.render('layouts/cartId', {
        products: cart
      });
    } catch (error) {
      next(error)
    }
  });

router.post('/',
  async (req, res) => {
    const newProduct = await service.createCart();
    res.status(201).json(newProduct);
  })

router.put('/:cid/product/:pid',
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

router.put('/:cid',
  async (req, res, next) => {
    try {
      const { cid } = req.params;
      const product = await service.updateCart(cid);
      res.json(product);
    } catch (error) {
      next(error)
    }
});

router.delete('/:cid/product/:pid',
  async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const product = await service.deleteProduct(cid, pid);
      res.json(product);
    } catch (error) {
      next(error)
    }
  });

router.delete('/:cid',
  async (req, res, next) => {
    try {
      const { cid } = req.params;
      const product = await service.deleteCart(cid);
      res.json(product);
    } catch (error) {
      next(error)
    }
  });

module.exports = router
