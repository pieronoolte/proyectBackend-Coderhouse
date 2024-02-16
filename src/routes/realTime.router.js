const express = require('express');
const ProductsService = require('../dao/models/product.dao');
const router = express.Router();
const service = new ProductsService();

const getProducts = async () => {
  return await service.find(5);
};

router.get('/',async (req, res, next) => {
    try {
      const products = await getProducts();
      res.render('layouts/realTimeProducts', {
        products: products
      });

    } catch (error) {
      next(error)
    }

  });

  router.get('/chat',async (req, res, next) => {
    try {
      res.render('layouts/chat');

    } catch (error) {
      next(error)
    }

  });

  module.exports = {router, getProducts}
