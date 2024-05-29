const CartsService = require('../dao/models/carts.dao');
const service = new CartsService();

const getCarts = async (req, res) => {
  const { limit } = req.query;
  const size = limit || 20;
  const products = await service.find(size)
  res.json(products);
}

const getCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.findOne(cid);
    res.render('layouts/cartId', {
      products: cart
    });
  } catch (error) {
    next(error)
  }
}

const postCart = async (req, res) => {
  const newProduct = await service.createCart();
  res.status(201).json(newProduct);
}

const putCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const product = await service.updateCart(cid);
    res.json(product);
  } catch (error) {
    next(error)
  }
}

const putCartProduct = async (req, res, next) => {
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
}

const deleteCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const product = await service.deleteCart(cid);
    res.json(product);
  } catch (error) {
    next(error)
  }
}

const deleteCartProduct = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const product = await service.deleteProduct(cid, pid);
    res.json(product);
  } catch (error) {
    next(error)
  }
}


module.exports = { getCarts, getCart, postCart, putCart, putCartProduct, deleteCart, deleteCartProduct}
