const express = require('express');
const ProductsService = require('../dao/models/product.dao');
const router = express.Router();
const service = new ProductsService();

router.get('/',  async (req, res, next) => {
    try {
      const { limit } = req.query;
      const size = limit || 50;
      const products = await service.find(size);
      res.render('layouts/home', {
        products: products
      });
    } catch (error) {
      next(error)
    }

  });

  module.exports = router
