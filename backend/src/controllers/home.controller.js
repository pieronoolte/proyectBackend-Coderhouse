const ProductsService = require('../dao/models/products.dao');
const service = new ProductsService();

const getHome = async (req, res, next) => {
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

  }

  module.exports = { getHome }
