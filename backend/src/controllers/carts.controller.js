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
  try {
    const { uid } = req.params
    const newCart = await service.createCart( uid);
    res.status(201).json(newCart);
  } catch (error) {
    next(error)
  }
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

const getInvoice = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.findOne(cid);
    res.render('layouts/invoice', {
      products: cart
    })
  } catch (error) {
    next(error)
  }
}

const putCartPay = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.updateCartState(cid);
    res.json(cart)
  } catch (error) {
    next(error)
  }
}

const putCartProduct = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const { qty } = req.query;
    const quantity = qty || 1;
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


module.exports = { getCarts, getCart, getInvoice, postCart, putCart, putCartProduct, putCartPay, deleteCart, deleteCartProduct}
