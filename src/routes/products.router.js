const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema,deleteProductSchema } = require('../schemas/product.schema')
const router = express.Router();
const service = new ProductsService();


router.get('/', async (req, res) => {
  const { limit } = req.query;
  const size = limit || 50;
  const products = await service.find(size)
  res.json(products);

});

router.get('/:pid',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { pid } = req.params;
      const product = await service.findOne(pid);
      res.json(product);
    } catch (error) {
      next(error)
    }
  });


router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  })
/*
JSON DE PRUEBA PARA INGRESAR EN POST
{
"title": "Create 1",
"description": "Create1",
"code": 33333,
"price": 33333,
"status": true,
"stock": 80,
"category": "Create1",
"thumbnails":"https://loremflickr.com/640/480?lock=1826723643523072"
}
*/

router.patch('/:pid',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { pid } = req.params;
      const body = req.body;
      const product = await service.update(pid, body);
      res.json(product);
    } catch (error) {
      next(error)
    }
  });


router.delete('/:pid',
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res) => {
    const { pid } = req.params;
    const product = await service.delete(pid);
    res.json(product)
  })

module.exports = router
