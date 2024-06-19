const ProductsService = require('../dao/models/products.dao')
const service = new ProductsService;
const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const getProducts = async (req, res) => {
  const { limit } = req.query;
  const size = limit || 50;
  const products = await service.find(size);
  res.json(products);
}

const getPaginate = async (req, res) => {
  const { limit } = req.query;
  const { page } = req.query;
  // const { category } = req.query;
  const { sort } = req.query;
  const products = await service.paginate(limit, page, sort);
  res.render('layouts/products', products);
}

const getNew = (req, res) => {
  res.render('layouts/createProduct')
  // req.signedCookies.jwt ? res.render('layouts/createProduct') : res.render('layouts/login');
};

const getMyProdutcs = async (req, res) => {
  const token = req.signedCookies.jwt;
  const decodedToken = await jwt.verify(token, config.jwtSecret);
  const products = await service.findMyProducts(decodedToken.id);
  const userName = decodedToken.name;
  const userLastName = decodedToken.lastname;
  const userEmail = decodedToken.email;

  const user = {
    name: userName,
    lastname: userLastName,
    email: userEmail
  };
  res.render('layouts/myProducts', {
    user: user,
    products: products
  });
  // req.signedCookies.jwt ? res.render('layouts/createProduct') : res.render('layouts/login');
};

const getProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.findOne(pid);
    res.render('layouts/productId', {
      product: product
    });
  } catch (error) {
    next(error)
  }
}

const postProduct = async (req, res, next) => {
  try {
    const token = req.signedCookies.jwt;
    console.log(token)
    const decodedToken = await jwt.verify(token, config.jwtSecret);
    console.log(decodedToken)
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let stock = req.body.stock;
    let category = req.body.category;
    let thumbnails = req.body.thumbnails;
    let ownerId;
    console.log(decodedToken)
    if (decodedToken) {
      ownerId = new ObjectId(decodedToken.id);
      console.log(ownerId)
    } else {
      ownerId = new ObjectId('000000000000000000000000');
    }

    const product = await service.createProduct({
      title: title,
      description: description,
      code: Math.floor(Math.random() * (50000 - 10000) + 10000),
      price: price,
      status: true,
      stock: stock,
      category: category,
      thumbnails: thumbnails,
      owner: ownerId
    });


    res.status(201).redirect(`/api/products/${product._id}`);
    // res.status(201).json(product)
  } catch (error) {
    next(error)
  }

}

const patchProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const product = await service.updateProduct(pid, body);
    res.json(product);
  } catch (error) {
    next(error)
  }
}


const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.deleteProduct(pid);
    res.json(product);
  } catch (error) {
    next(error)
  }
}


module.exports = { getProducts, getPaginate, getNew, getMyProdutcs, getProduct, postProduct, patchProduct, deleteProduct }
