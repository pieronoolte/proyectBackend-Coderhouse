const CartsService = require('../dao/models/carts.dao');
const service = new CartsService();
const UsersService = require('../dao/models/users.dao');
const serviceUser = new UsersService();
const jwt = require('jsonwebtoken');
const { config } = require('../../config');

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
      cart: cart
    });
  } catch (error) {
    next(error)
  }
}

const postCart = async (req, res, next) => {
  try {
    const { uid } = req.params
    const newCart = await service.createCart(uid);
    res.status(201).json(newCart);
  } catch (error) {
    next(error)
  }
}

const putCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const updateCart = await service.updateCart(cid);
    res.json(updateCart);
  } catch (error) {
    next(error)
  }
}

const getInvoice = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.findOne(cid);
    res.render('layouts/invoice', {
      cart: cart
    })
  } catch (error) {
    next(error)
  }
}

const postInvoice = async (req, res, next) => {
  try {
    const token = req.signedCookies.jwt;
    const decodedToken = await jwt.verify(token, config.jwtSecret);
    const user = await serviceUser.findByEmail(decodedToken.email)
    const newCart = await service.createCart(user._id)
    const userUpdate = await serviceUser.updateUser(user._id, { cart: newCart._id });
    res.json(userUpdate);
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
    const addProduct = await service.addProduct(cid, pid, quantity);
    res.json(addProduct);
  } catch (error) {
    next(error)
  }
}

const deleteCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.deleteCart(cid);
    res.json(cart);
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


module.exports = { getCarts, getCart, getInvoice, postCart, postInvoice, putCart, putCartProduct, putCartPay, deleteCart, deleteCartProduct }
