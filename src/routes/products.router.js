const express = require('express');
const ProductsService = require('../dao/models/product.dao')
const router = express.Router();
const service = new ProductsService;

router.get('/', async (req, res) => {
  const { limit } = req.query;
  const size = limit || 50;
  const products = await service.find(size);
  res.json(products);
});

router.get('/paginate', async (req, res) => {
  const { limit } = req.query;
  const { page } = req.query;
  // const { category } = req.query;
  const { sort } = req.query;
  const products = await service.paginate(limit, page, sort);
  res.render('layouts/products', products);
});

router.get('/:pid',
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
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.createProduct(body);
    res.status(201).json(newProduct);
  })

router.patch('/:pid',
  async (req, res, next) => {
    try {
      const { pid } = req.params;
      const body = req.body;
      const product = await service.updateProduct(pid, body);
      res.json(product);
    } catch (error) {
      next(error)
    }
  });

router.delete('/:pid',
  async (req, res) => {
    const { pid } = req.params;
    const product = await service.deleteProduct(pid);
    res.json(product)
  })

module.exports = router


// /*
// JSON DE PRUEBA PARA INGRESAR EN POST
// {
// "title": "Create 1",
// "description": "Create1",
// "code": 33333,
// "price": 33333,
// "status": true,
// "stock": 80,
// "category": "Create1",
// "thumbnails":"https://loremflickr.com/640/480?lock=1826723643523072"
// }
// */
