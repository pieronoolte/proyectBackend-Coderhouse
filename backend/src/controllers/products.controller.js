const ProductsService = require('../dao/models/products.dao')
const service = new ProductsService;

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

const getProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.findOne(pid);
    res.json(product);
  } catch (error) {
    next(error)
  }
}

const postProduct = async (req, res) => {
  const body = req.body;
  const newProduct = await service.createProduct(body);
  res.status(201).json(newProduct);
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


const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  const product = await service.deleteProduct(pid);
  res.json(product)
}


module.exports = { getProducts, getPaginate, getProduct, postProduct, patchProduct, deleteProduct }
