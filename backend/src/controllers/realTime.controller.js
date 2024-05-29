const ProductsService = require('../dao/models/products.dao');
const service = new ProductsService();

const getProducts = async () => {
  return await service.find(5);
};

const getRealTime = async (req, res, next) => {
  try {
    const products = await getProducts();
    res.render('layouts/realTimeProducts', {
      products: products
    });

  } catch (error) {
    next(error)
  }

}

const getChat = async (req, res, next) => {
  try {
    res.render('layouts/chat');

  } catch (error) {
    next(error)
  }

}

module.exports = { getProducts, getRealTime, getChat}
