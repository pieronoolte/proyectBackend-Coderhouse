const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema,deleteProductSchema } = require('../schemas/product.schema')
const router = express.Router();
const service = new ProductsService();



router.get('/',async (req, res, next) => {
    try {
      const { limit } = req.query;
      const size = limit || 50;
      const products = await service.find(size)
      res.render('layouts/home', {
        products: products
      });
    } catch (error) {
      next(error)
    }

  });


  module.exports = router
