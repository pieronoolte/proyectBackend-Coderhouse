const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema,deleteProductSchema } = require('../schemas/product.schema')
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

  // router.post('/',
  // async (req, res) => {
  //   const {nameProduct, priceProduct} = req.body;
  //   const io = req.app.get('socketio');
  //   io.emit("Hola", "Hola desde la ruta '/real-time'");
  //   res.status(201).send("hola",{nameProduct, priceProduct});
  // })


  module.exports = {router, getProducts}
